import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import { useCommonDispatch } from '../../hooks/useCommonDispatch';
import { setUser } from '../../features/userSlice';

const useStyles = makeStyles((theme) => ({
    root: { color: "inherit", paddingTop: '1.1rem' },
    // menu: { marginTop: '20px' }
}));
const StyledMenu = withStyles({
    paper: {
        marginTop: '20px',
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {

        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

interface IMenuUser {
    user: IUser
}

export const MenuUser: React.FC<IMenuUser> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useCommonDispatch()
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();
    const handleLogOut = () => {
        localStorage.removeItem('token')
        dispatch(setUser(null))
        setAnchorEl(null)
        navigate('/')
    }

    return (
        <div>
            <Button className={classes.root}
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen}
            >
                {props.user.name}
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div >
                    <Button component={Link} to={'/userPage'} onClick={handleClose}>
                        <StyledMenuItem>
                            <ListItemText primary="Личный кабинет" />
                        </StyledMenuItem>
                    </Button>
                    <StyledMenuItem>
                        <ListItemText primary="Настройки" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemText primary="Выйти" onClick={handleLogOut} />
                    </StyledMenuItem>
                </div>
            </StyledMenu>
        </div>
    );
}