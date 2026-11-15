
"use client";

import React from "react";
import { useState } from "react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { signUp } from "../../lib/auth-client";
import { useRouter } from "next/navigation";


const SignUpPage = () => {
    const router = useRouter();

    const [profileImage, setProfileImage] = useState(null); // for profile image


    const uploadImage = async () => {
        if (!profileImage) return null;

        const formData = new FormData();

        formData.append("image", profileImage);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        console.log(result);

        return result;
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Step 1: Upload image to ImgBB
        const uploadResult = profileImage
            ? await uploadImage()
            : null;

        // Step 2: Check upload result
        if (profileImage && !uploadResult?.success) {
            alert("Profile image upload failed");
            return;
        }

        // Step 3: Prepare signup data
        const signupData = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        // Step 4: Add image URL if available
        if (uploadResult?.imageUrl) {
            signupData.image = uploadResult.imageUrl;
        }
        console.log("Image URL being sent:", signupData.image);

        // Step 5: Register user with Better Auth
        const { data: resData, error } = await signUp.email(signupData);

        if (resData) {
            router.push("/sign-in");
        }

    };

    return (
        <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={onSubmit}
        >

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-default-300 bg-default-100">

                    {profileImage ? (
                        <img
                            src={URL.createObjectURL(profileImage)}
                            alt="Profile Preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <svg
                            className="h-10 w-10 text-default-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 10l4.5-4.5M19.5 5.5H15m4.5 0V10M4 16l4-4 4 4 3-3 5 5"
                            />
                            <circle cx="9" cy="7" r="2" strokeWidth={1.5} />
                        </svg>
                    )}

                </div>

                <div className="text-center">
                    <Label>Profile Picture</Label>
                    <Description>
                        Upload a profile picture (optional)
                    </Description>
                </div>

                <label
                    htmlFor="profileImage"
                    className="cursor-pointer rounded-lg border border-default-300 px-4 py-2 text-sm font-medium transition hover:bg-default-100"
                >
                    Choose Image
                </label>

                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files[0];

                        //check whether user selected file
                        if (!file) {
                            return;
                        }
                        //allowed image formats
                        const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

                        //validate image type
                        if (!allowedTypes.includes(file.type)) {
                            alert('Only JPG, PNG and WEBP images are allowed')
                            e.target.value = "";
                            return;
                        }
                        //validate image size(5MB)
                        if (file.size > 5 * 1024 * 1024) {
                            alert('Image size must be less than 5MB')
                            e.target.value = "";
                            return;
                        }

                        //save valid image in state
                        setProfileImage(file)
                    }}
                />

                <p className="text-xs text-default-400">
                    JPG, PNG or WEBP. Maximum size 5MB.
                </p>
            </div>

            {/* Name Field */}
            <TextField
                isRequired
                name="name"
                validate={(value) => {
                    if (value.length < 3) {
                        return "Name must be at least 3 characters";
                    }
                    return null;
                }}
            >
                <Label>Name</Label>
                <Input placeholder="John Doe" />
                <FieldError />
            </TextField>

            {/* Email Field */}
            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        return "Please enter a valid email address";
                    }

                    return null;
                }}
            >
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
            </TextField>

            {/* Password Field */}
            <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                    if (value.length < 8) {
                        return "Password must be at least 8 characters";
                    }

                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }

                    if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                    }

                    return null;
                }}
            >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />

                <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                </Description>

                <FieldError />
            </TextField>

            {/* Form Actions */}
            <div className="flex gap-2">
                <Button type="submit">
                    Submit
                </Button>

                <Button
                    type="reset"
                    variant="secondary"
                    onPress={() => setProfileImage(null)}
                >
                    Reset
                </Button>
            </div>
        </Form>
    );
};

export default SignUpPage;
