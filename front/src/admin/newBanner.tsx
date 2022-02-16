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
import { IBannerModel } from '../models/IBanner';

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
interface INewBanner {

}
const NewBanner: React.FC<INewBanner> = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm({
        defaultValues:
        {
            name: '',
            description: '',
            image: '/images/defaultImage.png'
        }
    });

    const urlDefault = 'http://localhost:3300/images/defaultImage.png'
    const [image, setImage] = React.useState<string | null>(null)
    const [file, setFile] = React.useState<File>()
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        const reader = new FileReader();
        if (files) {
            setFile(files[0])
            setImage(URL.createObjectURL(files[0]))
        }
    }

    const onSubmit = async (data: IBannerModel) => {
        const formData = new FormData();
        file && formData.append("file", file as Blob);
        formData.append("data", JSON.stringify(data));
        let response = await axios.post('http://localhost:3300/api/banner/create', formData);
        navigate('/admin/bannersList/banners')
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
                    render={({ field }) => <TextField label="Название баннера" type="text"  {...field} />}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <TextField label="Описание" type="text"  {...field} />}
                />

                <Controller
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
                        </>
                    }
                />
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

export default NewBanner