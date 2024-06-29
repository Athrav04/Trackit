"use server"

import { ID } from "node-appwrite";
import { createSessionClient,createAdminClient } from "./appwrite";
import { cookies } from "next/headers";
import { endianness } from "os";
import { parseStringify } from "./utils";
import { redirect } from "next/navigation";
import { Account } from "node-appwrite";


const getSession = async ({account}:{account:Account})=> {
    const session = await account.getSession('current');
    return session;
}


//Server action to handle SignIn 
export const SignIn = async (userData:signInProps)=>{
    const {email,password} = userData;
    try{

        const {account} = await createAdminClient();
        // const activeSession = await getSession({account});
        // if(activeSession){
        //     console.log("session active",activeSession);
        //     const result = await account.deleteSession(activeSession.$id);
        //     console.log(`Session deleted ${JSON.stringify(result)}`);

        // }
        // else{
        //     console.log("No active session found");
        // }
        const session = await account.createEmailPasswordSession(email,password);
        cookies().set('appwrite-session',session.secret,{
            path:'/',
            httpOnly:true,
            sameSite:'strict',
            secure:true
        })
        console.log("SignIn successful session created",session);
        return JSON.stringify(session);
    }
    catch(error){
        console.error("Error",error)
    }
    finally{
        console.log("SignIn server actions executed successfully");
    }
}

//Server action to handle SignUp
export const SignUp = async (userData:SignUpParams)=>{

    const {email,password,firstName,lastName} = userData;
    try{
        const {account} = await createAdminClient();

        //expects 3 arguments userID,email,password,name
        const newUserAccount = await account.create(ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`);

        const session = await account.createEmailPasswordSession(email,password);

        cookies().set('appwrite-session',session.secret,{
            path:'/',
            httpOnly:true,
            sameSite:'strict',
            secure:true
        });
        console.log("New User created",newUserAccount);
        return JSON.stringify(newUserAccount);
    }
    catch(error){
        console.error("Error",error);
    }
    finally{
        console.log('SignUp server actions executed successfully');
    }
}

//Server action to get the current logged in user in the application
export async function getLoggedInUser(){
    try{
        const {account} = await createSessionClient();
        return await account.get();
    }
    catch(error){
        console.error("Error",error);
        return null;
    }
}