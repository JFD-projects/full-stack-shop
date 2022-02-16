import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ConfirmDialog from './common/confirmDialog';
import axios from 'axios';
import { IBannerModel } from '../models/IBanner';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
        image: {
            width: '10rem'
        },
        block: {
            padding: '0'
        }
    }),
);


interface IBanner { }

const Banner: React.FC<IBanner> = () => {
    const classes = useStyles();
    const [banners, setBanners] = React.useState<IBannerModel[]>([])
    const getBanners: any = async () => {
        const response = await axios.get('http://localhost:3300/api/banner/getAll')
        return response.data
    }

    const [dialogIsOpen, setDialog] = React.useState(false)
    const [bannerIdToDelete, setBannerIdToDelete] = React.useState('')
    const handleDel = (bannerId: string) => {
        setBannerIdToDelete(bannerId)
        setDialog(true)
    }
    // console.log(banners);

    const handleDialogClose = async (isConfirmed?: boolean) => {
        if (isConfirmed) {
            const response = await axios.delete('http://localhost:3300/api/banner/remove',
                { data: { id: bannerIdToDelete } });
            setBanners(banners)
            setBannerIdToDelete('')
            setDialog(false)
            return response.data.json
        }
        setDialog(false)
    }
    React.useEffect(() => {
        (async () => {
            const banners = await getBanners()
            setBanners(banners)
        })()
    }, [dialogIsOpen])

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Название</TableCell>
                        <TableCell align="center">Описание</TableCell>
                        <TableCell align="center">Картника</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banners?.map((banner) => (
                        <TableRow key={banner.id}>
                            <TableCell className={classes.block} align="center">{banner.id}</TableCell>
                            <TableCell className={classes.block} align="center" component="th" scope="row">
                                {banner.name}
                            </TableCell>
                            <TableCell className={classes.block} align="center">{banner.description}</TableCell>

                            <TableCell className={classes.block} align="center">
                                <img src={`http://localhost:3300/${banner.image}`} alt='' className={classes.image} />
                            </TableCell>
                            <TableCell className={classes.block} align="center">
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDel(banner.id)}
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
};

export default Banner;
