'use client';

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Container, Box} from "@mui/material";
import Link from "next/link";

import {baseURL} from "@/app/config";
import {PageTitle} from "@/app/components/PageTitle";
import {BookImage} from "@/app/components/BookImage";

export default function Author() {
    const {author} = useParams<{ author: string; }>();
    const [authorInfo, setAuthorInfo] = useState<any[]>([]);

    useEffect(() => {
        fetch(baseURL + `/author?author=${author.replaceAll(" ", "+")}&index=0`)
            .then(res => res.json())
            .then(data => setAuthorInfo(data.message.items))
            .catch(() => setAuthorInfo([]));
    }, []);

    return (
        <Container>
            <PageTitle title={author.replaceAll("%20", " ")}/>

            <Box className={"flex flex-wrap gap-10 justify-center"}>
                {authorInfo.map((item: any, i: number) => {
                    const book = item.volumeInfo;
                    let isbn = "";

                    book.industryIdentifiers.map((item: any )=> {
                        if (item.type === "ISBN_13") {
                            isbn = item.identifier;
                        }
                    })

                    return (
                        <Link key={i} href={`/main/book/${isbn}`}>
                            <BookImage image={book.imageLinks?.thumbnail} title={book.title} />
                            <p className={"w-[200px] font-bold"}>{book.title}</p>
                        </Link>
                    )
                })}
            </Box>
        </Container>
    )
}