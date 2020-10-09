import React, { useState, FC, MouseEvent } from 'react'
import Burger from '../../images/burger.svg'

interface Props {
    handleMouseDown: (e: MouseEvent) => void
}

const Button: FC<Props> = (props) => {
    return (
        <div className="button-container" >
            <span className='pulse-button' onClick={props.handleMouseDown}>

            </span>
        </div >
    )
}
export default Button
