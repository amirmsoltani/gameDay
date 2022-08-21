import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import * as S from './../home.styled';

export const ModalFirstTime = () => {
    const dispatch = useDispatch();
    return (
        <Box width={300} paddingX={1}>
            <S.DescriptionText>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna invidunt ut labore
            </S.DescriptionText>
            <S.ButtonAccept
                onClick={() => {
                    sessionStorage.setItem('accepted-terms', 'true');
                    dispatch(closeModal('ModalLoadFirstTime'));
                }}>
                Accept
            </S.ButtonAccept>
        </Box>
    );
};
