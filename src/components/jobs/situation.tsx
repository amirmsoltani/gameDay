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

type PropsType = { value: JobStatus; onChange: (status: number) => void };
const Situation: React.FC<PropsType> = ({ value, onChange }) => {
    const [situation, setSituation] = React.useState(value);

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as JobStatus;
        setSituation(status);
        onChange(StatusToInt[status]);
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
                <MenuItem value={JobStatus.Accepted}>accepted</MenuItem>
                <MenuItem value={JobStatus.Interview}>Interview</MenuItem>
                <MenuItem value={JobStatus.Pending}>pending</MenuItem>
                <MenuItem value={JobStatus.NotQualified}>not qualified</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Situation;
