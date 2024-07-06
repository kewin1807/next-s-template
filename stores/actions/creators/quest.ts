import { TQuest } from "@/types/quest"
import * as ActionTypes from "../types";

export const fetchMainQuest = (quests: TQuest[]) => ({
  type: ActionTypes.FETCH_MAIN_QUESTS,
  payload: quests
})

export const updateMainQuest = (quests: TQuest[]) => ({
  type: ActionTypes.UPDATE_MAIN_QUESTS,
  payload: quests
})