'use client';


import {useContext, useEffect, useState} from "react";
import {Snackbar, Box} from "@mui/material";
import { PiHeartThin } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";

import {AuthContext} from "@/app/components/AuthContext";
import {baseURL} from "@/app/config";

export const AddToFavorite = ({book, isbn, favorite}: {book: any, isbn: string, favorite: boolean}) => {
    const {user} = useContext(AuthContext);
    const [snackbarMessage, setSnackbarMessage] = useState<string|undefined>(undefined);
    const [favoriteButton, setFavoriteButton] = useState<boolean>(favorite);

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
            .then(() => {
                setFavoriteButton(false);
                setSnackbarMessage("Book added to favorites!")
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    }

    const removeBookFromFavorites = async () => {

        console.log(isbn)
        await fetch(baseURL + `/list/${user?.uid}/favorites/${isbn}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            setFavoriteButton(true);
            setSnackbarMessage("Book removed from favorites!")
        })
            .catch(e => console.log("error", e))
    }

    useEffect(() => {
    }, [favoriteButton])

    return (
        <Box sx={{position: "relative"}}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarMessage !== undefined}
                autoHideDuration={3000}
                onClose={() => setSnackbarMessage(undefined)}
                message={snackbarMessage}
            />

            {favoriteButton ?
                (
                    <button onClick={addBookToFavorites} className={"text-lg text-[#FFAE00] flex gap-3 cursor-pointer"}>
                        <PiHeartThin color={"black"} size={25}/>Add to Favorite
                    </button>
                ) : (
                    <button onClick={removeBookFromFavorites} className={"text-lg text-[#FFAE00] flex gap-3 cursor-pointer items-center"}>
                        <TfiClose color={"black"} /> Remove from Favorites
                    </button>
                )
            }
        </Box>
    );
}