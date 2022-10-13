import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Situation() {
    const [situation, setSituation] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSituation(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
            <InputLabel id="demo-select-small">Situation</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={situation}
                label="Situation"
                onChange={handleChange}>
                <MenuItem sx={{ backgroundColor: '#02C954' }} value={10}>
                    accepted
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#8CE2EE' }} value={20}>
                    Interview
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#DCD0F3' }} value={30}>
                    pending
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#FE3B59' }} value={30}>
                    not qualified
                </MenuItem>
            </Select>
        </FormControl>
    );
}
