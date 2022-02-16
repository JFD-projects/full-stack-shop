import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IUser } from '../models/IUser';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from './common/confirmDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);
interface IUsers {

}
const Users: React.FC<IUsers> = () => {
    const classes = useStyles();

    const [users, setUsers] = React.useState<IUser[]>([])
    const getUsers: any = async () => {
        const response = await axios.get('http://localhost:3300/api/user/getAll')
        return response.data
    }

    const [dialogIsOpen, setDialog] = React.useState(false)
    const [userIdToDelete, setUserIdToDelete] = React.useState('')
    const handleDel = (userId: string) => {
        setUserIdToDelete(userId)
        setDialog(true)
    }

    const handleDialogClose = async (isConfirmed?: boolean) => {
        if (isConfirmed) {
            const response = await axios.delete('http://localhost:3300/api/user/remove',
                { data: { id: userIdToDelete } });
            setUsers(users)
            setUserIdToDelete('')
            setDialog(false)
            return response.data.json
        }
        setDialog(false)
    }
    React.useEffect(() => {
        (async () => {
            const users = await getUsers()
            setUsers(users)
        })()
    }, [dialogIsOpen])

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Имя покупателя</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Статус</TableCell>
                        <TableCell align="center">Роль</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">Активный</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDel(user.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ConfirmDialog isOpen={dialogIsOpen} onClose={handleDialogClose} />
    </>
}
export default Users