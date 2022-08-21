import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';

type DataType = {
    overlayPosition?: {
        left: number;
        width: number;
    };
};

const TabParent = ({
    navbarTab = false,
    smallTab = false,
    tabs,
    activeTab,
    onTabChange,
    rows = undefined,
    style = {},
    overlay = false,
    fullOverlay = false
}) => {
    const router = useRouter();
    const adminPanel = router.asPath.includes("/admin");
    const [data, setData] = useState<DataType>({});
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const ref = useRef<any>();

    useEffect(() => handleOverlayPosition(ref, setData), [activeTab]);

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
                justifyContent: navbarTab ? 'space-between' : undefined,
                marginLeft:isSmall ? 0:'25px',
                ...style
            }}>
            {tabs.map(({ id, label, Icon }, index) => (
                <div
                    data-id={id}
                    key={index}
                    style={{
                        cursor: 'pointer',
                        fontSize: isSmall ? '18px' : '20px',
                        color: id == activeTab?.id ? '#3E205A' : '#213950',
                        fontWeight: id == activeTab?.id ? 'bold' : 'normal',
                        marginRight: isSmall ? '20px' : '40px',
                        marginLeft: overlay ? 0 : '16px',
                        marginBottom: 0,
                        display: (!adminPanel && isSmall) ? 'none':'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '15px'
                    }}
                    data-active={String(id == activeTab?.id)}
                    onClick={() => onTabChange?.({ id, label })}>
                    <div style={{ backgroundColor: '#EDF6FF', border: `${id == activeTab?.id ? '3px':'2px'} solid ${id == activeTab?.id ? '#3E205A' : '#213950'}`, padding: '10px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{(id==="setting" || id==="chat") ? <Icon fill={id == activeTab?.id ? '#3E205A' : '#213950'} />:<Icon stroke={id == activeTab?.id ? '#3E205A' : '#213950'} />}</div>
                    <p style={{ marginTop: '16px', fontSize: '20px' }}>{label}</p>
                </div>
            ))}
        </div>
    );
};

export default TabParent;

function handleOverlayPosition(ref, setData) {
    let tab = ref.current.querySelector("[data-active='true']");

    if (!tab) return;

    const { width, left } = tab?.getBoundingClientRect();
    const { left: parentLeft } = tab?.parentNode.getBoundingClientRect();
    const overlayPosition = { left: left - parentLeft, width };

    setData((data) => ({ ...data, overlayPosition }));
}
