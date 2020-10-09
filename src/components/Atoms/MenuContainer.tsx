import React, { FC, useState, MouseEvent } from 'react'
import MenuButton from './MenuButton'
import Menu from './Menu'

const MenuContainer: FC = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const toggleMenu = (): void => {
        setVisible(!visible)
    }

    const handleMouseDown = (e: MouseEvent): void => {
        toggleMenu();

        e.stopPropagation()
    }
    return (
        <>
            <MenuButton handleMouseDown={handleMouseDown} />
            <Menu handleMouseDown={handleMouseDown}
                menuVisibility={visible} />
        </>
    )
}

export default MenuContainer
