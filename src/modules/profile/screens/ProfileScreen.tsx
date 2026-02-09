import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert, Clipboard } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useGetMe from '@/hooks/useGetMe';
import { ProfileStyles } from '../css/ProfileStyles';
import useLogout from '@/hooks/useLogOut';
import useGetWallet from '../hooks/useGetWallet';
import useConfirmVoucher from '../hooks/useConfirmVoucher';
import useGetMyCoupons from '../hooks/useGetMyCoupons';
import Toast from 'react-native-toast-message';
import UserAvatar from '@/components/common/Avatar';

export default function ProfileScreen() {
  const { data: meData } = useGetMe();
  
  const { onLogout } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCouponsModal, setShowCouponsModal] = useState(false); 
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  const { data: walletData, isPending: isWalletLoading, refetch: refetchWallet } = useGetWallet();
  const { mutate: confirmReward, isPending: isConfirming } = useConfirmVoucher();
  const { data: couponsData, refetch: refetchCoupons } = useGetMyCoupons();
  
  const wallet = walletData?.data;
  const coupons = Array.isArray(couponsData?.data) ? couponsData.data : [];
  const isLoggedIn = !!meData?.data;

  const handleClaimReward = () => {
    confirmReward(undefined, {
      onSuccess: (response: any) => {
        setClaimedCode(response?.data?.code);
        refetchWallet();
        refetchCoupons(); 
      },
      onError: (err: any) => {
        Alert.alert("Lỗi", err?.response?.data?.message || "Không thể nhận quà lúc này");
      }
    });
  };

  const copyToClipboard = (code: string) => {
    Clipboard.setString(code);
    Toast.show({
      type: 'success',
      text1: 'Đã sao chép mã',
      text2: code
    });
  };

  const menuItems = [
    { id: 'coupons', title: 'Voucher của tôi', icon: 'ticket', iconColor: '#FFB039', onPress: () => setShowCouponsModal(true) }, 
    { id: 'recipes', title: 'Sổ tay công thức', icon: 'book', iconColor: '#FFB039', onPress: () => router.push('/(details)/exploreItemTabs/RecipeSave') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView style={ProfileStyles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={ProfileStyles.headerSection}>
          <View style={ProfileStyles.avatarContainer}>
            <View style={ProfileStyles.avatarBorder}>
              <View style={ProfileStyles.avatarInner}>
                <UserAvatar avatarUrl={isLoggedIn ? meData?.data?.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
              </View>
            </View>
            
            {isLoggedIn ? (
              <>
                <Text style={ProfileStyles.userName}>{meData?.data.name}</Text>
                <View style={ProfileStyles.badgeLevel}>
                  <Ionicons name="shield-checkmark" size={14} color="#FFF" />
                  <Text style={ProfileStyles.badgeText}>Cấp độ {wallet?.level || 1}</Text>
                </View>
              </>
            ) : (
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text style={[ProfileStyles.userName, { marginBottom: 10 }]}>Chào mừng bạn!</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)} style={{ backgroundColor: '#E25822', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)} style={{ borderWidth: 1, borderColor: '#E25822', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
                    <Text style={{ color: '#E25822', fontWeight: 'bold' }}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {isLoggedIn && (
            <View style={ProfileStyles.loyaltyCard}>
              <View style={ProfileStyles.loyaltyHeader}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={ProfileStyles.loyaltyLabel}>Số dư Hạt Vàng</Text>
                    <TouchableOpacity 
                      onPress={() => setShowRulesModal(true)}
                      style={{ marginLeft: 6 }}
                    >
                      <Ionicons name="help-circle-outline" size={18} color="#FFB039" />
                    </TouchableOpacity>
                  </View>
                  <View style={ProfileStyles.pointsContainer}>
                    {isWalletLoading ? <ActivityIndicator size="small" color="#FFB039" /> : (
                      <Text style={ProfileStyles.pointsValue}>{wallet?.goldSeeds?.toLocaleString() || 0}</Text>
                    )}
                    <Ionicons name="leaf" size={22} color="#FFB039" style={{ marginLeft: 6 }} />
                  </View>
                </View>
                <TouchableOpacity 
                  style={ProfileStyles.giftCircle}
                  onPress={() => wallet?.hasUnclaimedReward ? setShowRewardModal(true) : null}
                >
                  <Ionicons name="gift" size={24} color="#FFB039" />
                  {wallet?.hasUnclaimedReward && <View style={ProfileStyles.notifDot} />}
                </TouchableOpacity>
              </View>

              <View style={ProfileStyles.progressSection}>
                <View style={ProfileStyles.progressBarBase}>
                  <View style={[ProfileStyles.progressBarFill, { width: `${wallet?.progressPercentage || 0}%` }]} />
                </View>
                <Text style={ProfileStyles.progressNote}>
                  {wallet?.seedsToNextLevel === 0 ? "Bạn đã đạt cấp độ tối đa!" : `Còn ${wallet?.seedsToNextLevel?.toLocaleString()} Hạt Vàng để nâng Cấp ${(wallet?.level || 0) + 1}`}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={ProfileStyles.menuContainer}>
          {isLoggedIn && menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={ProfileStyles.menuItem} onPress={item.onPress}>
              <View style={ProfileStyles.leftContent}>
                <View style={[ProfileStyles.iconWrapper, { backgroundColor: item.iconColor + '15' }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
                </View>
                <Text style={ProfileStyles.menuText}>{item.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.id === 'coupons' && coupons.length > 0 && (
                   <View style={{ backgroundColor: '#E25822', borderRadius: 10, paddingHorizontal: 6, marginRight: 5 }}>
                      <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>{coupons.length}</Text>
                   </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </View>
            </TouchableOpacity>
          ))}
          {isLoggedIn && (
            <TouchableOpacity onPress={() => setShowLogoutModal(true)} style={ProfileStyles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color="#E25822" />
              <Text style={ProfileStyles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Modal visible={showRulesModal} transparent animationType="slide">
        <View style={ProfileStyles.modalOverlayBottom}>
          <View style={ProfileStyles.ruleModalSheet}>
            <View style={ProfileStyles.ruleHeader}>
              <Text style={ProfileStyles.ruleTitle}>Quy tắc Hạt Vàng & Cấp độ</Text>
              <TouchableOpacity onPress={() => setShowRulesModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={ProfileStyles.ruleItem}>
                <View style={ProfileStyles.ruleIcon}>
                  <Ionicons name="cart" size={18} color="#FFB039" />
                </View>
                <View style={ProfileStyles.ruleTextContent}>
                  <Text style={ProfileStyles.ruleItemTitle}>Tích lũy theo giá trị đơn hàng</Text>
                  <Text style={ProfileStyles.ruleItemDesc}>
                    Tỷ lệ tích lũy Hạt Vàng dựa trên tổng giá trị đơn hàng của bạn:
                  </Text>
                  <View style={{ marginTop: 8, backgroundColor: '#F9F9F9', padding: 10, borderRadius: 8 }}>
                    <Text style={ProfileStyles.ruleItemDesc}>• Dưới 500k: Tích <Text style={{ fontWeight: 'bold', color: '#E25822' }}>1%</Text></Text>
                    <Text style={ProfileStyles.ruleItemDesc}>• Từ 500k - 2 triệu: Tích <Text style={{ fontWeight: 'bold', color: '#E25822' }}>2%</Text></Text>
                    <Text style={ProfileStyles.ruleItemDesc}>• Trên 2 triệu: Tích <Text style={{ fontWeight: 'bold', color: '#E25822' }}>3%</Text></Text>
                  </View>
                </View>
              </View>

              <View style={ProfileStyles.ruleItem}>
                <View style={ProfileStyles.ruleIcon}>
                  <Ionicons name="trending-up" size={18} color="#FFB039" />
                </View>
                <View style={ProfileStyles.ruleTextContent}>
                  <Text style={ProfileStyles.ruleItemTitle}>Cơ chế thăng cấp</Text>
                  <Text style={ProfileStyles.ruleItemDesc}>
                    Cấp độ được tính dựa trên tổng số hạt tích lũy lịch sử. Càng nhiều hạt, cấp độ càng cao (Tối đa Level 50). Hạt đã tiêu dùng không làm giảm cấp độ của bạn.
                  </Text>
                </View>
              </View>

              <View style={ProfileStyles.ruleItem}>
                <View style={ProfileStyles.ruleIcon}>
                  <Ionicons name="gift" size={18} color="#FFB039" />
                </View>
                <View style={ProfileStyles.ruleTextContent}>
                  <Text style={ProfileStyles.ruleItemTitle}>Phần thưởng mốc (Milestone)</Text>
                  <Text style={ProfileStyles.ruleItemDesc}>
                    Khi đạt các mốc quan trọng, bạn sẽ nhận được Voucher giảm giá đặc biệt:
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {[10, 20, 30, 40, 50].map(lv => (
                      <View key={lv} style={ProfileStyles.ruleBadge}>
                        <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Cấp {lv}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={ProfileStyles.ruleItem}>
                <View style={ProfileStyles.ruleIcon}>
                  <Ionicons name="alert-circle" size={18} color="#FFB039" />
                </View>
                <View style={ProfileStyles.ruleTextContent}>
                  <Text style={ProfileStyles.ruleItemTitle}>Lưu ý</Text>
                  <Text style={ProfileStyles.ruleItemDesc}>
                    - Hạt chỉ được cộng khi đơn hàng chuyển sang trạng thái &quot;Đã giao hàng&quot;.{'\n'}
                    - Voucher thăng cấp có hạn sử dụng 30 ngày kể từ lúc nhận quà.
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[ProfileStyles.confirmButton, { marginTop: 10, marginBottom: 20 }]}
                onPress={() => setShowRulesModal(false)}
              >
                <Text style={ProfileStyles.confirmButtonText}>Đã hiểu</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showCouponsModal} transparent animationType="slide">
        <View style={ProfileStyles.modalOverlayBottom}>
          <View style={ProfileStyles.modalSheet}>
            
            {/* Header */}
            <View style={ProfileStyles.modalHeader}>
              <View>
                <Text style={ProfileStyles.modalTitleText}>Kho Voucher của tôi</Text>
                <Text style={ProfileStyles.modalSubTitleText}>
                  Bạn đang có {coupons.length} mã giảm giá
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowCouponsModal(false)}>
                <Ionicons name="close-circle" size={28} color="#DDD" />
              </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={ProfileStyles.couponListContent}
            >
              {coupons.length > 0 ? coupons.map((item: any) => (
                <View key={item._id} style={ProfileStyles.couponItemCard}>
                  
                  
                  <View style={ProfileStyles.couponLeftSection}>
                    <MaterialCommunityIcons name="ticket-percent" size={32} color="#FFF" />
                    <View style={ProfileStyles.couponStepContainer}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <View key={i} style={ProfileStyles.couponStepDot} />
                      ))}
                    </View>
                  </View>

               
                  <View style={ProfileStyles.couponMiddleSection}>
                    <Text style={ProfileStyles.couponValueText} numberOfLines={1}>
                      Giảm {item.couponId?.value?.toLocaleString()}đ
                    </Text>
                    <View style={ProfileStyles.couponBadge}>
                      <Text style={ProfileStyles.couponBadgeText}>{item.couponId?.code}</Text>
                    </View>
                    <Text style={ProfileStyles.couponExpiryText}>
                      HSD: {new Date(item.couponId?.endDate).toLocaleDateString('vi-VN')}
                    </Text>
                  </View>

                
                  <TouchableOpacity 
                    onPress={() => copyToClipboard(item.couponId?.code)}
                    style={ProfileStyles.couponCopyBtn}
                  >
                    <Ionicons name="copy" size={18} color="#E25822" />
                    <Text style={ProfileStyles.couponCopyText}>Sao chép</Text>
                  </TouchableOpacity>
                  
                </View>
              )) : (
                <View style={ProfileStyles.emptyStateContainer}>
                  <Ionicons name="ticket-outline" size={80} color="#EEE" />
                  <Text style={ProfileStyles.emptyStateText}>Chưa có voucher khả dụng</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showRewardModal} transparent animationType="fade">
        <View style={ProfileStyles.modalOverlay}>
          <View style={ProfileStyles.modalContent}>
            <TouchableOpacity style={ProfileStyles.closeModalBtn} onPress={() => { setShowRewardModal(false); setClaimedCode(null); }}>
                <Ionicons name="close" size={24} color="#CCC" />
            </TouchableOpacity>

            {!claimedCode ? (
              <>
                <View style={[ProfileStyles.iconContainer, { backgroundColor: '#FFF9F0' }]}>
                  <Ionicons name="trophy" size={40} color="#FFB039" />
                </View>
                <Text style={ProfileStyles.modalTitle}>Chúc mừng cấp {wallet?.level}!</Text>
                <Text style={ProfileStyles.modalSubTitle}>{wallet?.milestoneReward?.description}</Text>
                
                <View style={ProfileStyles.rewardBox}>
                  <Text style={ProfileStyles.rewardText}>🎁 Voucher giảm {wallet?.milestoneReward?.bonusBalance.toLocaleString()}đ</Text>
                </View>

                <TouchableOpacity 
                  style={[ProfileStyles.confirmButton, isConfirming && { opacity: 0.7 }]} 
                  onPress={handleClaimReward}
                  disabled={isConfirming}
                >
                  {isConfirming ? <ActivityIndicator color="#FFF" /> : <Text style={ProfileStyles.confirmButtonText}>Nhận voucher ngay</Text>}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={[ProfileStyles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                  <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
                </View>
                <Text style={ProfileStyles.modalTitle}>Đã nhận thành công!</Text>
                <View style={ProfileStyles.codeBox}>
                  <Text style={ProfileStyles.codeValue}>{claimedCode}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(claimedCode!)}>
                    <Ionicons name="copy-outline" size={20} color="#E25822" style={{ marginTop: 5 }} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={ProfileStyles.confirmButton} onPress={() => { setShowRewardModal(false); setClaimedCode(null); }}>
                  <Text style={ProfileStyles.confirmButtonText}>Tuyệt vời</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal Logout (Giữ nguyên) */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={ProfileStyles.modalOverlay}>
          <View style={ProfileStyles.modalContent}>
            <View style={ProfileStyles.iconContainer}><Ionicons name="log-out" size={40} color="#E25822" /></View>
            <Text style={ProfileStyles.modalTitle}>Xác nhận đăng xuất</Text>
            <View style={ProfileStyles.buttonGroup}>
              <TouchableOpacity style={ProfileStyles.cancelButton} onPress={() => setShowLogoutModal(false)}><Text style={ProfileStyles.cancelButtonText}>Hủy</Text></TouchableOpacity>
              <TouchableOpacity style={ProfileStyles.confirmButton} onPress={() => { setShowLogoutModal(false); onLogout(); }}><Text style={ProfileStyles.confirmButtonText}>Đăng xuất</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}