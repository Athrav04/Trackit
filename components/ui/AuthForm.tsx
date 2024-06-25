"use client";

import React from 'react'
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
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { formSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';


const AuthForm = ({type}:{type:string}) => {
    const [user,setUser] = useState(null); 
    const [isLoading,setIsLoading] = useState(false);

const AuthFormSchema = formSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      Email: "",
      Password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    await new Promise((resolve)=>setTimeout(resolve,4000))
    setIsLoading(false);
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
                    Horizon
                </h1>
            </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                            {user ? 'Link Account'
                            : type === 'signIn '? 'Sign In'
                            :'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account get started'
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
                            <CustomInput control={form.control} name='FirstName'
                            label='First Name'
                            placeholder='John'/>

                            <CustomInput control={form.control} name='LastName'
                            label='Last Name'
                            placeholder='Doe'/>
                        </div>

                        <CustomInput control={form.control} name='Address'
                        label='Address'
                        placeholder='Enter your Address'/>

                       <div className='flex gap-4'>
                       <CustomInput control={form.control} name='State'
                        label='State'
                        placeholder='Example: Delhi'/>

                        <CustomInput control={form.control} name='PostalCode'
                        label='Postal Code'
                        placeholder='Example: 11111'/>
                       </div>

                       <div className='flex gap-4'>
                            <CustomInput control={form.control} name='DateOfBirth'
                            label='Date of Birth'
                            placeholder='YYYY-MM-DD'/>

                            <CustomInput control={form.control} name='PhoneNumber'
                            label='Phone Number'
                            placeholder='Enter your Phone Number'/>
                        
                       </div>
                    </>
                )}

                <CustomInput control={form.control}
                 name='Email'
                  label='Email'
                   placeholder={"Enter your email address"}/>

                <CustomInput control={form.control}
                 name='Password'
                  label='Password'
                   placeholder="Enter your password"/>

                <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn'>{
                    isLoading ? (
                    <>
                        <Loader2 size={20} className='animate-spin'/> &nbsp;
                        Loading...
                    </>) : (
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                    )
                }</Button>
                </div>
            </form>
        </Form>

        <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
                {type === 'sign-in' ? `Don’t have an account?` : 'Already have an Account?'}
            </p>
            <Link href={type === 'signIn' ? '/SignUp' : '/SignIn'} className='form-link'>
                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>

        </footer>
        </>)}
        
    </section>
    
  )
}

export default AuthForm