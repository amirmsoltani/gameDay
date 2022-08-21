import React from 'react';
import { EmailSvgIcon, PrintSvgIcon, QRCodeSvgIcon, SMSSvgIcon } from 'src/assets/exercise/share';
import * as S from './quick.styled';

const ShareButtonExercise = () => {
    return (
        <S.ButtonShareWrapper>
            <S.ButtonShare>
                <EmailSvgIcon />
            </S.ButtonShare>
            <S.ButtonShare>
                <PrintSvgIcon />
            </S.ButtonShare>
            <S.ButtonShare>
                <SMSSvgIcon />
            </S.ButtonShare>
            <S.ButtonShare>
                <QRCodeSvgIcon />
            </S.ButtonShare>
        </S.ButtonShareWrapper>
    );
};

export default ShareButtonExercise;
