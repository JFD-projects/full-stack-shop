import { AppBar, Toolbar, Typography, Button, makeStyles, IconButton } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import store from '../../store';
import logo from '../../image/logo.jpg'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DialogRegisration from './dalogRegistration';
import { IUser } from '../../models/IUser';
import { MenuUser } from './menuUser';

interface INavBar {

}
const useStyles = makeStyles((theme) => ({
    root: { display: "flex", justifyContent: "space-between", backgroundColor: "#23272c" },
    button: { color: "#a3a7ac", display: "flex" },
    icon: { color: "cadetblue" },
    logo: { height: '4rem' },
    phone: { marginLeft: '100px', color: "inherit" },
    input: { marginLeft: theme.spacing(1), flex: 1, color: "#a3a7ac" },
    iconButton: { padding: 10, color: "#a3a7ac" },
    divider: { height: 28, margin: 4, },
}));
const NavBar: React.FC<INavBar> = () => {
    const classes = useStyles()
    const [count, setCount] = React.useState(0)
    const [countFavorite, setCountFavorite] = React.useState(0)
    const [user, setUser] = React.useState<IUser | null>(null)

    store.subscribe(() => {
        setCount(store.getState().cart.length)
        setCountFavorite(store.getState().favorite.length)
        setUser(store.getState().user)
    })
    React.useEffect(() => {
        setCount(store.getState().cart.length)
        setCountFavorite(store.getState().favorite.length)
        setUser(store.getState().user)
    }, [])

    const [dialogIsOpen, setDialog] = React.useState(false)
    const handleOpen = () => {
        setDialog(true)
    }
    const handleDialogClose = (isConfirmed?: boolean,) => {
        setDialog(false)
    }

    return <AppBar position="static">
        <Toolbar className={classes.root}>
            <Typography variant="h6" >
                <Button component={Link} to={'/'} >
                    <img src={logo} className={classes.logo} />
                </Button>
                <Button component={Link} to={'/contactsPage'} className={classes.phone}>+7 981 844 80 74</Button>
            </Typography>
            <div className={classes.button}>
                <IconButton type="submit" className={classes.iconButton}>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск"
                    />
                    <SearchIcon />
                </IconButton>

                {user?.role === 'ADMIN' ?
                    <Button component={Link} to={'/admin'} color="inherit">Админка</Button> :
                    <div>
                        <Button component={Link} to={'/cart'} color="inherit">
                            <IconButton>
                                <Badge badgeContent={count} color="secondary">
                                    <ShoppingCartIcon className={classes.icon} />
                                </Badge>
                            </IconButton>
                        </Button>
                        <Button component={Link} to={'/favorite'} color="inherit">
                            <IconButton>
                                <Badge badgeContent={countFavorite} color="secondary">
                                    <FavoriteIcon className={classes.icon} />
                                </Badge>
                            </IconButton>
                        </Button>
                    </div>
                }
                {user ?
                    <MenuUser user={user} />
                    :
                    <Button
                        color="inherit"
                        onClick={handleOpen}
                    >
                        Вход
                    </Button>
                }
                {/* <Button component={Link} to={'/'} color="inherit">
                    <IconButton>
                        <HomeIcon className={classes.icon} />
                    </IconButton>
                </Button> */}
            </div>
        </Toolbar>
        <DialogRegisration isOpen={dialogIsOpen} onClose={handleDialogClose} />
    </AppBar>
}
export default NavBar