import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={isOpen ? 'isOpen' : ''}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </button>

            {<>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </>}
        </nav>
    )
}

export default NavBar