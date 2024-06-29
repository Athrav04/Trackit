"use client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { formSchema } from '@/lib/utils';
import { Loader2, User } from 'lucide-react';
import { SignIn, SignUp, getLoggedInUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';



const AuthForm = ({type}:{type:string}) => {
    const [user,setUser] = useState<string | undefined>(undefined); 
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();

    const AuthFormSchema = formSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof AuthFormSchema>) {
    console.log("clicked")
    try{
        setIsLoading(true);
        if(type === 'signUp'){
            const newUser = await SignUp(data);
            setUser(newUser);
        }
        
        if(type === 'signIn'){
            console.log("inside SignIn")
            const session = await SignIn(data);
            setUser(session);

            if(session) router.push('/');
        }
        else{
            console.log("inside the else of onSubmit")
        }
    }
    catch(error){
        console.error("Error",error);
    }
    finally{
        setIsLoading(false);
    }
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/'
            className="mb-12 flex cursor-pointer iterms-center gap-2">
                <Image src={'/icons/logo.svg'} 
                width={34}
                height={34} 
                alt='Trackit Logo' 
                className=' size-[24px] max-xl:size-14 '
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                    Trackit
                </h1>
            </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                            {user ? 'Link Account'
                            : type === 'signIn'? 'Sign In'
                            :'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started'
                            : 'Please enter your details '}
                    </p>
                    </h1>
            </div>
        </header>
        {user ? (<div className='flex flex-col gap-4'>
            {}
        </div>)
        :
        (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {type === 'signUp' && (
                    <>
                        <div className='flex gap-4'>
                            <CustomInput control={form.control} name='firstName'
                            label='First Name'
                            placeholder='John'/>

                            <CustomInput control={form.control} name='lastName'
                            label='Last Name'
                            placeholder='Doe'/>
                        </div>

                        <CustomInput control={form.control} name='address'
                        label='Address'
                        placeholder='Enter your Address'/>

                       <div className='flex gap-4'>
                       <CustomInput control={form.control} name='state'
                        label='State'
                        placeholder='Example: Delhi'/>

                        <CustomInput control={form.control} name='postalCode'
                        label='Postal Code'
                        placeholder='Example: 11111'/>
                       </div>

                       <div className='flex gap-4'>
                            <CustomInput control={form.control} name='dateOfBirth'
                            label='Date of Birth'
                            placeholder='YYYY-MM-DD'/>

                            <CustomInput control={form.control} name='phoneNumber'
                            label='Phone Number'
                            placeholder='Enter your Phone Number'/>
                        
                       </div>
                    </>
                )}

                <CustomInput control={form.control}
                 name='email'
                  label='Email'
                   placeholder={"Enter your email address"}/>

                <CustomInput control={form.control}
                 name='password'
                  label='Password'
                   placeholder="Enter your password"/>

                <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn'>{
                    isLoading ? (
                    <>
                        <Loader2 size={20} className='animate-spin'/> &nbsp;
                        Loading...
                    </>) : (
                        type === 'signIn' ? 'Sign In' : 'Sign Up'
                    )
                }</Button>
                </div>
            </form>
        </Form>

        <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
                {type === 'signIn' ? `Don’t have an account?` : 'Already have an Account?'}
            </p>
            <Link href={type === 'signIn' ? '/SignUp' : '/SignIn'} className='form-link'>
                {type === 'signIn' ? 'Sign Up' : 'Sign In'}
            </Link>

        </footer>
        </>)}
        
    </section>
    
  )
}

export default AuthForm