export const MOBILEDEVICE = 700

export enum EQuest {
  MAIN_QUEST = "MainQuest",
  DAILY_QUEST = "DailyQuest"
}

export enum EQuestClaimStatus {
  CLAIMED = 'claimed',
  UNCLAIMED = 'unclaimed',
  CHECKING = "checking"
}

export enum EQuestCategory {
  DISCORD = "discord",
  TWITTER = "twitter",
  RETWEET_TWITTER = "retweet_twitter",
  FOLLOW_TWITTER = "follow_twitter",
  LIKE_TWITTER = 'like_twitter',
  DAILY_LOGIN = "daily_login"
}

export enum EUserAction {
  STAKE = "stake",
  UNSTAKE = "unstake",
  FARM = "farm",
  WITHDRAW = "withdraw",
  CLAIM_STAKE = "claim_stake",
  CLAIM_FARM = "claim_farm"
}

export const APR_ETH_STAKING = 2.88
export const APR_FETH_FARMING = 4.51
export const STAKING_REFERRAL_F0_REWARD = 400
export const REFERRAL_REWARD = 100

export const rewardPointSeason = [
  { point: 10_000_000, days: 100 },
  { point: 1_250_305_250, days: 30 },
  { point: 625_152_625, days: 30 },
  { point: 312_576_313, days: 30 },
  { point: 156_288_156, days: 30 },
  { point: 78_144_078, days: 30 },
  { point: 39_072_039, days: 30 },
  { point: 19_536_020, days: 30 },
  { point: 9_768_010, days: 30 },
  { point: 4_884_005, days: 30 },
  { point: 2_442_002, days: 30 },
  { point: 1_221_001, days: 30 },
  { point: 610_501, days: 30 },
]

export const alphaAPR = 15_000_000
export const FAUCET_MAINNET_REWARD_POINT = 100
export const FAUCET_MAINNET_REWARD_ETH = 0.1
export const DISCORD_GUILD = 1212243315680874496
export const NEXT_PUBLIC_SPECIAL_DAILY_LOGIN = 200
export const NEXT_PUBLIC_DAILY_LOGIN = 100
export const BLASTTRONAULTS_WALLET = '0xd8b446cEfDc0539d87bC1872fe8F018739A657D2'
export const NAMING_SERVICE_REWARD = 1000

export const DAILY_QUEST_POINT_REWARD = 200
export const MAIN_QUEST_POINT_REWARD = 500