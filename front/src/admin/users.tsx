import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Имя покупателя</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Статус</TableCell>
                        <TableCell align="center">Дата добавления</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                        <TableCell align="center">Редакторовать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {productStore.products?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell align="center">{product.price}{product.currency}</TableCell>
                            <TableCell align="center">{product.amount}</TableCell>
                            <TableCell align="center">{product.description}</TableCell>
                            <TableCell align="center"><IconButton
                                color="secondary"
                                onClick={() => handleDel(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton></TableCell>

                            <TableCell align="center"><IconButton
                                color="secondary"
                                component={Link} to={{
                                    pathname: `/admin/catalog/new/${product.id}`,
                                }}
                            >
                                <SettingsIcon />
                            </IconButton></TableCell>

                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>

        </TableContainer>
    </>
}
export default Users