"use client";

import Loader from "@/components/admin-panel/Loader";
// import Login from "@/components/admin-panel/Login";
import Sidebar from "@/components/admin-panel/Sidebar";
import { useAppSelector } from "@/redux/hooks";
// import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
// import RootLayout from "../layout";

const Layout = ({children}:{children:ReactNode}) => {
  const isLoading = useAppSelector((store) => store.LoadingReducer);
  // const { data: session } = useSession();

  // if (!session?.user) {
  //   return <Login />;
  // }

   
    return (
      <div>
        
        <div className="flex">
          {/* <Sidebar /> */}
          <Sidebar/>
          <div className="w-full h-full">
            {/* <Navbar /> */}
            <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
          </div>
          {isLoading && <Loader />}
        </div>
      </div>  
      );
  
};

export default Layout;