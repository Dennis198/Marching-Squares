(this["webpackJsonpmarching-squares"]=this["webpackJsonpmarching-squares"]||[]).push([[0],{47:function(t,e,i){},48:function(t,e,i){},49:function(t,e,i){},55:function(t,e,i){"use strict";i.r(e);var n=i(3),s=i(0),a=i.n(s),r=i(9),o=i.n(r),l=(i(47),i(48),i(19)),h=i(20),d=i(38),c=i(37),u=(i(49),function(){function t(e,i,n){Object(l.a)(this,t),this.width=n,this.states=new Array(e).fill(0).map((function(){return new Array(i).fill(0)}))}return Object(h.a)(t,[{key:"drawLines",value:function(t,e,i,n,s,a){var r={x:t+.5*this.width,y:e},o={x:t+this.width,y:e+.5*this.width},l={x:t+.5*this.width,y:e+this.width},h={x:t,y:e+.5*this.width};switch(this.getState(i,n,s,a)){case 1:this.drawLine(l,h);break;case 2:this.drawLine(o,l);break;case 3:this.drawLine(o,h);break;case 4:this.drawLine(r,o);break;case 5:this.drawLine(r,h),this.drawLine(o,l);break;case 6:this.drawLine(r,l);break;case 7:case 8:this.drawLine(r,h);break;case 9:this.drawLine(r,l);break;case 10:this.drawLine(r,o),this.drawLine(l,h);break;case 11:this.drawLine(r,o);break;case 12:this.drawLine(o,h);break;case 13:this.drawLine(o,l);break;case 14:this.drawLine(l,h)}}},{key:"drawLine",value:function(t,e){var i=document.getElementById("2d-plane").getContext("2d");i.strokeStyle="black",i.lineWidth=3,i.beginPath(),i.moveTo(t.x,t.y),i.lineTo(e.x,e.y),i.stroke()}},{key:"getState",value:function(t,e,i,n){return 8*t+4*e+2*i+1*n}}]),t}()),f=function(){function t(e,i,n){Object(l.a)(this,t),this.field=this.createField(e,i,n),this.rows=e,this.cols=i,this.width=n,this.sqaure=new u(e-1,i-1,n)}return Object(h.a)(t,[{key:"createField",value:function(t,e){for(var i=new Array(t),n=0;n<i.length;n++){i[n]=new Array(e);for(var s=0;s<i[n].length;s++)i[n][s]=Math.floor(2*Math.random())}return i}},{key:"switchCellValue",value:function(t,e,i){this.field[t][e]=0,this.drawBackGround(),i&&this.draw()}},{key:"setAllCellstoBackGround",value:function(){for(var t=0;t<this.field.length;t++)for(var e=0;e<this.field[0].length;e++)this.field[t][e]=1}},{key:"drawBackGround",value:function(){var t=document.getElementById("2d-plane"),e=t.getContext("2d");e.beginPath(),e.fillStyle="#ADD8E6",e.fillRect(0,0,t.width,t.height),e.stroke();for(var i=0;i<this.field.length;i++)for(var n=0;n<this.field[0].length;n++){1===this.field[i][n]?e.fillStyle="#1E90FF":e.fillStyle="#DC143C",e.beginPath();var s=n*this.width,a=i*this.width;e.arc(s,a,this.width/4,0,2*Math.PI),e.fill()}}},{key:"draw",value:function(){for(var t=0;t<this.field.length-1;t++)for(var e=0;e<this.field[0].length-1;e++){var i=e*this.width,n=t*this.width;this.sqaure.drawLines(i,n,this.field[t][e],this.field[t][e+1],this.field[t+1][e+1],this.field[t+1][e])}}},{key:"drawAnimation",value:function(t){var e=Math.floor(t/this.cols),i=Math.floor(t%this.cols);if(e===this.field.length-2&&i===this.field[0].length-1)return!1;var n=i*this.width,s=e*this.width;return this.sqaure.drawLines(n,s,this.field[e][i],this.field[e][i+1],this.field[e+1][i+1],this.field[e+1][i]),!0}}]),t}(),v=i(77),w=i(76),b=i(11);i(75);var g=Object(b.a)({root:{color:"gray",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)",top:4,"& *":{background:"transparent",color:"red"}},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(v.a),k=700,m=400,j=function(t){Object(d.a)(i,t);var e=Object(c.a)(i);function i(t){var n;return Object(l.a)(this,i),(n=e.call(this,t)).intervalID=0,n.indexNextStep=0,n.state={field:new f(41,71,10),isRunning:!1,mouseDown:!1,resolution:10,isFinished:!1,index:0},n}return Object(h.a)(i,[{key:"componentDidMount",value:function(){this.state.field.drawBackGround()}},{key:"drawAnimate",value:function(){var t=this;if(!this.state.isFinished){var e,i=0;this.setState({isRunning:!0}),this.intervalID=setInterval((function(){e=t.state.field.drawAnimation(i),i++,e||(t.setState({isFinished:!0}),t.stop())}),50)}}},{key:"drawNextStep",value:function(){this.state.isFinished||(this.state.field.drawAnimation(this.indexNextStep)||(this.setState({isFinished:!0}),this.stop(),this.indexNextStep=0),this.indexNextStep++)}},{key:"draw",value:function(){this.state.isFinished||(this.state.field.draw(),this.setState({isFinished:!0}))}},{key:"stop",value:function(){clearInterval(this.intervalID),this.setState({isRunning:!1})}},{key:"reset",value:function(){this.setState({isFinished:!1}),this.state.field.drawBackGround(),this.indexNextStep=0}},{key:"handleResolutionChange",value:function(t,e){var i=this;this.setState({isFinished:!1,resolution:e,field:new f(Math.floor(1+m/e),Math.floor(1+k/e),e)}),this.reset(),setTimeout((function(){i.state.field.drawBackGround()}),10)}},{key:"setRandomPoints",value:function(){var t=this;this.setState({isFinished:!1,field:new f(Math.floor(1+m/this.state.resolution),Math.floor(1+k/this.state.resolution),this.state.resolution)}),this.reset(),setTimeout((function(){t.state.field.drawBackGround()}),10)}},{key:"mouseMove",value:function(t){if(this.state.mouseDown){var e=document.getElementById("2d-plane"),i=this.getMousePos(e,t),n=Math.round(i.x/this.state.resolution),s=Math.round(i.y/this.state.resolution);this.state.field.switchCellValue(s,n,this.state.isFinished)}}},{key:"onClickEvent",value:function(t){var e=document.getElementById("2d-plane"),i=this.getMousePos(e,t),n=Math.round(i.x/this.state.resolution),s=Math.round(i.y/this.state.resolution);this.state.field.switchCellValue(s,n,this.state.isFinished)}},{key:"getMousePos",value:function(t,e){var i=t.getBoundingClientRect();return{x:e.clientX-i.left,y:e.clientY-i.top}}},{key:"setAllpointsToBackGround",value:function(){this.state.field.setAllCellstoBackGround(),this.reset()}},{key:"allowSwitchColorOnMoveOnCanvas",value:function(){this.setState({mouseDown:!this.state.mouseDown})}},{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{className:"marchingsquare",children:[Object(n.jsx)("h1",{children:"Marching Square"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.draw()},children:"Fast Compute"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.drawAnimate()},children:"Animate"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.drawNextStep()},children:"Next Step"}),Object(n.jsx)(w.a,{variant:"outlined",onClick:function(){return t.stop()},children:"Stop"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.reset()},children:"Reset"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",color:"Primary",onClick:function(){return t.setAllpointsToBackGround()},children:"All Blue"}),Object(n.jsx)(w.a,{disabled:this.state.isRunning,variant:"outlined",onClick:function(){return t.setRandomPoints()},children:"Random Points"}),Object(n.jsxs)("div",{className:"marchingsquare__speed__slider",children:[Object(n.jsxs)("div",{className:"marchingsquare__speed__slider__label",children:[Object(n.jsx)("h4",{children:"More"}),Object(n.jsx)("h4",{children:"Points"}),Object(n.jsx)("h4",{children:"Less"})]}),Object(n.jsx)(g,{disabled:this.state.isRunning,valueLabelDisplay:"off","aria-label":"pretto slider",defaultValue:10,min:5,max:40,step:5,onChange:function(e,i){return t.handleResolutionChange(e,i)}})]}),Object(n.jsx)("div",{className:"marchingsquare__canvas",children:Object(n.jsx)("canvas",{className:"marchingsquare_canvas__2dplane",id:"2d-plane",width:k,height:m,onMouseDown:function(){return t.allowSwitchColorOnMoveOnCanvas()},onMouseUp:function(){return t.allowSwitchColorOnMoveOnCanvas()},onMouseMove:function(e){return t.mouseMove(e)},onClick:function(e){return t.onClickEvent(e)}})})]})}}]),i}(a.a.Component);var x=function(){return Object(n.jsx)("div",{className:"app",children:Object(n.jsx)(j,{})})},y=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,78)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,a=e.getLCP,r=e.getTTFB;i(t),n(t),s(t),a(t),r(t)}))};o.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(x,{})}),document.getElementById("root")),y()}},[[55,1,2]]]);
//# sourceMappingURL=main.ccacc873.chunk.js.map