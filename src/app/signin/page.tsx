 import { SignInButton } from "@clerk/nextjs";
import React from "react";

export default async function Signin(){


    return <main className="bg-black h-screen flex flex-col items-center font-mono center justify-center text-white overflow-y-auto overflow-x-hidden">
    <main/>
    
        <SignInButton afterSignInUrl="/"/>
    
    </main>
}