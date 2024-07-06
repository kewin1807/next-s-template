import { AnyAction } from "redux";
import { TProfile } from "../actions/creators"
import * as ActionTypes from "../actions/types";

export type TProfileWalletState = {
  user: TProfile | null,
  is_authorize_discord?: boolean,
  is_authorize_twitter?: boolean,
  is_open_initial_claim?: boolean,
  discord_code?: string
  twitter_code?: string
}

const initialState: TProfileWalletState = {
  user: null,
  is_authorize_discord: false,
  is_authorize_twitter: false,
  is_open_initial_claim: false,
  discord_code: "",
  twitter_code: ""
}

const profileReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROFILE_USER:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypes.UPDATE_PROFILE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    case ActionTypes.LOGIN_DISCORD:
      return {
        ...state,
        is_authorize_discord: action.payload
      }
    case ActionTypes.LOGIN_TWITTER:
      return {
        ...state,
        is_authorize_twitter: action.payload,
      }
    case ActionTypes.OPEN_CLAIM_INITIAL:
      return {
        ...state,
        is_open_initial_claim: action.payload
      }
    case ActionTypes.UPDATE_DISCORD_CODE:
      return {
        ...state,
        discord_code: action.payload
      }
    default:
      return state
  }
}

export default profileReducer