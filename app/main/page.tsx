'use client';

import {useContext, useEffect, useState} from "react";
import {Box, Divider, CircularProgress} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import {AuthContext} from "@/app/components/AuthContext";
import {useRouter} from "next/navigation";
import {baseURL} from "@/app/config";
import {PageTitle} from "@/app/components/PageTitle";


const categories = [
    "Fantasy",
    "Thriller",
    "Horror",
    "Drama",
    "Fiction",
    "Romance",
    "Adventure",
    "Manga",
    "Religion",
    "Mythology",
]

export default function Main() {
    const { user, loading } = useContext(AuthContext);
    const [nyt, setNyt] = useState([]);
    const [loadingNYT, setLoadingNYT] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }

        if (!loading) {
            fetch(baseURL + '/nyt')
                .then(response => response.json())
                .then(data => {
                    setNyt(data.message);
                    setLoadingNYT(false);
                })
                .catch(error => {
                    console.error('Error fetching NYT data:', error);
                });
        }
    }, [user, loading])

    return (
        <div className={"px-10"}>
            <PageTitle title={"Explore"} />

            <div>
                <p className={"text-3xl pb-10"}>Categories to Explore</p>

                <div className={"flex flex-wrap gap-10"}>
                    {categories.map((category) => (
                        <Link href={`/main/category/${category}`} key={category} className={"text-blue-400"}>{category}</Link>
                    ))}
                </div>
            </div>

            {loadingNYT &&
                <div className={"flex flex-col items-center"}>
                    <CircularProgress />
                    <p>Loading NYT Best Sellers...</p>
                </div>
            }

            {nyt.length ? (
                <div>
                    <p className={"text-3xl font-bold my-10"}>NYT Best Sellers</p>

                    {nyt.map((item: any, i: number) => (
                        <div key={i} className={"pb-20 flex flex-col gap-10"}>
                            <p className={"text-2xl"}>{item.listName}</p>
                            <Divider />

                            <div className={"flex flex-wrap justify-center gap-15"}>
                                {item.books.map((book: any) => (
                                    <Link key={book.primary_isbn13} href={`/main/book/${book.primary_isbn13}`} className={"w-[200px]"}>
                                        <Box sx={{position: "relative", width: "200px", height: "350px"}}>
                                            <Image src={book.book_image} alt={book.title} fill sizes="(max-width: 200px), (max-width: 350px)" />
                                        </Box>
                                        <p className={"font-bold"}>{book.title}</p>
                                        <p>{book.author}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ): undefined}
        </div>
    )
}