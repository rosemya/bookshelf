import Image from "next/image";

export const BookImage = ({image, title}: { image?: string | undefined, title: string }) => {
    if (image) {
        return (
            <div className={"relative w-[150px] h-[200px]"}>
                <Image src={image} alt={title || "Book Cover"} fill sizes={"(max-width: 150px), (max-width: 200px)"} priority />
            </div>
        );
    }

    // Alternative book cover if one is not provided
    return (
        <div className={"relative w-[150px] h-[200px]"}>
            <Image src={"/book.png"} alt={title || "Book Cover"} width={150} height={200} priority  />
        </div>
    );
}