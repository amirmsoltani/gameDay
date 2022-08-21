import { Box, Container, Grid, styled, Typography, useTheme } from '@mui/material';
import { Spacer } from '@/components/base/spacer';
import { useEffect, useState } from 'react';
import CalendarSort from './components/calendar-sort';
import SessionSort from './components/session-sort';
import CalendarIcon from 'src/assets/icons/client/calendar';
import ListIcon from 'src/assets/icons/client/list';
import { useDispatch } from 'react-redux';
import { activeTab } from 'src/redux/actions/actions';

const Sessions = () => {
    const theme = useTheme();
    const [view, setView] = useState('calendar');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeTab('sessions'));
    }, []);

    return (
        <Box paddingX="10px">
            <Box display="flex" justifyContent="space-between">
                <Typography
                    style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: theme.palette.secondary.darker
                    }}>
                    Your Sessions
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box style={{ cursor: 'pointer' }} onClick={() => setView('list')}>
                        <ListIcon view={view} />
                    </Box>
                    <Spacer space={20} />
                    <Box style={{ cursor: 'pointer' }} onClick={() => setView('calendar')}>
                        <CalendarIcon view={view} />
                    </Box>
                </Box>
            </Box>
            <Spacer space={40} />
            {view === 'calendar' ? <CalendarSort /> : <SessionSort />}
        </Box>
    );
};

export default Sessions;
