"use client";

import { useSession } from "next-auth/react";

const Scraper = () => {
  const { data, status } = useSession();
  return null;
};
