"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
            return;
        }

        // Initialize form with session data
        setFormData((prev) => ({
            ...prev,
            firstName: session.user.firstName || "",
            lastName: session.user.lastName || "",
            email: session.user.email || "",
        }));
    }, [session, status, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Clear messages when user starts typing
        if (errors.length > 0) setErrors([]);
        if (success) setSuccess("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        setSuccess("");

        try {
            // Here you would typically call an API to update the user profile
            // For now, we'll just simulate success
            setTimeout(() => {
                setSuccess("Profile updated successfully!");
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            setErrors(["An error occurred while updating your profile."]);
            setIsLoading(false);
        }
    };
    if (status === "loading") {
        return (
            <div className='min-h-screen flex items-center justify-center bg-background'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className='min-h-screen bg-background'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-card shadow rounded-lg border border-border'>
                    <div className='px-4 py-5 sm:p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h1 className='text-3xl font-bold text-foreground'>
                                Profile Settings
                            </h1>
                            <Link
                                href='/dashboard'
                                className='inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-muted'
                            >
                                ← Back to Dashboard
                            </Link>
                        </div>
                        {errors.length > 0 && (
                            <div className='mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md'>
                                <ul className='list-disc list-inside space-y-1'>
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}{" "}
                        {success && (
                            <div className='mb-4 p-3 bg-primary/10 border border-primary/20 text-primary rounded-md'>
                                {success}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                <div>
                                    <label
                                        htmlFor='firstName'
                                        className='block text-sm font-medium text-foreground'
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='lastName'
                                        className='block text-sm font-medium text-foreground'
                                    >
                                        Last Name
                                    </label>{" "}
                                    <input
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium text-foreground'
                                >
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                    className='mt-1 block w-full border-border rounded-md shadow-sm bg-muted text-muted-foreground'
                                />
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    Email cannot be changed
                                </p>
                            </div>{" "}
                            <div>
                                <label
                                    htmlFor='phoneNumber'
                                    className='block text-sm font-medium text-foreground'
                                >
                                    Phone Number
                                </label>
                                <input
                                    type='tel'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                />
                            </div>
                            <div className='border-t border-border pt-6'>
                                <h3 className='text-lg font-medium text-foreground mb-4'>
                                    Address
                                </h3>

                                <div className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='address.street'
                                            className='block text-sm font-medium text-foreground'
                                        >
                                            Street Address
                                        </label>
                                        <input
                                            type='text'
                                            id='address.street'
                                            name='address.street'
                                            value={formData.address.street}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                        <div>
                                            <label
                                                htmlFor='address.city'
                                                className='block text-sm font-medium text-foreground'
                                            >
                                                City
                                            </label>{" "}
                                            <input
                                                type='text'
                                                id='address.city'
                                                name='address.city'
                                                value={formData.address.city}
                                                onChange={handleChange}
                                                className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor='address.state'
                                                className='block text-sm font-medium text-foreground'
                                            >
                                                State
                                            </label>
                                            <input
                                                type='text'
                                                id='address.state'
                                                name='address.state'
                                                value={formData.address.state}
                                                onChange={handleChange}
                                                className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor='address.zipCode'
                                                className='block text-sm font-medium text-foreground'
                                            >
                                                ZIP Code
                                            </label>
                                            <input
                                                type='text'
                                                id='address.zipCode'
                                                name='address.zipCode'
                                                value={formData.address.zipCode}
                                                onChange={handleChange}
                                                className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor='address.country'
                                                className='block text-sm font-medium text-foreground'
                                            >
                                                Country
                                            </label>
                                            <input
                                                type='text'
                                                id='address.country'
                                                name='address.country'
                                                value={formData.address.country}
                                                onChange={handleChange}
                                                className='mt-1 block w-full border-border rounded-md shadow-sm focus:ring-ring focus:border-border bg-background text-foreground'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:bg-primary/50 disabled:cursor-not-allowed'
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
