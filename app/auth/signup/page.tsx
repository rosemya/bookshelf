'use client';

import {useState} from "react";
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {signInWithEmailAndPassword} from "firebase/auth";

import {SignupSchema} from "@/app/auth/AuthValidation";
import {PageTitle} from "@/app/components/PageTitle";
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
        fetch(baseURL + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName
            })
        })
            .then(response => response.json())
            .then(() => {
                // Sign in the user to firebase locally
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        router.push("/main");
                    })
            })
            .catch(() => setError("An error has occurred please try again"));
    }

    return (
        <form onSubmit={formik.handleSubmit} className={"flex flex-col justify-center items-center gap-10"}>
            <PageTitle title={"Sign Up"}/>
            {error && <p className={"text-red-500"}>{error}</p>}
            <TextField
                name={"firstName"}
                placeholder={"First Name"}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                className={"w-[500px]"}
            />
            <TextField
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                className={"w-[500px]"}
            />
            <TextField
                name={"email"}
                placeholder={"Email"}
                type={"email"}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className={"w-[500px]"}
            />
            <TextField
                name={"password"}
                placeholder={"Password"}
                type={"password"}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                className={"w-[500px]"}
            />

            <Button variant={"outlined"} type={"submit"} className={"w-[500px] h-[50px]"}>Sign Up</Button>
            <Button href={"/auth/login"}>Login</Button>
        </form>
    );
}

export default SignUp;