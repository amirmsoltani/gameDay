import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { JobStatus, UpdateJobStatusDocument } from 'src/graphql/generated';

enum StatusToInt {
    ACCEPTED = 1,
    INTERVIEW = 3,
    NOT_QUALIFIED = 2,
    PENDING = 0
}

enum StatusToColor {
    ACCEPTED = '#02C954',
    INTERVIEW = '#8CE2EE',
    NOT_QUALIFIED = '#FE3B59',
    PENDING = '#DCD0F3'
}

type PropsType = { value: JobStatus; onChange: (status: number) => void };
const Situation: React.FC<PropsType> = ({ value, onChange }) => {
    const [situation, setSituation] = React.useState(value);

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as JobStatus;
        setSituation(status);
        onChange(StatusToInt[status]);
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }} size="small">
            <Select
                value={situation}
                onChange={handleChange}
                fullWidth
                sx={{ height: 50, backgroundColor: StatusToColor[situation], border: 'none' }}>
                <MenuItem value={JobStatus.Accepted}>accepted</MenuItem>
                <MenuItem value={JobStatus.Interview}>Interview</MenuItem>
                <MenuItem value={JobStatus.Pending}>pending</MenuItem>
                <MenuItem value={JobStatus.NotQualified}>not qualified</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Situation;
