import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import "../styles/info.css";
import CostMedium from "../assets/costmedium.png";
import EU from "../assets/eu.png"
import { Texts } from "../texts";

const Image = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >
) => <img alt="" style={{ maxWidth: '50%' }}{...props} />


export default function Info({ texts, textId }: { texts: Texts, textId: string }) {
    const [text, setText] = useState("");
    const footer = `![COST](${CostMedium})![Funded by the European Union](${EU})`;

    useEffect(() => {
        let existingText = texts["default"];
        const textIdLower = textId.toLowerCase()
        if (textIdLower in texts)
            existingText = texts[textIdLower];
        fetch(existingText).then((response) => response.text()).then((textData) => {
            setText(textData)
        })

    }, [texts, textId])
    return (
        <div className="infoBox">
            <ReactMarkdown children={text} />
            <ReactMarkdown children={footer} components={{ img: Image }} />
        </div>
    )
}
