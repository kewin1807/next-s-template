import { TUserAction } from "@/constants/types/login"
import axiosInstance from "@/configs/axios.config";

export const shortenAddress = (address?: string) => {
  if (!address) return ''
  const len = address.length
  const suffix = address.slice(2, len)
  return `0x${suffix.slice(0, 4)}...${suffix.slice(len - 6, len)}`
}

export const logUserAction = async (data: TUserAction) => {
  try {
    await axiosInstance.post('/profile', data)
  }
  catch (err) {
    console.log(err)
  }
}