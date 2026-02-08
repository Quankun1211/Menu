import { ApplyCouponResponse } from "@/modules/checkout/types/api-response"

type MilestoneReward = {
    _id: string,
    milestoneLevel: number,
    rewardLevel: string,
    bonusBalance: number,
    description: string
}
export type WalletResponse = {
    _id: string,
    userId: string
    balance: number,
    goldSeeds: number,
    totalSeedsAccumulated: number,
    level: number,
    status: string,
    recentActivities: [],
    nextLevelThreshold: number,
    seedsToNextLevel: number,
    progressPercentage: number,
    hasUnclaimedReward: boolean,
    milestoneReward: MilestoneReward
}
type PrivateCoupon = {
    code: string,
    type: string,
    value: number,
    startDate: string,
    endDate: string,
    isPrivate: boolean,
    allowedUsers: string[]
}
export type MyCouponResponse = {
    couponId: PrivateCoupon,
    acquiredAt: Date
}[]