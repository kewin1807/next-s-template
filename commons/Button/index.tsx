"use client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import CircularProgress from "@mui/material/CircularProgress";

export type TButtonProps = {
  title: string | JSX.Element;
  onClick: () => Promise<void> | void;
  disable?: boolean;
  styles?: string | object;
  customStyles?: object;
};

const Wrapbutton = (props: TButtonProps) => {
  const { title, onClick, styles, customStyles, disable } = props;
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickButton = useCallback(async () => {
    if (disable) return;
    if (!isConnected) return openConnectModal();
    setIsLoading(true);
    try {
      await onClick();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, onClick]);
  return (
    <button
      className={`rounded-lg items-center justify-center flex py-2 font-SpaceGrotesk text-md lg:text-lg bg-yellow text-black font-[500]  ${styles || "min-w-[200px] px-5"}`}
      style={customStyles}
      onClick={handleClickButton}
    >
      {!isConnected ? (
        "Connect wallet"
      ) : isLoading ? (
        <CircularProgress sx={{ color: "white", height: 15 }} />
      ) : (
        title
      )}
    </button>
  );
};

export default Wrapbutton;
