import {z} from 'zod'

export const addProductValidator = z.object({
    name: z
        .string({message: 'Name is required'})
        .min(2,{message: 'name of product should not be less than 2 characters'})
        .max(15,{}),
    description: z
        .string({message: 'Description is required'})
        .min(1,{})
        .max(1000,{}),
    price: z
        .number({message: 'Price is required'})
        .min(1,{}),
    quantity: z
        .number({message: 'Quantity is required'})
        .min(1,{}),
    status: z
        .string({message: 'Status is required'}),
    image: z 
        .string({message: 'Image is required'})
}).required({message: 'All fields are required'})