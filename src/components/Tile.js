import React from 'react';
import classes from './Tile.module.css';

const Tile = (props) => {
    const {title,start,end} = props.data;
    let startTime = parseInt(start);
    let endTime = parseInt(end);
    let hr = Math.trunc(endTime/100)-Math.trunc(startTime/100)-1;
    let topHour = Math.trunc(startTime/100)-9;
    let min =  endTime%100 + (60-startTime%100);
    let topMin = startTime%100;
    let totalHeight = hr*60+min;
    let top = topHour*60+topMin;

    return (
        <div style={{height:totalHeight+"px",top:top+"px"}} className={classes.styleClass}>
            <p>{title}</p>
        </div>
    );
}

export default Tile;
