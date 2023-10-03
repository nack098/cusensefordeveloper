"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <ChakraProvider>
        <CacheProvider>{children}</CacheProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default Provider;
