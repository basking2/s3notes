import React, { useContext, useEffect, useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import SettingsContext from "./settings/SettingsContext";
import StorageFactory from "./storage/StorageFactory"
import { Input, Link } from "@mui/material";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line
    const [ settings, setSettings ] = useContext(SettingsContext)

    const [ links, setLinks ] = useState([])
    const [ links2, setLinks2 ] = useState([])

    const storage = StorageFactory.fromSettings(settings)

    const sidebarjson = "_sidebar.json"
    const sidebarjson2 = "_sidebar2.json"

    const fileRef = useRef()

    const buildLinks = (keybase, obj) => {
        let lst = []

        let key = 0
        for (const l of obj['links']) {
            if ('href' in l) {
                lst.push(<a key={`${keybase}-${key}`} href={`${l.href}`}>{l.name}</a>)
            } else {
                lst.push(<a key={`${keybase}-${key}`} href={`${process.env.PUBLIC_URL}/index.html#/view?file=${l.filename}`}>{l.name}</a>)
            }
            key++
        }

        return lst
    }

    useEffect(() => {

        // Load links from sidebar 1.
        storage.load(sidebarjson, true, (err, txt, meta) => {

            try {
                let obj = JSON.parse(txt) || {
                    links: [
                        {
                            name: "Edit Sidebar",
                            filename: sidebarjson,
                            href: `${process.env.PUBLIC_URL}/index.html#/edit?file=${sidebarjson}`,
                        }
                    ]
                }

                if ('links' in obj) {
                    setLinks(buildLinks("sidebar1", obj))
                }

            } catch (e) {
                console.info("no obj", e)
            }
        })

        // Load links from sidebar 2.
        storage.load(sidebarjson2, true, (err, txt, meta) => {

            try {
                let obj = JSON.parse(txt) || {
                    links: [ ]
                }

                if ('links' in obj) {
                    setLinks2(buildLinks("sidebar2", obj))
                }

            } catch (e) {
                console.info("no obj", e)
            }
        })

    // eslint-disable-next-line
    }, [ /* Intentionally no dependencies. */ ])

    const handleEditViewClick = (action) => {
        return (event) => {
            event.preventDefault()
            window.location = `${process.env.PUBLIC_URL}/index.html#/${action}?file=${fileRef.current.value}`
        }
    }

    return (
            <nav className={isOpen ? 'NavBar isOpen' : 'NavBar'}>
                <img src="logo.png" alt="Logo" />
                <button onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon />
                </button>

                {<>
                    <a href={process.env.PUBLIC_URL + "/index.html#/"}>Home</a>
	    	        {links}
	    	        {links2}
                    <a href="#/settings">Settings</a>
                    <a href="#/about">About</a>
                </>}

                <>
                    {/*Don't let key strokes escape this.  */}
                    <Input id="quickFileOpen" defaultValue="file.txt" inputRef={fileRef} type="text" style={{background: "white"}} label="File" aria-label="File name."
                        onKeyDown={e => e.stopPropagation()}
                    ></Input>
                    <Link className="NavBar isOpen inline" variant="contained" href="#" onClick={handleEditViewClick("view")}>View</Link>
                    <Link className="NavBar isOpen inline" variant="contained" href="#" onClick={handleEditViewClick("edit")}>Edit</Link>
                </>

            </nav>
    )
}

export default NavBar
