import React, { memo, useCallback, useEffect } from "react";
import { IResolveParams, objectType } from "@/types/login";
import axiosInstance from "@/configs/axios.config";

import { useDispatch } from "react-redux";
import { loginTwitter } from "@/stores/actions/creators";
import { useAccount } from "wagmi";

interface Props {
  client_id: string;
  className?: string;
  redirect_uri: string;
  state?: string;
  fields?: string;
  scope?: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isEnableClick?: boolean;

  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}

const TWITTER_URL: string = "https://twitter.com";

export const LoginSocialTwitter = ({
  client_id,
  className = "",
  redirect_uri,
  children,
  state = "state",
  scope = "tweet.read%20users.read%20follows.read%20follows.write",
  onReject,
  onResolve,
}: Props) => {
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    const state = popupWindowURL.searchParams.get("state");
    console.log({ code, state });
    if (code && state) {
      localStorage.setItem("twitter", code);
      window.close();
    }
  }, []);

  const dispatch = useDispatch();
  const { address } = useAccount();

  const getAccessToken = useCallback(
    async (code: string) => {
      console.log({ code });
      // dispatch(loginTwitter(true));
      // return onResolve({ provider: "twitter" });
      try {
        const response = await axiosInstance.post(
          `/profile/${address}/twitter-authorize`,
          {
            code: code,
            redirect_uri: process.env["NEXT_PUBLIC_TWITTER_REDIRECT_URI"],
          }
        );
        if (response.data) {
          dispatch(loginTwitter(true));
          onResolve({ provider: "twitter" });
        }
      } catch (error) {
        console.log({ error });
        onReject(error);
      } finally {
        await localStorage.removeItem("twitter");
      }
    },
    [onReject, onResolve, dispatch, address]
  );
  // useEffect(() => {
  //   console.log({ twitter_code });
  //   if (twitter_code) {
  //     getAccessToken(twitter_code);
  //   }
  // }, [twitter_code, getAccessToken]);

  const onChangeLocalStorage = useCallback(async () => {
    const code = localStorage.getItem("twitter");
    console.log({ code });
    if (code) {
      await getAccessToken(code);
      window.removeEventListener("storage", onChangeLocalStorage, false);

      // localStorage.removeItem("twitter");
    }
  }, [getAccessToken]);

  const onLogin = useCallback(async () => {
    // if (!isEnableClick) return;

    // if (is_authorize_twitter) return onLoginStart && onLoginStart();
    const oauthUrl = `${TWITTER_URL}/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      "twitter",
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
  }, [scope, state, client_id, redirect_uri, onChangeLocalStorage]);

  return (
    <div className={className} onClick={onLogin}>
      {children}
    </div>
  );
};

export default memo(LoginSocialTwitter);
