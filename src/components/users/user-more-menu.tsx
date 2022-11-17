import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material';
import { ActiveStatus } from 'src/graphql/generated';

const options = ['suspended'];

const ITEM_HEIGHT = 20;
type PropsType = { OnClick: () => void ,status:ActiveStatus};
const MoreMenu: React.FC<PropsType> = ({ OnClick,status }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 3px 6px #2C28281C',
                    color: theme.palette.primary.main
                }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '15ch'
                    }
                }}>
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => {
                            handleClose();
                            OnClick();
                        }}
                        sx={{ display: 'flex', justifyContent: 'center' }}>
                        {status === ActiveStatus.Accepted?"suspended":"unSuspend"}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MoreMenu;
