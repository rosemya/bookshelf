'use client';

import {useContext, useEffect, useState} from "react";
import {Container, Box} from "@mui/material";
import Link from "next/link"
import {useRouter} from "next/navigation";

import {baseURL} from "@/app/config";
import {PageTitle} from "@/app/components/PageTitle";
import {BookImage} from "@/app/components/BookImage";
import {AuthContext} from "@/app/components/AuthContext";
import {RemoveFavorite} from "@/app/components/RemoveFavorite";

export default function Bookshelf() {
    const {user, loading} = useContext(AuthContext);
    const [books, setBooks] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }

        fetch(baseURL + `/list/${user?.uid}/favorites`)
            .then(res => res.json())
            .then(data => setBooks(data.message))
            .catch(() => setBooks([]))
    }, []);

    return (
        <Container>
            <PageTitle title={"Favorites"} />
            {books.length ? (
                <Box className={"flex gap-10"}>
                    {books.map((book: any, i: number) => (
                        <div key={i} className={"flex flex-col"}>
                            <Link href={`/main/book/${book.isbn}`} className={"cursor-pointer"}>
                                <BookImage image={book.image} title={book.title} />
                                <p className={"font-bold"}>{book.title}</p>
                                <p>{book.author}</p>
                            </Link>
                            <RemoveFavorite isbn={book.isbn} user={user} books={books} setBooks={setBooks} />
                        </div>
                    ))}
                </Box>
            ) : <p className={"text-center mt-25"}>No books added yet. Explore to add some books!</p>
            }
        </Container>
    )
}