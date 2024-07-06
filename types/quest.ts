import { EQuestCategory, EQuestClaimStatus } from "@/constants/common";

export type TQuest = {
  id: string;
  claim_status?: EQuestClaimStatus;
  category: EQuestCategory;
  name: string;
  link: string;
};