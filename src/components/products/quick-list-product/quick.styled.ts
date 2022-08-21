import { MInputFormik } from '@/components/base/input/MInput';
import { SearchButton } from '@/components/exercises/exercise.styled';
import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
    TextareaAutosize,
    TextField,
    Typography
} from '@mui/material';

export const ButtonActionTop = styled(Button)(({ theme }) => ({
    border: `${theme.palette.common.black} solid 1px`,
    color: theme.palette.common.black,
    width: '100%',
    flex: 1,
    borderRadius: 12,
    padding: 7
}));

export const ListWrapper = styled(Box)(({ theme }) => ({
    border: `${theme.palette.common.black} solid 1px`,
    borderRadius: 35,
    maxHeight: '730px',
    minHeight:"60vh", 
    padding: 10,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
}));

export const ExerciseItemWrapper = styled(Box)(({ theme }) => ({
    border: `#06677C4e solid 0.2px`,
    backgroundColor:'#fff',
    borderRadius: 22,
    position: 'relative',
    padding: '10px 13px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '1px 2px 8px #4D6F762e'
}));

export const WrapperExercise = styled(Box)({
    display: 'flex',
    gap: 10,
    justifyContent: 'space-between'
});

export const ImageWrapper = styled('div')(({ theme }) => ({
    border: `#06677C4e solid 0.2px`,
    boxShadow: '1px 2px 8px #4D6F762e',
    borderRadius: 17,
    minWidth: '65px',
    height: '70px',
    overflow: 'hidden'
}));

export const ImageExercise = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
});

export const TitleExercise = styled(Typography)({
    margin: 0,
    padding: '0',
    paddingRight: 10,
    fontSize: 14
});

export const ButtonEquipment = styled(Button)({
    textDecoration: 'underline',
    padding: '0 5px',
    fontSize: 12
});

export const RemoveButton = styled(Button)({
    padding: 5,
    minWidth: 'unset'
});

export const LabelOption = styled(Typography)({
    fontSize: '13px',
    fontWeight: 300
});

export const RadioWrapperExercise = styled(RadioGroup)(({ theme }) => ({
    width: 50
}));

export const InputExercise = styled(TextField)(({ theme }) => ({
    width: '50px'
}));
export const InputWrapperExercise = styled(Box)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 11,
        borderColor: '#9F9E9E',
        '& fieldset': {
            borderColor: '#9F9E9E'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9F9E9E'
        }
    },
    minWidth: '50px'
}));
export const TextAreaWrapperExercise = styled(Box)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 11,
        borderColor: 'transparent',
        backgroundColor: '#EDF0F2',
        '& fieldset': {
            borderColor: 'transparent !important'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent'
        }
    },
    minWidth: '50px'
}));
export const InputRadioOptionFormControl = styled(FormControlLabel)({
    width: '50px',
    margin: 0,
    marginRight: '10px !important'
});

export const CustomExerciseOption = styled(Radio)({
    padding: '3px 7px'
});

export const NoteInputExercise = styled(TextareaAutosize)({});

export const InputTextAreaExerciseNote = styled(MInputFormik)(({ theme }) => ({
    width: '100%',

    '::placeholder': {
        color: '#575757'
    }
}));

export const ButtonShareWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: '#F0FAFC',
    border: '#0C52712e 1px solid',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 25px',
    width: '100%',
    marginTop: 20
}));

export const ButtonShare = styled(Button)(({ theme }) => ({
    backgroundColor: '#C6E2E83e',
    border: `#0024345f solid 1px`,
    borderRadius: 10,
    padding: '8px 4px',
    minWidth: 45,
    minHeight: 45
}));

export const ProductWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '1px 2px 8px #4D6F762e',
    padding: '10px 13px',
    width: '400px',
    margin: '10px 0'
});

export const ButtonSubmitEquipment = styled(SearchButton)(({ theme }) => ({
    borderRadius: 14,
    margin: '0 auto',
    width: 250
}));

export const ButtonSubmitModalBoard = styled(SearchButton)(({ theme }) => ({
    borderRadius: 12,
    margin: 0,
    width: '100%',
    height: '40px'
}));
