import { useAppSelector } from "@/redux/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { BsSearch, BsSearchHeartFill } from "react-icons/bs";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { AiOutlineShoppingCart } from "react-icons/ai";

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropsType) => {
  const cartCount = useAppSelector((state) => state.cartReducer.length);

  return (
    <div className="pt-4 bg-white top-0 sticky">
      <div className="container">
        <div className="flex justify-between items-center w-full">
          <div className="text-4xl font-bold">Logo</div>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
                className="border-2 border-accent px-6 py-2 w-full"
                type="text"
                placeholder="Search for products..."
            />

            <div className="bg-accent text-white text-[26px] grid place-items-center px-4">
                <BsSearch /> 
            </div>
            </div>
            
            <div className="flex -m-120 justify-center items-center p-4 h-16">
                           <SignedOut>
                              <SignInButton />
                              <SignUpButton />
                            </SignedOut>
                            <SignedIn>
                              <UserButton  />
                            </SignedIn>
            </div>
            <div>
            <div
                className="text-gray-500 text-[32px] relative cursor-pointer"
                onClick={() => setShowCart(true)}
            >
                <AiOutlineShoppingCart />

                <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                {cartCount}
                </div>
            </div>
            </div>  
        </div>
        <div className="border-b border-gray-200 pt-4" />
      </div>
    </div>
  );
};

export default Navbar;