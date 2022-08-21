import SessionIcon from 'src/assets/icons/client/session';
import SettingIcon from 'src/assets/icons/client/setting';
import ChatIcon from 'src/assets/icons/client/chat';
import { Box, Container, styled, Typography } from '@mui/material';
import { activeTab } from 'src/redux/actions/actions';
import { Spacer } from '../base/spacer';
import { useEffect, useState } from 'react';
import Sessions from './sessions';
import Setting from './setting';
import { connect } from 'react-redux';
import Messages from '../healers/profile/component/message';
import { useRouter } from 'next/router';

const TabContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    flexDirection: 'column',
    '@media(max-width: 900px)': {
        display: 'none'
    }
});

const IconContainer = styled('div')<{ activeTab: string; currentTab: string }>(
    ({ theme, activeTab, currentTab }) => ({
        background: theme.palette.secondary.light,
        borderRadius: '50%',
        border: `${activeTab === currentTab ? '3px' : '2px'} solid ${
            activeTab === currentTab ? theme.palette.primary.dark : theme.palette.secondary.darker
        }`,
        width: 58,
        height: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    })
);

const TabLable = styled(Typography)<{ activeTab: string; currentTab: string }>(
    ({ theme, activeTab, currentTab }) => ({
        color: ` ${
            activeTab === currentTab ? theme.palette.primary.dark : theme.palette.secondary.darker
        }`,
        fontWeight: ` ${activeTab === currentTab ? 'bold' : 'normal'}`,
        marginTop: 8,
    })
);

const tabs = [
    {
        name: 'sessions',
        lable: 'Sessions',
        icon: SessionIcon
    },
    {
        name: 'setting',
        lable: 'Setting',
        icon: SettingIcon
    },
    {
        name: 'chat',
        lable: 'Chat',
        icon: ChatIcon
    }
];

const ClientDashboard = ({ activeTab, activeTabName }) => {
    const router = useRouter();
    const {query:{uid}} = router;
    if (uid) activeTabName = 'chat';
    return (
        <Container style={{ padding: 0, paddingTop: 28,maxWidth:'1630px' }} >
            <Box
                display="flex"
                maxWidth="360px"
                justifyContent="space-between"
                paddingLeft="10px"
                marginX={{ xs: 'auto', md: 0 }}>
                {tabs.map((tab,index) => (
                    <TabContainer onClick={() => {(activeTab(tab.name),uid ? router.push('/client') :null)}} key={index}>
                        <IconContainer currentTab={tab.name} activeTab={activeTabName}>
                            <tab.icon activeTab={activeTabName} />
                        </IconContainer>
                        <TabLable currentTab={tab.name} activeTab={activeTabName}>
                            {tab.lable}
                        </TabLable>
                    </TabContainer>
                ))}
            </Box>
            <Spacer space={50} />
            {activeTabName === 'setting' ? (
                <Setting />
            ) : activeTabName === 'chat' ? (
                <Messages />
            ) : (
                <Sessions />
            )}
        </Container>
    );
};

const mapStateToProps = ({ isSideBarActive, activeTabName }) => ({
    isSideBarActive,
    activeTabName
});

const mapDispatchToProps = { activeTab };

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
