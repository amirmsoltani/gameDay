import { Box, Button, styled, Typography } from '@mui/material';
import { Form } from 'formik';
import { MuiButton } from '../base/Button';

export const WrapperProductItem = styled(Box)(({ theme }) => ({
    backgroundColor: '#FFFFFFa3',
    boxShadow: '1px 2px 8px #4D6F761e',
    width: '190px',
    borderRadius: '38px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s',

    ':hover': {
        transform: 'scale(1.01,1.01)'
    },
    ':active': {
        transform: 'scale(0.98,0.98)'
    }
}));

export const TopWrapperItemProduct = styled(Box)(({theme}) => ({
    backgroundColor:"#F0FAFC",
    padding: "15px"

}))

export const ImageWrapperItemExercise = styled(Box)({
    position: 'relative',
    backgroundColor: '#F0FAFC',
    height: '175px',
    width:"165px",
    // margin: '15px auto',
    borderRadius:21,
    overflow:"hidden"
});

export const ImgProductItem = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
});
export const VideoProductItem = styled('video')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
});

export const IconShow = styled(Button)<{
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
}>(({ theme, left, right, top, bottom }) => ({
    minWidth: '35px',
    minHeight: '35px',
    left: left ? left + 'px' : 'unset',
    right: right ? right + 'px' : 'unset',
    top: top ? top + 'px' : 'unset',
    bottom: bottom ? bottom + 'px' : 'unset',
    backgroundColor: '#C6E2E8e3',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
}));

export const TitleItemExercise = styled(Typography)({
    textAlign: 'center',
    padding: '4px',
    color: '#01161F',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none'
});

export const WrapperActionTopExercise = styled(Form)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '30px'
});

export const SearchButton = styled(MuiButton)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    ':hover': {
        backgroundColor: theme.palette.secondary.main
    },
    color: theme.palette.common.white,
    height: '50px'
}));

export const AddButtonBoard = styled(SearchButton)({
    width: 300,
    padding: '5px 10px',
    borderRadius: 13,
    height: 'unset'
});


export const DescriptionImage  = styled(Box)({
    display: "flex",
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop:15
})