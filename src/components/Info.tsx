import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import { texts } from "../texts";


export default function Info({textId}: {textId: string}) {
    const [text, setText] = useState("");
    useEffect(() => {
        let existingText = texts["default"];
        const textIdLower = textId.toLowerCase()
        if (textIdLower in texts)
            existingText = texts[textIdLower];
        fetch(existingText).then((response) => response.text()).then((textData) => {
            setText(textData)
          })

    }, [textId])
    return <ReactMarkdown children={text} />
}
