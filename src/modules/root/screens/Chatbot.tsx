import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useChatbot from "../hooks/useChatbot";
import { ChatbotStyles as styles } from "../css/ChatbotStyles";
import useGetMe from "@/hooks/useGetMe";
import { useAuthStore } from "@/store/auth.store";
import { useSocket } from "@/context/SocketContext";
import api from "@/services/axios";

type BotMessage = { role: "user" | "model"; parts: [{ text: string }] };
type SupportMessage = { _id: string; senderRole: "user" | "admin"; content: string; createdAt: string };
type Tab = "bot" | "admin";
const BOT_AVATAR = require("../../../assets/chatbot/chatavt-256.png");
const WELCOME: BotMessage = { role: "model", parts: [{ text: "Chào bạn! Tôi là Bếp trưởng AI. Tôi có thể giúp gì cho bạn hôm nay?" }] };

export default function ChatBotModal({ visible, onClose, onUnreadChange }: { visible: boolean; onClose: () => void; onUnreadChange?: React.Dispatch<React.SetStateAction<number>> }) {
  const [tab, setTab] = useState<Tab>("bot");
  const [botMessages, setBotMessages] = useState<BotMessage[]>([WELCOME]);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState("");
  const [supportPending, setSupportPending] = useState(false);
  const [focused, setFocused] = useState(false);
  const listRef = useRef<FlatList>(null);
  const { data: meData } = useGetMe();
  const token = useAuthStore((state) => state.token);
  const socket = useSocket();
  const { mutate: askBot, isPending } = useChatbot();

  const loadSupport = useCallback(async () => {
    if (!token) return;
    const response = await api.get("/support-chats/me");
    setSupportMessages(response.data.data?.messages || []);
    onUnreadChange?.(response.data.data?.unreadByCustomer || 0);
  }, [token, onUnreadChange]);

  useEffect(() => { loadSupport().catch(() => undefined); }, [loadSupport]);
  useEffect(() => {
    if (!socket) return;
    const receive = ({ message }: { message?: SupportMessage }) => {
      if (!message || message.senderRole !== "admin") return;
      setSupportMessages((current) => current.some((item) => item._id === message._id) ? current : [...current, message]);
      if (visible && tab === "admin") api.patch("/support-chats/me/read").then(() => onUnreadChange?.(0));
      else onUnreadChange?.((count) => count + 1);
    };
    socket.on("support_message", receive);
    return () => { socket.off("support_message", receive); };
  }, [socket, visible, tab, onUnreadChange]);
  useEffect(() => {
    if (visible && tab === "admin" && token) api.patch("/support-chats/me/read").then(() => onUnreadChange?.(0));
  }, [visible, tab, token, onUnreadChange]);

  const chooseAdmin = () => {
    if (!token) { onClose(); router.push("/(auth)/login"); return; }
    setTab("admin");
  };

  const send = async () => {
    const content = input.trim();
    if (!content || isPending || supportPending) return;
    Keyboard.dismiss(); setInput("");
    if (tab === "bot") {
      const message: BotMessage = { role: "user", parts: [{ text: content }] };
      setBotMessages((current) => [...current, message]);
      askBot({ message: content, history: botMessages }, { onSuccess: (data) => setBotMessages((current) => [...current, { role: "model", parts: [{ text: data.reply }] }]) });
      return;
    }
    setSupportPending(true);
    try {
      const response = await api.post("/support-chats/me/messages", { content });
      setSupportMessages((current) => [...current, response.data.data]);
    } finally { setSupportPending(false); }
  };

  const data = tab === "bot" ? botMessages : supportMessages;
  const renderItem = ({ item }: { item: BotMessage | SupportMessage }) => {
    const bot = "role" in item;
    const mine = bot ? item.role === "user" : item.senderRole === "user";
    const content = bot ? item.parts[0].text.replace(/\*\*/g, "") : item.content;
    return <View style={[styles.bubbleContainer, mine ? styles.userAlign : styles.botAlign]}>
      {!mine && <Image source={BOT_AVATAR} style={styles.avatarSmall}/>} 
      <View style={[styles.msgBubble, mine ? styles.userBubble : styles.botBubble]}><Text style={mine ? styles.userText : styles.botText}>{content}</Text></View>
      {mine && <Image source={meData?.data?.avatar ? { uri: meData.data.avatar } : BOT_AVATAR} style={styles.avatarSmall}/>} 
    </View>;
  };

  return <Modal visible={visible} animationType="slide" transparent statusBarTranslucent onRequestClose={onClose}>
    <View style={styles.modalOverlay}><KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalContainer}><View style={styles.innerContainer}>
      <View style={styles.header}><View><Text style={styles.headerTitle}>Trò chuyện cùng Bếp Việt</Text><Text style={styles.headerSubtitle}>Chúng tôi luôn sẵn sàng hỗ trợ</Text></View><TouchableOpacity onPress={onClose}><Ionicons name="close" size={25} color="#333"/></TouchableOpacity></View>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === "bot" && styles.activeTab]} onPress={() => setTab("bot")}><Ionicons name="sparkles-outline" size={18} color={tab === "bot" ? "#E25822" : "#777"}/><Text style={[styles.tabText, tab === "bot" && styles.activeTabText]}>Chatbot</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === "admin" && styles.activeTab]} onPress={chooseAdmin}><Ionicons name="headset-outline" size={18} color={tab === "admin" ? "#E25822" : "#777"}/><Text style={[styles.tabText, tab === "admin" && styles.activeTabText]}>Quản trị viên</Text></TouchableOpacity>
      </View>
      {tab === "admin" && supportMessages.length === 0 ? <View style={styles.emptySupport}><Ionicons name="headset-outline" size={46} color="#E25822"/><Text style={styles.emptyTitle}>Bạn cần Bếp Việt hỗ trợ?</Text><Text style={styles.emptyText}>Hãy gửi tin nhắn, quản trị viên sẽ phản hồi sớm nhất.</Text></View> : <FlatList ref={listRef} data={data as any[]} keyExtractor={(item, index) => item._id || String(index)} renderItem={renderItem as any} contentContainerStyle={styles.messageList} onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })} keyboardShouldPersistTaps="handled"/>}
      {(isPending || supportPending) && <Text style={styles.pendingText}>Đang gửi...</Text>}
      <View style={[styles.inputArea, focused && styles.inputAreaFocused]}><TextInput value={input} onChangeText={setInput} style={[styles.textInput, focused && styles.textInputFocused]} placeholder={tab === "bot" ? "Hỏi Bếp trưởng AI..." : "Nhắn tin cho quản trị viên..."} placeholderTextColor="#806A5C" selectionColor="#E25822" cursorColor="#E25822" maxLength={2000} multiline onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/><TouchableOpacity onPress={send} disabled={!input.trim() || isPending || supportPending}><Ionicons name="send" size={24} color={!input.trim() || isPending || supportPending ? "#CCC" : "#E25822"}/></TouchableOpacity></View>
    </View></KeyboardAvoidingView></View>
  </Modal>;
}
