import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InboxIcon from '@material-ui/icons/Inbox';
import { Routes, Link, Route } from 'react-router-dom';
import Catalog from './catalog';
import Delivery from './delivery';
import UsersList from './usersList';
import Main from '../main';
import BannersList from './bannersList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: '6rem',
        },
    }),
);


interface IAdmin {

}
const Admin: React.FC<IAdmin> = () => {
    const classes = useStyles();
    const menu = [
        { text: "Main", link: "/main" },
        { text: "Catalog", link: "catalog" },
        { text: "UsersList", link: "usersList" },
        { text: "Delivery", link: "delivery" },
        { text: "BannersList", link: "bannersList" }
    ]
    return <div>
        <Drawer
            variant="permanent"
            anchor="left"
        >
            <List>
                {menu.map((item, index) => (
                    <Link to={item.link} key={item.link}>
                        <ListItem button >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailOutlineIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
        <div className={`container ${classes.root}`}>
            <Routes>
                <Route path="/*" element={<Main />} />
                <Route path="catalog/*" element={<Catalog />} />
                <Route path="usersList/*" element={<UsersList />} />
                <Route path="delivery/" element={<Delivery />} />
                <Route path="bannersList/*" element={<BannersList />} />
            </Routes>
        </div>

    </div>
}
export default Admin