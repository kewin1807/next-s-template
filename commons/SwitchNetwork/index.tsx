"use client";
import { useAccount, useSwitchChain } from "wagmi";
import WrapResultModal from "../ResultModal";
import { useEffect, useMemo } from "react";
import { blastSepolia, blast } from "viem/chains";

const SwitchNetworkModal = () => {
  const { switchChain } = useSwitchChain();
  const { chain, isConnected } = useAccount();
  const { errorMessage, ResultModal } = WrapResultModal();
  const networkId = useMemo(() => {
    return process.env["NEXT_PUBLIC_IS_MAINNET"] === "true"
      ? blast.id
      : blastSepolia.id;
  }, []);

  useEffect(() => {
    if (isConnected && chain?.id !== networkId) {
      errorMessage("Please switch network!!!");
    }
  }, [chain, isConnected, networkId]);
  return (
    <ResultModal
      buttonTitle="Switch"
      onClick={() =>
        switchChain({
          chainId: networkId,
        })
      }
    />
  );
};
export default SwitchNetworkModal;
