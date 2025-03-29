//import React from 'react'
"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"

interface Propstype{
    children:ReactNode;
}

export const AuthProvider = ({children}:Propstype) => {
  return <SessionProvider>{children}</SessionProvider>
};
