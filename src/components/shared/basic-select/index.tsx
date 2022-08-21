import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/system';
import { MuiSelect } from '@/components/base/input/MuiSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import Down from 'src/assets/icons/Down';
import { Select } from '@mui/material';

const CustomFormControl = styled(FormControl)({
    height: 50,
    justifyContent: 'center',
    width: 210,
    '&.MuiFormControl-root': {
        borderColor: '#585858',
        "& .MuiOutlinedInput-root":{
            "svg":{
                position:'absolute',
                right:10
            }
        },
        ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(165, 135, 194)"
        },
        '&.Mui-selected': {
            backgroundColor: "turquoise",
            color: "white",
            fontWeight: 600
        }
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#585858',
    }
});

export default function BasicSelect() {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const handleChange = (event) => {
        dispatch(
            setPageData({ ...pageData, activePage: 1, sortData: { Sort: event.target.value } })
        );
    };

    return (
        <CustomFormControl>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageData.sortData.Sort}
                style={{ borderRadius: 15, width: 200 }}
                IconComponent={() => <Down />}
                size="small"
                onChange={handleChange}
                MenuProps={{
                    sx: {
                        "&& .Mui-selected": {
                            backgroundColor: "rgb(165, 135, 194) !important",
                        }
                        
                    }
                }}
            >
                <MenuItem value="Sort" sx={{ display: 'none' }}>Sort</MenuItem>
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="ld">Less duration</MenuItem>
                <MenuItem value="md">More duration</MenuItem>
                <MenuItem value="lb">Less price</MenuItem>
                <MenuItem value="mb">More price</MenuItem>
            </Select>
        </CustomFormControl>
    );
}
