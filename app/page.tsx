"use client";

import { Box, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import WrapResultModal from "@/commons/ResultModal";

export default function Staking() {
  const { warningMessage, ResultModal } = WrapResultModal();

  return <>Hello world</>;
}
