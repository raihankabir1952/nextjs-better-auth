
"use client";

import { signIn } from "../../lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password
        })
        if(error){
            toast.danger('Login Failed',{
                description: error.message || "Invalid email or password"
            });
            return;
        }
        toast.success('Login Successfull',{
            description: "welcome back!",
        });
        router.push("/");
    };

    return (
        <div className="flex min-h-screen ">
            <Form
                className="flex w-96 flex-col gap-4"
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField className="w-full max-w-[280px]" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            placeholder="enter your password"
                            className="w-full max-w-[280px]"
                            type={isVisible ? "text" : "password"}
                            // value={isVisible ? "" : "enter your password"}
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>

                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;
