import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
            <nav className={isOpen ? 'NavBar isOpen' : 'NavBar'}>
                <img src="logo.png"/>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon />
                </button>

                {<>
                    <a href={process.env.PUBLIC_URL + "/index.html#/"}>Home</a>
                    <a href="#/about">About</a>
                    <a href="#/contact">Contact</a>
                </>}
            </nav>
    )
}

export default NavBar