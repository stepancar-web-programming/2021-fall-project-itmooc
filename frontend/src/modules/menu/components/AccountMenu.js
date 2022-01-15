import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Badge, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import UserSetting from '../../auth/components/UserSetting';
import { resetState } from '../../auth/reducers/authReducer';

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""'
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0
        }
    }
}));

export default function AccountMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <UserSetting handleClose={() => setOpenDialog(false)} isOpen={openDialog} />
            <Tooltip title="Пользовательские настройки">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ width: 32, height: 32 }} color="white">
                            <PersonOutlineIcon />
                        </Avatar>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setOpenDialog(true)}>
                    <ManageAccountsIcon sx={{ mr: 1 }} /> Управление пользователем
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        dispatch(resetState());
                        localStorage.setItem('token', '');
                        navigate('/');
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
}
