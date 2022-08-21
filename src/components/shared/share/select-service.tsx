import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Down from 'src/assets/icons/Down';
import { InputLabel, Select, Typography } from '@mui/material';
import { useInfiniteHealingType_GetAllHealingTypesQuery } from 'src/graphql/generated';
import { useField } from 'formik';

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    height: 50,
    justifyContent: 'center',
    width: '100%',
    "& .MuiFormControl-root": {
        "& label": {
            top: '-5px !important',
        },
        ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#77777"
        },
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '30px',
        height: '2.6em',
        width: '100%',
        "svg": {
            position: 'absolute',
            right: 15
        },
        '& fieldset': {
            borderColor: theme.palette.secondary.darker
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.darker
        }
    }
}));

export default function SelectService() {
    const [{ value }, meta, { setValue }] = useField('type');
    const dispatch = useDispatch();
    const InnerRef = React.useRef();
    const [holder, setHolder] = useState(false)
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { data: dataHelingTypes, fetchNextPage } = useInfiniteHealingType_GetAllHealingTypesQuery({ take: 50, skip: 0 }, {
        keepPreviousData: true,
        getNextPageParam: (lastPage, pages) => ({ skip: pages.length * 50 })
    });
    const itemsHealingType = dataHelingTypes?.pages?.map((item) => item?.healingType_getAllHealingTypes?.result?.items)?.flat();

    const handleScroll = () => {
        if (InnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = InnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                fetchNextPage && fetchNextPage();
            }
        }
    }

    return (
        <>
            <CustomFormControl ref={InnerRef}>
                <InputLabel id="demo-simple-select-label">Service Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Service Type"
                    value={value}
                    style={{ borderRadius: 30, width: '100%' }}
                    IconComponent={() => <Down />}
                    size="small"
                    onChange={(e) => setValue(e?.target?.value)}
                    MenuProps={{
                        sx: {
                            "&& .Mui-selected": {
                                backgroundColor: "rgb(165, 135, 194) !important",
                            }

                        },
                        onScroll: handleScroll
                    }}
                >
                    {
                        itemsHealingType?.map((item, index) => {
                            return (<MenuItem key={index} value={item?.id}>{item?.title}</MenuItem>)
                        })
                    }

                </Select>
            </CustomFormControl>
            {
                Boolean(meta.touched && meta.error) && <Typography sx={{ marginBottom: 0,position:'absolute',left:0,top:'47px' }} variant="caption" color="error">{meta.error}</Typography>
            }
        </>
    );
}


