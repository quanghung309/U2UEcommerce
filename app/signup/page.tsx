"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/lib/validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignupPage = () => {
    const router = useRouter();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTerms(e.target.checked);
    };

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (!acceptTerms) {
            setError("Please accept the terms and conditions");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.error || "Registration failed");
            } else {
                setSuccess(
                    "Account created successfully! Redirecting to login..."
                );
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-foreground'>
                    Create your account
                </h2>
                <p className='mt-2 text-center text-sm text-muted-foreground'>
                    Already have an account?{" "}
                    <Link
                        href='/login'
                        className='font-medium text-primary hover:text-primary/80'
                    >
                        Sign in
                    </Link>
                </p>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border'>
                    {error && (
                        <div className='mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md'>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className='mb-4 p-3 bg-primary/10 border border-primary/20 text-primary rounded-md'>
                            {success}
                        </div>
                    )}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    autoComplete='given-name'
                                                    placeholder='Enter your first name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    autoComplete='family-name'
                                                    placeholder='Enter your last name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                autoComplete='email'
                                                placeholder='Enter your email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                autoComplete='new-password'
                                                placeholder='Enter your password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                autoComplete='new-password'
                                                placeholder='Confirm your password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />{" "}
                            <div className='flex items-center'>
                                <input
                                    id='accept-terms'
                                    name='acceptTerms'
                                    type='checkbox'
                                    checked={acceptTerms}
                                    onChange={handleTermsChange}
                                    className='h-4 w-4 text-primary focus:ring-ring border-input rounded'
                                />
                                <label
                                    htmlFor='accept-terms'
                                    className='ml-2 block text-sm text-foreground'
                                >
                                    I agree to the{" "}
                                    <Link
                                        href='/terms'
                                        className='text-primary hover:text-primary/80'
                                    >
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href='/privacy'
                                        className='text-primary hover:text-primary/80'
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            <div>
                                <Button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full'
                                >
                                    {isLoading
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                            </div>{" "}
                            <div className='mt-6'>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-border' />
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-2 bg-card text-muted-foreground'>
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className='mt-6 grid grid-cols-2 gap-3'>
                                    <button
                                        type='button'
                                        className='w-full inline-flex justify-center py-2 px-4 border border-input rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted'
                                    >
                                        <span className='sr-only'>
                                            Sign up with Google
                                        </span>
                                        Google
                                    </button>
                                    <button
                                        type='button'
                                        className='w-full inline-flex justify-center py-2 px-4 border border-input rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted'
                                    >
                                        <span className='sr-only'>
                                            Sign up with Facebook
                                        </span>
                                        Facebook
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
