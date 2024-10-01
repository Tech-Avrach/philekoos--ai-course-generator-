"use client";

import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { createContext, useState } from "react";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(0);

    const getUserTokens = async (email, userName) => {

        console.log("email inside getUserTokens", email)

        console.log("userName inside getUserTokens", userName)

        const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, email), eq(Users.username, userName))

        console.log("result token", result)

        if(result.length > 0) {

            setUserToken(result[0]?.token);
            return result[0]?.token;
        }
    }

    const updateUserToken = async (token, email, userName) => {
        const result = await db
        .update(Users)
        .set({ token })
        .where(eq(Users.email, email), eq(Users.username, userName))

        getUserTokens(email, userName)
    }

   
  return (
    <UserTokenContext.Provider value={{userToken, setUserToken, getUserTokens, updateUserToken}}>
      {children}
    </UserTokenContext.Provider>
  );
};
