import React, { FC, useState, useEffect } from "react";

type Props = {
    listArr: Array<string>
}

interface TypewriterState {
    content: string;
    carriage: number;
    isDeleting: boolean;
    hasLooped: boolean;
    curString: string;
    idx: number
}

const Typewriter: FC<Props> = ({ listArr }) => {
    const blinkSpeed: number = 130;
    const [
        { content, carriage, isDeleting, hasLooped, curString, idx },
        setContent
    ] = useState<TypewriterState>({
        content: "",
        carriage: 0,
        isDeleting: false,
        hasLooped: false,
        idx: 0,
        curString: listArr[0]
    });

    const pauseThenRun = (time: number, func: () => void): void => {
        setTimeout(() => {
            func();
            clearTimeout(pauseThenRun);
        }, time);
    };

    const delay = (toRemove: boolean = false): void => {
        setTimeout(() => {
            setContent((prev) => ({
                ...prev,
                content: toRemove
                    ? content.slice(0, -1)
                    : content + curString[carriage],
                carriage: toRemove ? carriage - 1 : carriage + 1,
                isDeleting: toRemove && carriage > 0 ? true : false,
                hasLooped: true
            }));
            clearTimeout(delay);
        }, 0 | 100);
    };

    useEffect(() => {
        while (idx < listArr.length) {
            if (isDeleting && carriage > 0) {
                if (carriage === 1) {
                    setContent((prev) => ({
                        ...prev,
                        content: "",
                        carriage: 0,
                        isDeleting: false,
                        hasLooped: true,
                        curString: listArr[idx + 1],
                        idx: idx + 1
                    }));
                } else {
                    delay(true);
                }
                return;
            } else if (carriage === curString.length) {
                if (idx < listArr.length - 1) {
                    pauseThenRun(2000, () =>
                        setContent((prev) => ({ ...prev, isDeleting: true }))
                    );
                } else {
                    setContent((prev) => ({ ...prev, idx: idx + 1 }));
                }
                return;
            } else {
                if (carriage === 0 && hasLooped) {
                    pauseThenRun(2000, () => delay());
                } else {
                    delay();
                }
                return;
            }
        }
    }, [content, isDeleting]);

    return (
        <>
            <span> I Am: </span>
            <span className="typewriter-text">
                {content}
                <span className="blinking-cursor">|</span>
            </span>
        </>
    );
};

Typewriter.defaultProps = {
    listArr: ['Hello', 'Im Shmuel Lotman, software developer, husband and father.']
}

export default Typewriter;
