import React from 'react';
import "./marching-square.css";
import Field from "./Field/field";
import { Button, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

/**
  Code for the custom slider look
  * */ 
 function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const PrettoSlider = withStyles({
    root: {
      color: 'gray',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
      top: 4,
      '& *': {
        background: 'transparent',
        color: 'red',
      },
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
/**End Slide Code */


const CANVAS_WIDTH=700;
const CANVAS_HEIGHT=400;
const DEFAULT_RESOLUTION=10;

export default class MarchingSquare extends React.Component{
    intervalID = 0;
    indexNextStep=0;
    constructor(props){
        super(props);
        this.state = {
            field: new Field(1+CANVAS_HEIGHT/DEFAULT_RESOLUTION,1+CANVAS_WIDTH/DEFAULT_RESOLUTION,DEFAULT_RESOLUTION),
            isRunning:false,
            mouseDown: false,
            resolution: DEFAULT_RESOLUTION,
            isFinished:false,
            index:0,
        };
    }

    //Draws the inital Field (Only Points)
    componentDidMount(){
        this.state.field.drawBackGround();   
    }

    //Animates the Marching Square Algorithm Step by Step
    drawAnimate(){
        if(this.state.isFinished) return;
        let index=0;
        let success;
        this.setState({isRunning:true});
        this.intervalID = setInterval(() => {
            success=this.state.field.drawAnimation(index);
            index++;
            if(!success) {
                this.setState({isFinished:true})
                this.stop();
            }
        },50);       
    }

    //Draws the Next Step of the marching square algorithm
    drawNextStep(){
        if(this.state.isFinished) return;
        let success;
        success = this.state.field.drawAnimation(this.indexNextStep);
        if(!success){
            this.setState({isFinished:true})
            this.stop();
            this.indexNextStep=0;
        }
        this.indexNextStep++;
    }

    //Computes the Marching Sqaure Algorithm in an Instant
    draw(){
        if(this.state.isFinished) return;
        this.state.field.draw();
        this.setState({isFinished:true})
    }

    //Stops the Animation of the Marching Square Algorithm
    stop(){
        clearInterval(this.intervalID);
        this.setState({isRunning:false});
    }

    //Resets the Canvas (Draws Only the Initial Points)
    reset(){
        this.setState({isFinished:false})
        this.state.field.drawBackGround();
        this.indexNextStep=0;
    }

    //Handles the Resolution Change (Slider) and creates a new Field
    handleResolutionChange(e, val){
        this.setState({isFinished:false,resolution: val, field: new Field(Math.floor(1+CANVAS_HEIGHT/val),Math.floor(1+CANVAS_WIDTH/val),val)});
        this.reset();
        setTimeout(() => {
            this.state.field.drawBackGround();
        },10);
    }

    //Sets new Random Points in the Field
    setRandomPoints(){
        this.setState({isFinished:false,field: new Field(Math.floor(1+CANVAS_HEIGHT/this.state.resolution),Math.floor(1+CANVAS_WIDTH/this.state.resolution),this.state.resolution)});
        this.reset();
        setTimeout(() => {
            this.state.field.drawBackGround();
        },10);
    }

    //Handles the Mousemovement on the Canvas when Clicked, Change the Color of the points
    //and if this.state.isFinished then it also computes Marching Square Algorithm
    mouseMove(e){
        if(!this.state.mouseDown){
            return;
        }
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        let j= Math.round(pos.x/(this.state.resolution));
        let i= Math.round(pos.y/(this.state.resolution));
        this.state.field.switchCellValue(i,j, this.state.isFinished);
    }

    //Handles the ClickEvent on the Canvas when Clicked, Change the Color of the points
    //and if this.state.isFinished then it also computes Marching Square Algorithm
    onClickEvent(e){
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        let j= Math.round(pos.x/(this.state.resolution));
        let i= Math.round(pos.y/(this.state.resolution));
        this.state.field.switchCellValue(i,j, this.state.isFinished);
    }

    //Gets the Mouse position on the Canvas
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
        };
    }

    //Sets all the Cells to 1 (Background blue)
    setAllpointsToBackGround(){
        this.state.field.setAllCellstoBackGround();
        this.reset();
    }

    //Sets the Variable on Mouse Down to true/ Mouse UP to false
    allowSwitchColorOnMoveOnCanvas(){
        this.setState({mouseDown: !this.state.mouseDown})
    }

    render(){
        return(
            <div className="marchingsquare">
                <h1>Marching Square</h1>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={()=>this.draw()}>Fast Compute</Button>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={()=>this.drawAnimate()}>Animate</Button>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={()=>this.drawNextStep()}>Next Step</Button>
                <Button variant="outlined"onClick={()=>this.stop()}>Stop</Button>
                <Button disabled={this.state.isRunning}variant="outlined" onClick={()=>this.reset()}>Reset</Button>
                <Button disabled={this.state.isRunning}variant="outlined" color="Primary" onClick={()=>this.setAllpointsToBackGround()}>All Blue</Button>
                <Button disabled={this.state.isRunning}variant="outlined" onClick={()=>this.setRandomPoints()}>Random Points</Button>
                <div className="marchingsquare__speed__slider">
                    <div className="marchingsquare__speed__slider__label">
                        <h4>More</h4>
                        <h4>Points</h4>
                        <h4>Less</h4>
                    </div>
                    <PrettoSlider disabled={this.state.isRunning} valueLabelDisplay="off"
                        aria-label="pretto slider" defaultValue={10} min={5} max={40} step={5}
                        onChange={(e, val) => this.handleResolutionChange(e, val)}  
                    />
                </div>
                <div className="marchingsquare__canvas">
                    <canvas className="marchingsquare_canvas__2dplane" id="2d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                          onMouseDown={()=> this.allowSwitchColorOnMoveOnCanvas()}
                          onMouseUp={()=> this.allowSwitchColorOnMoveOnCanvas()}
                          onMouseMove={(e) => this.mouseMove(e)}
                          onClick={(e) => this.onClickEvent(e)}
                    ></canvas>
                </div>
            </div>            
        );
    }
}
