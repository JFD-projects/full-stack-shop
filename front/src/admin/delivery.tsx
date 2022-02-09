import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import * as React from 'react';
import Switch from '@material-ui/core/Switch';
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
interface IDelivery {

}
const Delivery: React.FC<IDelivery> = () => {
    const classes = useStyles();
    const [deliveries, setDeliveries] = React.useState([
        { name: "Доставка по городу", status: false, id: "1" },
        { name: "Бесплатная доставка", status: false, id: "2" },
        { name: "Самовывоз", status: false, id: "3" }
    ])
    const handleToggle = (id: string) => {
        const newDel = deliveries.map((el) => {
            if (el.id === id) {
                el.status = !el.status
            }
            return el
        })
        setDeliveries(newDel)
    }
    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Способ доставки</TableCell>
                        <TableCell align="center">Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                            <TableCell component="th" scope="row">
                                {delivery.name}
                            </TableCell>
                            <TableCell align="center">
                                <Switch
                                    checked={delivery.status}
                                    onChange={() => handleToggle(delivery.id)}
                                />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    </>
}
export default Delivery