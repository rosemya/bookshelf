'use client';

import Link from "next/link";
import {useState} from "react";
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import {SectionTitle} from "@/app/components/SectionTitle";
import {LoginSchema} from "@/app/auth/AuthValidation";
import {auth} from "@/app/config";
import {useRouter} from "next/navigation";

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
        console.log("values", email);
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
        <form onSubmit={formik.handleSubmit} className={"flex flex-col justify-center md:w-[500px] gap-10"}>
            <SectionTitle title={"Login"}/>
            {error && <p className={"text-red-500 text-center"}>{error}</p>}

            <TextField
                name={"email"}
                placeholder={"Email"} type={"email"}
                error={Boolean(formik.errors.email) && formik.touched.email}
                helperText={formik.touched.email && formik.errors.email }
                onChange={formik.handleChange}
            />
            <div className={"flex flex-col text-right gap-2"}>
                <TextField
                    name={"password"}
                    placeholder={"Password"}
                    type={"password"}
                    error={Boolean(formik.errors.password) && formik.touched.password}
                    helperText={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                />
                <Link href={"/"} className={"text-yellow-500"}>Forgot Password?</Link>
            </div>

            <Button variant={"outlined"} type={"submit"} className={"w-full h-[50px]"}>Login</Button>
            <Button href={"/auth/signup"}>Sign Up</Button>
        </form>
    )
}

export default Login;