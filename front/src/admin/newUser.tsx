import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IUser } from '../models/IUser';

const roles = [
    {
        value: 'USER',
        label: 'USER',
    },
    {
        value: 'ADMIN',
        label: 'ADMIN',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
interface INewUser {

}
const NewUser: React.FC<INewUser> = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const { control, handleSubmit, reset } = useForm({
        defaultValues:
        {
            name: '',
            role: 'ADMIN',
            email: '',
            password: '',
            // image: '/images/defaultImage.png'
        }
    });

    // const [productById, setProductById] = React.useState<IProduct>()
    // const getProductById: any = async () => {
    //     const response = await axios.get(`http://localhost:3300/api/product/getOne`, { params: { id } })
    //     return response.data
    // }
    // React.useEffect(() => {
    //     if (id) {
    //         (async () => {
    //             const product = await getProductById()
    //             setProductById(product)
    //         })()
    //     }
    // }, [id])

    // React.useEffect(() => {
    //     if (productById) {
    //         reset(productById)
    //     }
    // }, [productById])

    // const urlDefault = 'http://localhost:3300/images/defaultImage.png'
    // const [image, setImage] = React.useState<string | null>(null)
    // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files
    //     const reader = new FileReader();
    //     if (file) {
    //         setImage(URL.createObjectURL(file[0]))
    //     }
    // }

    const onSubmit = async (data: IUser) => {
        const response = await axios.post('http://localhost:3300/api/user/registration', data);
        // data.image = image || urlDefault
        navigate('/admin/usersList/users')
    };
    const classes = useStyles();

    return <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off">
            <div>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField label="Имя пользователя" type="text"  {...field} />}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField label="Email" type="text"  {...field} />}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField label="Пароль" type="text"  {...field} />}
                />
                <div className='d-flex'>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                select
                                label="Роль"
                                {...field}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }

                    />
                </div>
                {/* <Controller
                    name="image"
                    control={control}
                    render={({ field }) =>
                        <>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event) => handleUpload(event)} />
                            <img src={image || urlDefault} />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </>}

                /> */}
            </div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type='submit'
            >
                Сохранить
            </Button>
        </form>
    </>
}

export default NewUser