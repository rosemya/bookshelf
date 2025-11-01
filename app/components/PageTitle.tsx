export const PageTitle = ({title, css}: {title: string, css?: string}) => (
    <p className={`text-5xl text-center text-[#FFAE00] py-10 ${css}`}>{title}</p>
)