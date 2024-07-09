import {z} from 'zod';

export const signUpValidator = z.object({
    firstName: z
        .string({message:'enter firstName'})
        .min(2,{message:'firstName should be more than 2 characters'})
        .max(7,{message: 'firstName should not be more than 7 characters'}),
    lastName: z
        .string({message:'enter lastName'})
        .min(2,{message:'lastName should be more than 2 characters'})
        .max(7,{message: 'lastName should not be more than 7 characters'}),
    email: z
        .string({message:'enter email'})
        .email({message:'Please enter an email'}),
    password: z
        .string({message:'enter password'})
        .min(5,{message: 'Password should not be less than 5 characters'})
        .max(12,{message: 'Password should not be more than 12 characters'}),
    phoneNumber: z
        .string({message:'enter phoneNumber'})
        .min(11,{message: 'phoneNumber should not be less than 11 characters'})
        .max(11,{message: 'phoneNumber should not be more than 11 characters'}),
    gender:z.string({message:'enter gender'}),
    D_O_B: z.string({message:'enter D_O_B'}),
    address:z.string({message:'enter address'}),
}).required({message:'Please fill all the fields'})

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string()
})