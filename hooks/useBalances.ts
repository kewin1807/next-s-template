"use client";
import { STAKING_ABI } from "@/configs/abis/staking-abi";
import { STAKING_CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatEther } from "viem";
import { useAccount, usePublicClient } from "wagmi";

const useBalances = () => {
  const [balanceStaking, setBalanceStaking] = useState<number>(0);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [currentStakeUser, setCurrentStakingUser] = useState<number>(0);

  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const timeRef = useRef<NodeJS.Timeout>();


  const fetchBalances = useCallback(async () => {
    if (!isConnected || !address) return;
    const balance = await publicClient.getBalance({
      address,
    });
    const balanceAsEther = formatEther(balance);
    setEthBalance(Number(Number(balanceAsEther).toFixed(3)));

    const currenStake = await publicClient.readContract({
      address: STAKING_CONTRACT_ADDRESSES as `0x${string}`,
      abi: STAKING_ABI,
      functionName: "stakeBalances",
      args: [address],
    })
    setCurrentStakingUser(Number(formatEther(currenStake[1])))

    const fETH = await publicClient.readContract({
      address: STAKING_CONTRACT_ADDRESSES as `0x${string}`,
      abi: STAKING_ABI,
      functionName: "balanceOf",
      args: [address],
    });

    const currentFarming = await publicClient.readContract({
      address: STAKING_CONTRACT_ADDRESSES as `0x${string}`,
      abi: STAKING_ABI,
      functionName: "farmingBalances",
      args: [address],
    })
    const fETHBalance = formatEther(fETH);
    const currentFarmingBalances = formatEther(currentFarming[1])
    // fetch ETH is staking
    setBalanceStaking(Number(fETHBalance) + Number(currentFarmingBalances));

  }, [isConnected, address])


  useEffect(() => {
    fetchBalances()
    timeRef.current = setInterval(async () => {
      fetchBalances()
    }, 15000);

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [fetchBalances])





  return { balanceStaking, ethBalance, currentStakeUser }
}

export default useBalances;