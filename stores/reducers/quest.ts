import { TQuest } from "@/constants/types/quest";
import { AnyAction } from "redux";
import * as ActionTypes from "../actions/types";


export type TQuestState = {
  main_quests: TQuest[]
}

const initialState: TQuestState = {
  main_quests: [],
}

const questReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_MAIN_QUESTS:
      return {
        ...state,
        main_quests: action.payload
      }
    case ActionTypes.UPDATE_MAIN_QUESTS:
      return {
        ...state,
        main_quests: action.payload
      }
    default:
      return state
  }
}

export default questReducer;