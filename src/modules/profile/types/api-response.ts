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

type IngredientUser = {
    _id: string,
    name: string,
    quantity: string
}
type InstructionUser = {
    _id: string,
    step: number,
    description: string
}
export type MyRecipeResponse = {
    _id: string,
    name: string,
    image: string,
    cookTime: number,
    familyNotes: string
}

export type MyRecipeDetailResponse = {
    _id: string,
    name: string,
    image: string,
    cookTime: number,
    instructions: InstructionUser[],
    ingredients: IngredientUser[],
    familyNotes: string
}