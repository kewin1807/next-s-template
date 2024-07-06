import React, { memo, useCallback, useEffect } from "react";
import { IResolveParams, objectType } from "@/types/login";
import { TStateAppType } from "@/stores/reducers";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/configs/axios.config";
import { useAccount } from "wagmi";
import { EQuestClaimStatus } from "@/constants/common";
import { TQuest } from "@/types/quest";
import { updateMainQuest } from "@/stores/actions/creators/quest";

interface Props {
  client_id: string;
  className?: string;
  redirect_uri: string;
  state?: string;
  fields?: string;
  scope?: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  isEnableClick?: boolean;
  item: TQuest;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}

const DISCORD_URL: string = "https://discord.com";

export const LoginSocialDiscord = ({
  client_id,
  className = "",
  redirect_uri,
  children,
  fields = "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
  state = "state",
  scope = "identify+guilds",
  onReject,
  onResolve,
  item,
}: Props) => {
  const { address } = useAccount();
  const { main_quests } = useSelector((state: TStateAppType) => state.quest);
  const dispatch = useDispatch();

  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    const state = popupWindowURL.searchParams.get("state");

    if (code && !state) {
      localStorage.setItem("discord", code);
      window.close();
    }
  }, []);
  const getAccessToken = useCallback(
    async (code: string) => {
      try {
        const response = await axiosInstance.post(
          `/profile/${address}/discord-authorize`,
          {
            code: code,
            redirect_uri: process.env["NEXT_PUBLIC_TWITTER_REDIRECT_URI"],
          }
        );
        if (response.data) {
          onResolve({ provider: "discord" });
        }
      } catch (error) {
        console.log({ error });
        if (
          error?.response?.data?.message !== "Not found discord. Please retry"
        ) {
          onReject(error);
        }
      }
    },
    [onReject, onResolve, client_id, redirect_uri]
  );

  const handlePostMessage = useCallback(
    async ({ type, code, provider }: objectType) =>
      type === "code" &&
      provider === "discord" &&
      code &&
      (await getAccessToken(code)),
    [getAccessToken]
  );

  const onChangeLocalStorage = useCallback(async () => {
    const code = localStorage.getItem("discord");
    console.log({ code });

    if (code) {
      await handlePostMessage({
        provider: "discord",
        type: "code",
        code,
      });
      window.removeEventListener("storage", onChangeLocalStorage, false);
    }
  }, [handlePostMessage]);

  const onLogin = useCallback(async () => {
    // if (is_authorize_discord) return onLoginStart && onLoginStart();
    // if (onLoginStart) {
    //   return onLoginStart();
    // }
    if (item.claim_status === EQuestClaimStatus.CLAIMED) return;
    if (item.claim_status === EQuestClaimStatus.UNCLAIMED) {
      if (item.link) {
        window.open(item.link, "_blank");
        const clone = main_quests.map((ele) => ({
          ...ele,
          claim_status:
            ele.id === item.id ? EQuestClaimStatus.CHECKING : ele.claim_status,
        }));
        return dispatch(updateMainQuest(clone));
      }
    } else {
      const oauthUrl = `${DISCORD_URL}/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
      // window.location.href = oauthUrl;
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        oauthUrl,
        // "_blank"
        "discord",
        "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
          width +
          ", height=" +
          height +
          ", top=" +
          top +
          ", left=" +
          left
      );
      window.addEventListener("storage", onChangeLocalStorage, false);
    }
  }, [
    scope,
    state,
    client_id,
    redirect_uri,
    onChangeLocalStorage,
    main_quests,
  ]);

  return (
    <div className={className} onClick={onLogin}>
      {children}
    </div>
  );
};

export default memo(LoginSocialDiscord);
