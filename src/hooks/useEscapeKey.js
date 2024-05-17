import React from 'react';

export function useEscapeKey(onEscape) {
    React.useEffect(() => {
        const listener = (e) => {
            if (e.code === 'Escape') {
                onEscape()
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [onEscape])
};