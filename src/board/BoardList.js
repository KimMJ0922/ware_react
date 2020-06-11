import React from 'react';
import { TimelineMax, TweenMax } from "gsap/all";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const BoardList=()=>{ 
    TweenMax.set(".cardBack", {rotationY:-180});

    var tl = new TimelineMax({paused:true});
    tl
        .to(".cardFront", 1, {rotationY:180})
        .to(".cardBack", 1, {rotationY:0},0);
    
    function elOver() {
        this.animation.play();
    }

    function elOut() {
        this.animation.reverse();
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(2),
            width: '50ch',
          },
        },
        button1: {
          margin: theme.spacing(2),
          width: '5ch',
          height: '7ch',
        },
        button2: {
            margin: theme.spacing(2),
            width: '15ch',
            height: '7ch',
        },
    }));
    const classes = useStyles();
    return (
        <div className="board">
            <div className="BoardTop"></div>
            <div className="BoardContainer">
                <div className="BoardItem">
                    <div class="cardBack"></div>
                    <div class="cardFront"></div>
                </div>
                <div className="BoardItem"></div>
                <div className="BoardItem"></div>
                <div className="BoardItem"></div>
                <div className="BoardItem"></div>
                <div className="BoardItem"></div>
                <div className="BoardItem"></div>
            </div>
            <div className="BoardPagination"></div>
            <div className="BoardBottom">
                <div className="BoardSearch">
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-search" type="search" variant="outlined" />
                        <Button variant="contained" color="primary" className={classes.button1}>검색</Button>
                    </form>
                </div>
                <div className="BoardInsert">
                    <Link to="/board/insert">
                        <Button variant="contained" color="primary" className={classes.button2}>게시물 작성</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default BoardList;