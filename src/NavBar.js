import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
            <nav className={isOpen ? 'NavBar isOpen' : 'NavBar'}>
                <img src="logo.png" alt="Logo" />
                <button onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon />
                </button>

                {<>
                    <a href={process.env.PUBLIC_URL + "/index.html#/"}>Home</a>
                    <a href="#/settings">Settings</a>
                    <a href="#/about">About</a>
                </>}
            </nav>
    )
}

export default NavBar