import {Button} from "@mui/material";
import {User} from "firebase/auth";
import {baseURL} from "@/app/config";

export const RemoveFavorite = ({isbn, user, setBooks, books}: {isbn: string, user: User | null, setBooks: any, books: any[]}) => {

    const removeFavorite = () => {
        if (user) {
            fetch(baseURL + `/list/${user.uid}/favorites/${isbn}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const filter = books.filter((book: any) => book.isbn !== isbn);
                    setBooks(filter);
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                }
                )
        }
    }

    return (
        <Button onClick={removeFavorite}>Remove</Button>
    )
}