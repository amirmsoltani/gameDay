import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

type DataType = {
    overlayPosition?: {
        left: number;
        width: number;
    };
};

const Tabs = ({
    navbarTab = false,
    smallTab = false,
    tabs,
    activeTab,
    activeTabParent=null,
    onTabChange,
    rows = undefined,
    style = {},
    overlay = false,
    fullOverlay = false
}) => {
    const [data, setData] = useState<DataType>({});
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const ref = useRef<any>();

    useEffect(() => handleOverlayPosition(ref, setData), [activeTab,activeTabParent]);

    useEffect(() => {
        function handleOverlayWidth() {
            handleOverlayPosition(ref, setData);
        }

        window.addEventListener('resize', handleOverlayWidth);

        return () => window.removeEventListener('resize', handleOverlayWidth);
    }, []);


    return (
            <div
                ref={ref}
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:isSmall?'20px':0,
                    justifyContent: navbarTab ? 'space-between' : undefined,
                    ...style
                }}>
                {tabs.map(({ id, label }, index) => (
                    <Typography
                        // fontWeight="bold"
                        data-id={id}
                        key={index}
                        style={{
                            cursor: 'pointer',
                            fontSize: isMedium ? '18px' : navbarTab ? '17px' : '28px',
                            color: '#213950',
                            marginRight: isMedium ? '20px' : navbarTab ? 0 : '40px',
                            marginBottom: 0,
                        }}
                        data-active={String(id == activeTab?.id)}
                        onClick={() => onTabChange?.({ id, label })}>
                        {label}
                    </Typography>
                ))}
                <div
                    style={{
                        borderBottom: tabs.length ? '4px solid #A587C2' : null,
                        position: 'absolute',
                        left: data?.overlayPosition?.left + 'px',
                        width: data?.overlayPosition?.width + 'px',
                        bottom: overlay ? 3 : 0,
                        transition: '0.4s',
                        zIndex: 1,
                        borderRadius: '25px',
                    }}
                />
            </div>
    );
};

export default Tabs;

function handleOverlayPosition(ref, setData) {
    let tab = ref.current.querySelector("[data-active='true']");

    if (!tab) return;

    const { width, left } = tab?.getBoundingClientRect();
    const { left: parentLeft } = tab?.parentNode.getBoundingClientRect();
    const overlayPosition = { left: left - parentLeft, width };

    setData((data) => ({ ...data, overlayPosition }));
}
