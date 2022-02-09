import { AppBar, Toolbar, Typography, Button, makeStyles, IconButton } from '@material-ui/core';
import * as React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

interface INavBar {

}
const useStyles = makeStyles((theme) => ({
    root: { display: "flex", justifyContent: "space-between" }
}));
const NavBar: React.FC<INavBar> = () => {

    const classes = useStyles()
    let { pathname } = useLocation();
    const getTitle = () => {
        switch (pathname) {
            case '/admin/catalog/list':
                return 'Каталог'
            case '/admin/catalog/new':
                return 'Новый товар'
            case pathname.startsWith('/admin/catalog/new/') && pathname:
                return 'Редакторвать'
            default:
                return "Админка";
        }
    }


    return <AppBar position="static">
        <Toolbar className={classes.root}>
            <Typography variant="h6" >
                {getTitle()}
            </Typography>
            <div>
                <Button component={Link} to={'new'} color="inherit">Добавить</Button>
                <Button component={Link} to={'/'} color="inherit">
                    <IconButton aria-label="add to shopping cart">
                        <HomeIcon />
                    </IconButton>
                </Button>
            </div>
        </Toolbar>
    </AppBar>
}
export default NavBar