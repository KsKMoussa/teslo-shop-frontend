import { Link } from "react-router";

interface Props {
    subtitles?: string
}

export const CustomLogo = ({ subtitles = "Shop" }: Props) => {
    return (
        <Link to='\' className="flex items-center whitespace-nowrap">
            <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">
                Teslo |
            </span>
            <p className="text-muted-forground m-0 px-2 whitespace-nowrap">
                {subtitles}
            </p>
        </Link>
    )
}
