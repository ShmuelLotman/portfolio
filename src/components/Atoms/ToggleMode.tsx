import React, { FC, useState, useEffect } from 'react'
import Moon from '../../images/moon.svg';
import Sun from '../../images/sun.svg';

type Props = any;

const ToggleMode: FC<Props> = props => {
    const html = document.getElementsByTagName('html')[0];
    const toggleTheme = (theme: string): void => {
        html.setAttribute('theme', theme)
        setTheme(theme)
    }
    const [theme, setTheme] = useState('light');
    return (
        theme === 'dark' ? (
            <Sun
                onClick={() => toggleTheme('light')}
                role="button"
                label="light"
                data-testid="light"
                style={{ color: 'white' }}
            />
        ) : (
                <Moon
                    onClick={() => toggleTheme('dark')}
                    role="button"
                    label="dark"
                    data-testid="dark"
                />
            )
    )
}

export default ToggleMode
