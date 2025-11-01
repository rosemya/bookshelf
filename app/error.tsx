'use client';

import {useRouter} from "next/navigation";
import {Button} from "@mui/material";

export default function GlobalError() {
    const router = useRouter();

    const goHome = () => {
        router.back();
    }

    return (
        <div className="error-container flex flex-col items-center justify-center h-screen">
            <h2 className={"mb-20"}>Oops! Something went wrong</h2>
            <Button
                onClick={goHome}
                variant={"contained"}
            >
                Go Back
            </Button>
        </div>
    )
}