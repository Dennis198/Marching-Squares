/**
 * This File handles the computes of the Square of the marching sqaure algorithm
 */
export default class Square{
    constructor(rows,cols,width){
        this.width=width;
        this.states=new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    }

    //Draws the Lines of 16 differet Cases of the marching sqaure algorithm
    // topLeft_V -- point_A -- topRight_V
    //     |                        |
    //  point_D                  point_B
    //     |                        |
    // bottomLeft -- point_C -- bottomRoght
    drawLines(x,y,topLeft_V,topRight_V,bottomRight_V,bottomLeft_V){
        let point_A = {x: x+this.width*0.5, y:y};
        let point_B = {x: x+this.width, y:y+this.width*0.5};
        let point_C = {x: x+this.width*0.5, y:y+this.width};
        let point_D = {x: x, y:y+this.width*0.5};
        switch(this.getState(topLeft_V,topRight_V,bottomRight_V,bottomLeft_V)){
            case 1:
                this.drawLine(point_C, point_D);
                break;
            case 2:
                this.drawLine(point_B, point_C);
                break;
            case 3:
                this.drawLine(point_B, point_D);
                break;
            case 4:
                this.drawLine(point_A, point_B);
                break;
            case 5:
                this.drawLine(point_A, point_D);
                this.drawLine(point_B, point_C);
                break;
            case 6:
                this.drawLine(point_A, point_C);
                break;
            case 7:
                this.drawLine(point_A, point_D);
                break;
            case 8:
                this.drawLine(point_A, point_D);
                break;
            case 9:
                this.drawLine(point_A, point_C);
                break;
            case 10:
                this.drawLine(point_A, point_B);
                this.drawLine(point_C, point_D);
                break;
            case 11:
                this.drawLine(point_A, point_B);
                break;
            case 12:
                this.drawLine(point_B, point_D);
                break;
            case 13:
                this.drawLine(point_B, point_C);
                break;
            case 14:
                this.drawLine(point_C, point_D);
                break;
            default:
                break;
        }
    }

    //Draws a Square for the animation (Currently not in use)
    /*
    drawSquare(x,y){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(x,y,this.width,this.width);
        context.stroke();      
    }*/

    //Draws a line from start to End
    drawLine(start, end){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.strokeStyle="black";
        context.lineWidth=3 ;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
    }

    //Calculates the state of the current square (DEC => BIN)
    getState(a,b,c,d){
        return a*8 + b*4 + c*2 + d*1;
    }
}