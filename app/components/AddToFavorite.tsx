'use client';


import {useContext, useState} from "react";
import {Snackbar, Box} from "@mui/material";
import { PiHeartThin } from "react-icons/pi";

import {AuthContext} from "@/app/components/AuthContext";
import {baseURL} from "@/app/config";

export const AddToFavorite = ({book, isbn}: {book: any, isbn: string}) => {
    const {user} = useContext(AuthContext);
    const [snackbar, setSnackbar] = useState<boolean>(false);

    const addBookToFavorites = async () => {
        // Get book info from Google Books API
        await fetch(baseURL + "/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isbn,
                list: "favorites",
                uid: user?.uid,
                title: book.title,
                author: book.authors[0],
                image: book.imageLinks?.thumbnail,
            })
        })
            .then(response => response.json())
            .then(() => setSnackbar(true))
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    }

    return (
        <Box sx={{position: "relative"}}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar(false)}
                message={"Book added to favorites"}
            />
            <button onClick={addBookToFavorites} className={"text-lg text-[#FFAE00] flex gap-5 cursor-pointer"}>
                <PiHeartThin color={"black"} size={25} />Add to Favorite
            </button>
        </Box>
    );
}