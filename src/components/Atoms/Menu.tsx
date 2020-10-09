import React, { useState, FC, MouseEvent } from 'react'
import { Link } from 'gatsby';

interface Props {
    handleMouseDown: (e: MouseEvent) => void;
    menuVisibility: boolean;
}
const Menu: FC<Props> = props => {
    let visibility = "hide";

    if (props.menuVisibility) {
        visibility = "show";
    }
    return (
        <div id="flyoutMenu"
            onClick={props.handleMouseDown}
            className={visibility}>
            <h2><Link to='/' onClick={e => e.preventDefault()}>Home</Link></h2>
            <h2><Link to='/about'>About</Link></h2>
            <h2><Link to='/contact'>Contact</Link></h2>
            <h2><Link to='/blog'>Blog</Link></h2>
            <h2><Link to='/portfolio'>Portfolio</Link></h2>
            <h2><Link to='/interview'>Interview Booth</Link></h2>
        </div>
    )
}

export default Menu
