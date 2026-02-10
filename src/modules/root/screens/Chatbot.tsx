import React, { useState, useRef, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Keyboard,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useChatbot from "../hooks/useChatbot";
import { ChatbotStyles } from "../css/ChatbotStyles";
import useGetMe from "@/hooks/useGetMe";

interface ChatMessage {
    role: 'user' | 'model';
    parts: [{ text: string }];
}

const BOT_AVATAR = require("../../../assets/chatbot/chatavt.png"); 

export default function ChatBotModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    const {data: meData, isPending: mePending} = useGetMe()

    const INITIAL_MESSAGE: ChatMessage = {
        role: 'model',
        parts: [{ text: "Xin chào Bếp trưởng! Tôi là Bếp phó của Bếp Việt. Tôi có thể giúp gì cho thực đơn của bạn hôm nay?" }]
    };
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const { mutate: sendMessage, isPending } = useChatbot();

    useEffect(() => {
        if (visible && messages.length === 0) {
            setMessages([INITIAL_MESSAGE]);
        }
    }, [visible]);

    const handleSend = () => {
        if (!input.trim() || isPending) return;
        Keyboard.dismiss();
        const userMsg: ChatMessage = { role: 'user', parts: [{ text: input.trim() }] };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        sendMessage({ message: currentInput, history: messages }, {
            onSuccess: (data) => {
                const botMsg: ChatMessage = { role: 'model', parts: [{ text: data.reply }] };
                setMessages(prev => [...prev, botMsg]);
            }
        });
    };

    const renderMessageContent = (text: string, isUser: boolean) => {
        if (isUser) return <Text style={ChatbotStyles.userText}>{text}</Text>;

        let cleanText = text
            .replace(/\*\*/g, '')         
            .replace(/^\s*\*\s/gm, '- ');  

        const steps = cleanText.split(/(?=Bước \d+:|Step \d+:|\n\d+\.)/g);

        if (steps.length > 1) {
            return (
                <View style={{ width: '100%' }}>
                    {steps.map((step, index) => {
                        let trimmed = step.trim();
                        if (!trimmed) return null;

                        const colonIndex = trimmed.indexOf(':');
                        let title = "";
                        let content = trimmed;

                        if (colonIndex !== -1 && colonIndex < 30) {
                            title = trimmed.substring(0, colonIndex + 1);
                            content = trimmed.substring(colonIndex + 1).trim();
                        }

                        return (
                            <View key={index} style={ChatbotStyles.recipeStepCard}>
                                {title ? (
                                    <>
                                        <Text style={[ChatbotStyles.botText, { fontWeight: 'bold', color: '#E25822', marginBottom: 4 }]}>
                                            {title}
                                        </Text>
                                        <Text style={ChatbotStyles.botText}>{content}</Text>
                                    </>
                                ) : (
                                    <Text style={ChatbotStyles.botText}>{trimmed}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            );
        }

        return <Text style={ChatbotStyles.botText}>{cleanText}</Text>;
    };
    const renderItem = ({ item }: { item: ChatMessage }) => {
        const isUser = item.role === 'user';
        const isRecipe = !isUser && (item.parts[0].text.includes("Bước") || item.parts[0].text.includes("1."));

        return (
            <View style={[ChatbotStyles.bubbleContainer, isUser ? ChatbotStyles.userAlign : ChatbotStyles.botAlign]}>
                {!isUser && <Image source={BOT_AVATAR} style={ChatbotStyles.avatarSmall} />}
                
                <View style={[
                    ChatbotStyles.msgBubble, 
                    isUser ? ChatbotStyles.userBubble : ChatbotStyles.botBubble,
                    isRecipe && { backgroundColor: 'transparent', padding: 0, maxWidth: '85%' }
                ]}>
                    {renderMessageContent(item.parts[0].text, isUser)}
                </View>

                {isUser && <Image source={{uri: meData?.data.avatar}} style={ChatbotStyles.avatarSmall} />}
            </View>
        );
    };
    // Thêm useEffect này vào trong Component
    useEffect(() => {
        if (visible && messages.length > 0) {
            // Khoảng trễ 100ms để FlatList kịp render dữ liệu trước khi scroll
            const timer = setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Modal visible={visible} animationType="slide" transparent statusBarTranslucent onRequestClose={onClose}>
            <View style={ChatbotStyles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={ChatbotStyles.modalContainer}>
                    <View style={ChatbotStyles.innerContainer}>
                        <View style={ChatbotStyles.header}>
                            <View style={ChatbotStyles.headerTitleRow}>
                                <View style={ChatbotStyles.statusDot} />
                                <Text style={ChatbotStyles.headerTitle}>Bếp phó</Text>
                            </View>
                            <TouchableOpacity onPress={() => { Keyboard.dismiss(); onClose(); }}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
                            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            keyboardShouldPersistTaps="handled"
                        />

                        <View style={ChatbotStyles.inputArea}>
                            <TextInput 
                                value={input} 
                                onChangeText={setInput} 
                                style={ChatbotStyles.textInput} 
                                placeholder="Hỏi AI..."
                                multiline
                                onSubmitEditing={handleSend}
                            />
                            <TouchableOpacity onPress={handleSend} disabled={isPending || !input.trim()}>
                                <Ionicons name="send" size={24} color={isPending || !input.trim() ? "#CCC" : "#E25822"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}