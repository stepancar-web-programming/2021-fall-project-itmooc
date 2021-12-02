import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import MuiAppBar from '@mui/material/AppBar';
import {
    styled,
    Box,
    Drawer,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    List,
    ListItem,
    ListSubheader,
    Tooltip,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    CircularProgress
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ListIcon from '@mui/icons-material/List';
import Filter1Icon from '@mui/icons-material/Filter1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import AccountMenu from './AccountMenu';
import { getMenuData, toggleMenu } from '../reducers/menuReducer';
import Logo from '../../core/components/Logo';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

const WebName = styled(Typography)(() => ({
    flex: 1,
    ml: 1,
    userSelect: 'none'
}));

export default function DrawerMenu({ Component, pageProps }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const mobileMode = useMediaQuery(theme.breakpoints.down('sm'));

    const { open = false } = useSelector((state) => getMenuData(state));
    // const { user, userError, token } = useSelector((state) => getAuthData(state));

    // useEffect(() => {
    //     if (!user) dispatch(fetchMe());
    // }, [user]);
    //
    // if (userError) {
    //     router.push('/login').then();
    //     localStorage.setItem('token', '');
    //     dispatch(logout());
    // } else if (token) localStorage.setItem('token', token);

    const handleDrawerOpen = () => {
        dispatch(toggleMenu());
    };

    const handleDrawerClose = () => {
        dispatch(toggleMenu());
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Logo />
                        <WebName variant="h6" noWrap component="div" ml={2}>
                            ITMOOC
                        </WebName>
                        {/* <Tooltip title={`Chuyển sang ${darkModeActive ? 'light' : 'dark'} mode`}> */}
                        {/*    <IconButton */}
                        {/*        color="inherit" */}
                        {/*        aria-label="switch dark mode" */}
                        {/*        onClick={darkModeActive ? switchToLightMode : switchToDarkMode} */}
                        {/*    > */}
                        {/*        {darkModeActive ? <Brightness4Icon /> : <Brightness7Icon />} */}
                        {/*    </IconButton> */}
                        {/* </Tooltip> */}
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box'
                        }
                    }}
                    variant={mobileMode && open ? 'temporary' : 'persistent'}
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <Logo />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List
                        subheader={
                            <ListSubheader component="div" id="fa-tools">
                                Financial Analysis
                            </ListSubheader>
                        }
                    >
                        <ListItem button key="fa-query-by-rows" selected>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Query theo dòng" />
                        </ListItem>
                        <ListItem button key="fa-query-by-files" selected>
                            <ListItemIcon>
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Query theo file" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        subheader={
                            <ListSubheader component="div" id="mr-tools">
                                Market Research
                            </ListSubheader>
                        }
                    >
                        <ListItem button key="MR tool 1" selected>
                            <ListItemIcon>
                                <Filter1Icon />
                            </ListItemIcon>
                            <ListItemText primary="MR tool 1" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        subheader={
                            <ListSubheader component="div" id="mr-tools">
                                Account
                            </ListSubheader>
                        }
                    >
                        <ListItem button key="Manage account">
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quản lý tài khoản" />
                        </ListItem>
                        <ListItem button key="Logout" onClick={() => {}}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đăng xuất" />
                        </ListItem>
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Component {...pageProps} />
                </Main>
            </Box>
        </>
    );
}

DrawerMenu.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
