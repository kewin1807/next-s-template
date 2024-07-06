import * as ActionTypes from "../types";

export type TProfile = {
  num_referee: number,
  fETH_reward_referral: number,
  point_reward_referral: number,
  eth_reward_quest: number,
  wallet: string,
  ref_code: string
  point_reward_login?: number,
  total_point?: number
  is_access_early?: boolean,
  unclaimed_staking_eth: number,
  unclaimed_staking_point: number,
  unclaimed_farming_point: number,
  referrer_wallet?: string
  unclaimed_farming_feth: number,
  claimed_mainnet_faucet_at?: Date | string,
  discord_id?: string,
  twitter_id?: string,
  is_claimed_naming?: boolean,
  is_skip_invite_code?: boolean
}

export const fetchProfileWallet = (user: TProfile) => ({
  type: ActionTypes.FETCH_PROFILE_USER,
  payload: user
})

export const updateProfileWallet = (user: Partial<TProfile>) => ({
  type: ActionTypes.UPDATE_PROFILE_USER,
  payload: user
})

export const loginDiscord = (isLogin: boolean) => ({
  type: ActionTypes.LOGIN_DISCORD,
  payload: isLogin
})

export const loginTwitter = (isLogin: boolean) => ({
  type: ActionTypes.LOGIN_TWITTER,
  payload: isLogin
})

export const openInitialClaim = (isOpen: boolean) => ({
  type: ActionTypes.OPEN_CLAIM_INITIAL,
  payload: isOpen
})

export const updateDiscordCode = (code: string) => ({
  type: ActionTypes.UPDATE_DISCORD_CODE,
  payload: code
})

export const updateTwitterCode = (code: string) => ({
  type: ActionTypes.UPDATE_TWITTER_CODE,
  payload: code
})