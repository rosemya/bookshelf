'use client';

import Link from "next/link";
import {useState} from "react";
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import {PageTitle} from "@/app/components/PageTitle";
import {LoginSchema} from "@/app/auth/AuthValidation";
import {auth} from "@/app/config";

const Login = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            loginUser(values)
        },
    });

    const loginUser = ({email, password}: {email: string, password: string}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setError(undefined);
                router.push("/main");
            })
            .catch(() => {
                setError("Invalid email and/or password");
            })
    }

    return (
        <form onSubmit={formik.handleSubmit} className={"flex flex-col justify-center items-center gap-10"}>
            <PageTitle title={"Login"}/>
            {error && <p className={"text-red-500"}>{error}</p>}
            <div className={"flex flex-col justify-center items-center gap-10"}>
                <TextField
                    name={"email"}
                    placeholder={"Email"} type={"email"}
                    error={Boolean(formik.errors.email) && formik.touched.email}
                    helperText={formik.errors.email && formik.touched.email}
                    onChange={formik.handleChange}
                    className={"w-[500px]"}
                />
                <div className={"flex flex-col text-right gap-2"}>
                    <TextField
                        name={"password"}
                        placeholder={"Password"}
                        type={"password"}
                        error={Boolean(formik.errors.password) && formik.touched.password}
                        onChange={formik.handleChange}
                        className={"w-[500px]"}
                    />
                    <Link href={"/"} className={"text-yellow-500"}>Forgot Password?</Link>
                </div>

                <Button variant={"outlined"} type={"submit"} className={"w-[500px] h-[50px]"}>Login</Button>
                <Button href={"/auth/signup"}>Sign Up</Button>
            </div>
        </form>
    )
}

export default Login;