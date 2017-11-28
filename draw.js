window.onload=function () {
    let canvas=document.getElementById('clock');
    let context=canvas.getContext('2d');
    let canvas_Width=400;
    let canvas_Height=400;
    let deg=Math.PI/180;
    let r1=124;
    let r2=119;

    canvas.width=canvas_Width;
    canvas.height=canvas_Height;

    function drawClock() {
        clearClock();
        drawCircle();
        drawScale();
        drawNumber();
        drawHour();
        drawMinute();
        drawSecond();
    }

    //清空
    function clearClock() {
        context.clearRect(0,0,canvas_Width,canvas_Height);
    }

    function drawCircle() {
        context.lineWidth=1;
        context.strokeStyle='black';
        context.beginPath();
        context.arc(canvas_Width/2,canvas_Height/2,r1,0,2*Math.PI);
        context.moveTo(canvas_Width/2+r2,canvas_Height/2);//319=200+119
        context.arc(canvas_Width/2,canvas_Height/2,r2,0,2*Math.PI);
        context.stroke();
    }

    //画刻度
    function drawScale() {
        for (let i=0;i<12;i++){
            context.beginPath();
            context.moveTo(canvas_Width/2+(Math.sin(i*30*deg)*100),canvas_Height/2-(Math.cos(i*30*deg)*100));
            context.lineTo(canvas_Width/2+(Math.sin(i*30*deg)*(100+20)),canvas_Height/2-(Math.cos(i*30*deg)*(100+20)));
            context.stroke();
        }
    }

    //画数字
    function drawNumber() {
        let text=[12,1,2,3,4,5,6,7,8,9,10,11];
        for(let i=0;i<12;i++){
            context.beginPath();
            context.font='25px KaiTi';
            context.fillText(text[i],192+(Math.sin(i*30*deg)*90),210-(Math.cos(i*30*deg)*88));
            context.stroke();
        }
    }

    //画时针
    function drawHour() {
        let now=new Date();
        let hour_x=canvas_Width/2+50*(Math.sin(now.getHours()*30*deg+now.getMinutes()*0.5*deg));
        let hour_y=canvas_Height/2-50*(Math.cos(now.getHours()*30*deg+now.getMinutes()*0.5*deg));
        context.beginPath();
        context.moveTo(canvas_Width/2,canvas_Height/2);
        context.lineTo(hour_x,hour_y);
        context.strokeStyle='black';
        context.lineCap='round';
        context.lineWidth=6;
        context.stroke();
    }

    //画分针
    function drawMinute() {
        let now=new Date();
        let minute_x=canvas_Width/2+60*(Math.sin(now.getMinutes()*6*deg+now.getSeconds()*0.1*deg));
        let minute_y=canvas_Height/2-60*(Math.cos(now.getMinutes()*6*deg+now.getSeconds()*0.1*deg));
        context.beginPath();
        context.moveTo(canvas_Width/2,canvas_Height/2);
        context.lineTo(minute_x,minute_y);
        context.strokeStyle='black';
        context.lineCap='round';
        context.lineWidth=4;
        context.stroke();
    }

    //画秒针
    function drawSecond() {
        let now=new Date();
        let second_x=canvas_Width/2+80*(Math.sin(now.getSeconds()*6*deg+now.getMilliseconds()*0.006*deg));
        let second_y=canvas_Height/2-80*(Math.cos(now.getSeconds()*6*deg+now.getMilliseconds()*0.006*deg));
        context.beginPath();
        context.moveTo(canvas_Width/2,canvas_Height/2);
        context.lineTo(second_x,second_y);
        context.strokeStyle='black';
        context.lineCap='round';
        context.lineWidth=1;
        context.stroke();
    }

    setInterval(drawClock,50);
}