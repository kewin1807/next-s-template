import { EUserAction } from "@/constants/common";

export type objectType = {
  [key: string]: any;
};

export type IResolveParams = {
  provider: string;
  data?: objectType;
};

export type TUserAction = {
  action: string,
  eth_volume?: number
  point_volume?: number
  wallet: string,
  tx_hash?: string
}