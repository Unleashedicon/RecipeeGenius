"use client";

import { useIsMounted } from "../hooks/useIsMounted";
import Recipee from "../components/recipee";
import { Fragment, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import  Popular from "../components/popular-recipee";
import  Latest from "../components/latest-recipee";
import  Choice from "../components/choice";

export const dynamic = "force-dynamic";

export default function Home() {
  const { isConnected, address } = useAccount();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <main className="flex flex-col py-6">
      <div className="flex flex-col h-full gap-6 justify-center items-center">
        <Fragment>
          <Recipee />
          <Popular />
          <Latest />
          <Choice />
        </Fragment>
      </div>
    </main>
  );
}