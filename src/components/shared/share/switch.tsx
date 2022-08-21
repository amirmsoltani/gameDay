import React,{useState} from 'react'
import { styled } from '@mui/system';
import { FormControlLabel, Switch } from '@mui/material';

const Switcher = ({swithcer,setSwitcher})=>{


    const handleChange = ()=>{
        setSwitcher(!swithcer);
    }


    const SwitchCase = styled(Switch)({
        padding: 2,
        width: '70px',
        height: '33px',
        '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
                "& .MuiSwitch-thumb": {
                    position: 'absolute',
                    left: "21px",
                    width: "25px",
                    backgroundColor: '#fff',
                    top: '4px'
                },
                '& + .MuiSwitch-track': {
                    backgroundColor: '#E2E2E2',
                    opacity: '1'
                },
            },
        },
        '& .MuiSwitch-track': {
            backgroundColor: '#E2E2E2',
            borderRadius: '18px',
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 25,
            height: 25,
            left: '6px',
            position: 'absolute',
            borderRadius: '50%',
            top: '4px',
            backgroundColor:'#349B48'
        },
    })


    return (
        <FormControlLabel
            sx={{
                position: 'relative',
                margin: 0
            }}
            control={<SwitchCase checked={swithcer === true ? true : false} onChange={handleChange} name="checked" />}
            label=""
        />
    )
}

export default Switcher;
