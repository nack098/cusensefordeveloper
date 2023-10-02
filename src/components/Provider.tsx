"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ChakraProvider>
      <CacheProvider>{children}</CacheProvider>
    </ChakraProvider>
  );
};

export default Provider;
