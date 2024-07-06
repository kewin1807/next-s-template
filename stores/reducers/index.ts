import profileReducer, { TProfileWalletState } from "./profile";
import questReducer, { TQuestState } from "./quest";

import { combineReducers } from "redux";

export type TStateAppType = {
  profile: TProfileWalletState,
  quest: TQuestState
}

export default combineReducers<TStateAppType>({
  profile: profileReducer,
  quest: questReducer
});