import { useEffect, useState } from 'react';

export function useTransition(
    isMounted: boolean,
    delayTime: number,
    styles?: { from: Record<string, any>; to: Record<string, any> }
) {
    const [shouldRender, setShouldRender] = useState(false);

    const stylesTransition = {
        ...(isMounted && shouldRender ? styles.to : styles.from),
        transition: `${delayTime}ms`
    };

    useEffect(() => {
        let timeoutId: any;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        } else if (!isMounted && shouldRender) {
            timeoutId = setTimeout(() => setShouldRender(false), delayTime);
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);
    return { styles: stylesTransition, item: shouldRender || isMounted };
}
