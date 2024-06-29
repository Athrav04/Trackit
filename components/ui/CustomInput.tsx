import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '@/lib/utils'

const AuthFormSchema = formSchema('sign-up');

interface customInputProps {
    control : Control<z.infer<typeof AuthFormSchema>>,
    name: FieldPath<z.infer<typeof AuthFormSchema>>,
    label:string,
    placeholder:string
}

const CustomInput = ({control,name,label,placeholder}:customInputProps) => {
  return (
    <div>
         <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <div className='form-item'>
                        <FormLabel className='form-label'>
                            {label}
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                            <FormControl>
                                <Input id={name} placeholder={placeholder}
                                 className={`input-class ${name === 'address'?'h-20':''}`} type={name === 'password'? 'password':'text'}
                                {...field}></Input>
                            </FormControl>
                            <FormMessage className='form-message mt-2'/>
                        </div>

                    </div>
                )}
                />
    </div>
  )
}

export default CustomInput