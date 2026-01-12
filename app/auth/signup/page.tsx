'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {SignupSchema} from "@/app/auth/AuthValidation";
import {SectionTitle} from "@/app/components/SectionTitle";
import {auth, baseURL} from "@/app/config";

const SignUp = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            registerUser(values)
        },
    });

    const registerUser = ({email, password, firstName, lastName}:{
        email: string
        password: string
        firstName: string
        lastName: string
    }) => {
        console.log(email);

        fetch(`${baseURL}/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, firstName, lastName})
        }).then(res => res.json())
            .then(result => {
                if (result.error) {
                    setError(result.error)
                }

                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        router.push("/main")
                    })
                    .catch(e => {
                        console.log(e)
                        setError("Something went wrong try signing in instead!")
                    })
            })
            .catch((e) => {
                console.error(e);
                setError("Something went wrong please try again!")
            });
    }

    return (
        <form onSubmit={formik.handleSubmit} className={"flex flex-col justify-center md:w-[500px] gap-10"}>
            <SectionTitle title={"Sign Up"}/>
            {error && <p className={"text-red-500 text-center"}>{error}</p>}

            <TextField
                name={"firstName"}
                placeholder={"First Name"}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
                name={"email"}
                placeholder={"Email"}
                type={"email"}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                name={"password"}
                placeholder={"Password"}
                type={"password"}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />

            <Button variant={"outlined"} type={"submit"} className={"w-full h-[50px]"}>Sign Up</Button>
            <Button href={"/auth/login"}>Login</Button>
        </form>
    );
}

export default SignUp;