import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from '../image/sale.jpg';
import { IBannerModel } from '../models/IBanner';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            paddingLeft: '1rem',
        },
        imageList: {
            width: 450,
            // height: 378,
            padding: '10px'
            // margin: '1rem',
        },
        imageListItem: {
            margin: '15px'
            // padding: '15px'
        },
        imageListItemBar: {
            marginLeft: '15px'
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);
interface IImage {
    banner: Array<IBannerModel>
}
const Image: React.FC<IImage> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList}>
                {props.banner.map((item) => (
                    <ImageListItem key={item.id} >
                        <img src={`http://localhost:3300/${item.image}`} alt={item.name} className={classes.imageListItem} />
                        <ImageListItemBar
                            className={classes.imageListItemBar}
                            title={item.description}
                            // subtitle={<span>by: {item.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.description}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default Image;