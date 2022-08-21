import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';

export const useObserver = ({
    callback,
    element
}: {
    element: MutableRefObject<HTMLElement>;
    callback: () => void;
}) => {
    const observer = useRef(null);
    const bothExist = observer && observer.current && element && element.current;

    const observe = () => {
        if (bothExist) {
            observer.current.observe(element.current);
        }
    };

    useEffect(() => {
        if (bothExist) {
            observer.current.unobserve(element.current);
        }
        observer.current = new ResizeObserver(callback);
        observe();

        return () => {
            if (bothExist) {
                observer.current.unobserve(element.current);
            }
        };
    }, [element]);
};

export const useWindowResizeObserver = () => {
    const [state, setState] = useState(1);

    useEffect(() => {
        const handleResize = () =>
            setState(
                typeof window === 'undefined' ? 1 : window.innerWidth / (window.innerHeight * 2.2)
            );
        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return state;
};
