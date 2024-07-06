import { useMemo } from "react";
import useWindowSize from "./useWindowSize";
import { MOBILEDEVICE } from "@/constants/common";

const useMobile = () => {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => {
    return (
      width <= MOBILEDEVICE ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    );
  }, [width]);
  return isMobile;
};
export default useMobile;
