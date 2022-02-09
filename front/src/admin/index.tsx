import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InboxIcon from '@material-ui/icons/Inbox';
import { Routes, Link, Route } from 'react-router-dom';
import Catalog from './catalog';
import Users from './users';
import Delivery from './delivery';
interface IAdmin {

}
const Admin: React.FC<IAdmin> = () => {
    const menu = [
        { text: "Catalog", link: "catalog" },
        { text: "Users", link: "users" },
        { text: "Delivery", link: "delivery" }
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
        <div className='container p-5'>
            <Routes>
                <Route path="catalog/*" element={<Catalog />} />
                <Route path="users/" element={<Users />} />
                <Route path="delivery/" element={<Delivery />} />
            </Routes>
        </div>

    </div>
}
export default Admin