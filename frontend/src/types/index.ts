import { ChangeEvent } from "react";
import { z } from 'zod';

export interface CardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export type SignupInputType = z.infer<typeof signupInput>;
export type SigninInputType = z.infer<typeof signinInput>;
