'use client';

import {useParams, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {Container, Box} from "@mui/material";
import Link from "next/link";

import {AuthContext} from "@/app/components/AuthContext";
import {baseURL} from "@/app/config";
import {BookImage} from "@/app/components/BookImage";
import {AddToFavorite} from "@/app/components/AddToFavorite";

export default function Main() {
    const {isbn} = useParams<{ isbn: string; }>();
    const { user, loading } = useContext(AuthContext);
    const [book, setBook] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }

        if (!loading) {
            fetch(baseURL + `/book/${isbn}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setBook(data.message.volumeInfo)
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                });
        }
    }, [user, loading]);


    return !loading && book.title && (
        <Container className={"sm:w-[50vw] items-center sm:items-start h-screen flex flex-col gap-10 mt-20 px-10"}>
            <Box className={"flex flex-col sm:flex-row gap-10"}>
                <BookImage image={book.imageLinks?.thumbnail} title={book.title} />
                <Box className={"flex flex-col justify-between gap-10"}>
                    <div>
                        <p className={"text-2xl"}>{book.title}</p>
                        <div className={"flex"}>
                            {book.authors.map((author: string, i: number) => (
                                <div key={i} className={"flex gap-2"}>
                                    {i > 0 ? <p className={"text-xl pl-1"}>,</p> : undefined}
                                    <Link href={`/main/author/${author}`} className={"text-xl text-[#FFAE00]"}>{author}</Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <AddToFavorite book={book} isbn={isbn} />
                </Box>
            </Box>

            <Box>
                <p className={"text-3xl mb-10"}>Description</p>
                {book.description && <p>{book.description}</p>}

                <div className={"flex flex-col gap-2"}>
                    <p className={"text-2xl mt-10 mb-5"}>Details</p>
                    {book.publisher && <p>Publisher: {book.publisher}</p>}
                    <p>Published Date: {book.publishedDate}</p>
                    {book.pageCount > 0 ? <p>Pages: {book.pageCount}</p> : undefined}
                    <p>Maturity Rating: {book.maturityRating === "NOT_MATURE" ? "Not Mature" : "Mature"}</p>
                    <p>ISBN 13: {isbn}</p>
                </div>
            </Box>
        </Container>
    );
}