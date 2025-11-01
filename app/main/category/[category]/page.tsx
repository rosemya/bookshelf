'use client';

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Container, Box, Button, CircularProgress} from "@mui/material";

import {baseURL} from "@/app/config";
import {PageTitle} from "@/app/components/PageTitle";
import {BookImage} from "@/app/components/BookImage";

export default function Category() {
    const {category} = useParams<{ category: string; }>();
    const router = useRouter();

    const [books, setBooks] = useState<any[]>([]);
    const [offset, setOffset] = useState<number>(100);
    const [loading, setLoading] = useState<boolean>(true);

    const getMoreBooks = () => {
        setLoading(true);

        fetch(baseURL + `/category?subject=${category.toLowerCase()}&index=${offset}&max=100`)
            .then(response => response.json())
            .then(data => {
                setBooks(books => [...books, ...data.message.works]);
                setOffset(offset => offset + 100);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            })
    }

    const goToBook = (book: any) => {
        // Get ISBN from Open Library API
        fetch(`https://openlibrary.org/books/${book.cover_edition_key}.json`)
            .then(response => response.json())
            .then(data => {
                const isbn = data.isbn_13[0];
                router.push(`/main/book/${isbn}`);
            })
            .catch(() => {
                // Search Google Books API for the book title
                fetch(`https://www.googleapis.com/books/v1/volumes?q=${book.title.replaceAll(" ", "+")}${book.author ? `+inauthor:${book.author.toLowerCase().replaceAll(" ", "+")}` : ""}`)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        const items = result.items;
                        items.forEach((item: any) => {
                            const volumeInfo = item.volumeInfo;

                            if (volumeInfo.industryIdentifiers) {
                                volumeInfo.industryIdentifiers.forEach((identifier: any) => {
                                    if (identifier.type === "ISBN_13") {
                                        const isbn = identifier.identifier;
                                        router.push(`/main/book/${isbn}`);
                                    }
                                })
                            }
                        })
                    }).catch(err => console.log(err));
            });
    }

    useEffect(() => {
        // Get books in category
        fetch(baseURL + `/category?subject=${category.toLowerCase()}&index=0&max=100`)
            .then(response => response.json())
            .then(data => {
                setBooks(data.message.works);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, [])

    return (
        <Container className={"h-full flex flex-col items-center"}>
            <PageTitle title={category} />

            <Box className={"flex flex-wrap justify-center gap-7"}>
                {books.map((book: any, i) => {
                    if (book.cover_edition_key) {
                        return (
                            <Box key={i} className={"w-[150px] cursor-pointer"} onClick={() => goToBook(book)}>
                                <BookImage image={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`} title={book.title} />
                                <p className={"font-bold"}>{book.title}</p>
                                <p>{book.authors[0].name}</p>
                            </Box>
                        )
                    }
                })}
            </Box>

            {loading ? (
                <div className={"flex flex-col items-center"}>
                    <CircularProgress />
                    <p className={"text-center"}>Loading...</p>
                </div>
            ) : undefined}

            {loading ? undefined : <Button onClick={getMoreBooks}>Load More</Button>}

        </Container>
    )
}