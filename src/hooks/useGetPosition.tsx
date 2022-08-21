import { useCallback, useEffect, useState } from 'react';

export function useGetClickPosition(element: HTMLElement | HTMLDivElement) {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    const handleScroll = useCallback(
        (e: MouseEvent) => {
            setScrollPosition({
                x: Math.floor(e?.offsetX / 10) * 10,
                y: Math.floor(e?.offsetY / 10) * 10
            });
            // setScrollPosition({x:element?.getBoundingClientRect?.()?.x,,y: element?.getBoundingClientRect?.()?.y});
        },
        [element]
    );

    useEffect(() => {
        //only to cause rerender, to get and get the ref with the element insidei t
        if (!element) return setScrollPosition((prev) => ({ x: -prev.x, y: -prev.y }));

        element.addEventListener('click', handleScroll, { passive: true });

        return () => {
            element.removeEventListener('click', handleScroll);
        };
    }, [element]);

    return scrollPosition;
}
