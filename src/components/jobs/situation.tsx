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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Situation</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={situation}
                label="Situation"
                onChange={handleChange}>
                <MenuItem value={10}>accepted</MenuItem>
                <MenuItem value={20}>Interview</MenuItem>
                <MenuItem value={30}>pending</MenuItem>
                <MenuItem value={30}>not qualified</MenuItem>
            </Select>
        </FormControl>
    );
}
