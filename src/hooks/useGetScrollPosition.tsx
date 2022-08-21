import { useCallback, useEffect, useState } from 'react';

export function useGetScrollPosition(element: HTMLElement | HTMLDivElement) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = useCallback(() => {
        setScrollPosition(element.scrollTop);
    }, [element]);

    useEffect(() => {
        //only to cause rerender, to get and get the ref with the element insidei t
        if (!element) return setScrollPosition((prev) => -prev);

        element.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [element]);

    return {
        y: scrollPosition,
        clientHeight: element?.clientHeight || 0,
        maxScrollHeight: element?.scrollHeight || 0 - element?.clientHeight || 0,
        top: element?.getBoundingClientRect?.()?.top || 0
    };
}
