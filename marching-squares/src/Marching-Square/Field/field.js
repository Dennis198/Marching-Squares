/**
 * This file handles the marching square algorithm
 */
import Square from "./square";

export default class Field{
    constructor(rows,cols,width){
        this.field = this.createField(rows,cols,width);
        this.rows = rows;
        this.cols = cols;
        this.width=width;
        this.sqaure=new Square(rows-1,cols-1,width);
    }

    //Creates the initial Field
    createField(rows,cols){
        let field = new Array(rows);
        for(let i=0;i<field.length;i++){
            field[i]= new Array(cols);
            for(let j=0;j<field[i].length;j++){
                field[i][j]=(Math.floor((Math.random()*2)));
            }
        }
        return field;
    }

    //Switches the Value of the Field field[i][j]
    switchCellValue(i,j, isFinished){
        this.field[i][j]=0;//(this.field[i][j]+1)%2
        this.drawBackGround();
        if(isFinished){
            this.draw();
        }
    }

    //Draws the Background of the Canvas (Only Points) and Background
    drawBackGround(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.beginPath();
        context.fillStyle = "#ADD8E6";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.stroke(); 
        for(let i=0;i<this.field.length;i++){
            for(let j=0;j<this.field[0].length;j++){
                if(this.field[i][j]===1){
                    context.fillStyle =`#1E90FF`;//Blue
                } else {
                    context.fillStyle =`#DC143C`;//Red
                }               
                context.beginPath();
                let x = j*this.width;
                let y = i*this.width;
                context.arc(x, y, this.width/4, 0, 2*Math.PI);
                context.fill();
            }
        }
    }

    //Execute the Marching sqaure algorithm
    draw(){
        for(let i=0;i<this.field.length-1;i++){
            for(let j=0;j<this.field[0].length-1;j++){
                let x = j*this.width;
                let y = i*this.width;
                this.sqaure.drawLines(x,y,this.field[i][j],this.field[i][j+1],this.field[i+1][j+1],this.field[i+1][j]);
            }
        }
    }

    //Execute one/(next) step of the Marching sqaure
    drawAnimation(index){
        let i = Math.floor(index/this.cols);
        let j = Math.floor(index%this.cols);
        if(i===this.field.length-2&&j===this.field[0].length-2)return false;
        let x = j*this.width;
        let y = i*this.width;
        this.sqaure.drawLines(x,y,this.field[i][j],this.field[i][j+1],this.field[i+1][j+1],this.field[i+1][j]);
        return true;
    }
}