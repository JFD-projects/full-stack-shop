import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from '../image/sale.jpg';

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
            height: 378,
            margin: '1rem',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);


const itemData = [
    {
        img: image,
        title: 'Image',
        author: 'author',
    }, {
        img: image,
        title: 'Image',
        author: 'author',
    }, {
        img: image,
        title: 'Image',
        author: 'author',
    }, {
        img: image,
        title: 'Image',
        author: 'author',
    },
];

export default function TitlebarImageList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={180} className={classes.imageList}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
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