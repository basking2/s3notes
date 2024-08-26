import { Dialog } from "@mui/material"
import { useEffect, useRef, useState } from "react"

// The name of the need password event type.
export const errorEventType = "errorEventType"

// A function to dispatch the need password event.
export function dispatchErrorEvent(elem, message) {
    return elem.dispatchEvent(new CustomEvent(errorEventType, { bubbles: true, detail: {message}}))
}

export default function NoticeComponent(props={}) {

    const [event, setEvent] = useState({})

    function handelEvent(event) {
        console.info("Got event", event)
        setEvent(event)
    }

    const ref = useRef()

    // Manage event handling.
    useEffect(() => {
        const elem = ref.current
        elem.addEventListener(errorEventType, handelEvent)
        return () => elem.removeEventListener(errorEventType, handelEvent)
    })

    try {
        return (<div ref={ref}>
            <Dialog open={!!event && !!event.message}>
                {event.message}
            </Dialog>

            {props.children}
        </div>)
    } catch (e) {
        return (<div ref={ref}>
            <Dialog open={true}>
                Error: {e}
            </Dialog>
        </div>)
    }

}