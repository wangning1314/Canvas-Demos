// https://blog.csdn.net/weixin_33788244/article/details/93178239

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
let isDown = false;
let startX, startY;
let lineWidth;
let startTime;

context.lineCap = 'round';
context.lineJoin = 'round';

function setLineWidth(x, y) {
    let nowDate = new Date().getTime();
    let timeDistance = nowDate - startTime.getTime();
    if (timeDistance < 100) {
        lineWidth = 3;
    } else if(timeDistance < 500) {
        lineWidth = 4;
    } else if(timeDistance < 800) {
        lineWidth = 5;
    }else {
        let distance = Math.sqrt(Math.pow(x - startX, 2) +
            Math.pow(y - startY, 2));
        console.log('distance', distance);
        lineWidth = 6;
        if (distance <= 1) {
            lineWidth = 6;
        } else if (distance > 1 && distance < 5) {
            lineWidth = 5.5;
        } else {
            lineWidth = 4;
        }
    }

    return lineWidth;
}

context.canvas.onmousedown = function (ev) {
    ev.preventDefault();
    console.log('onmousedown');
    let loc = windowToCanvas(canvas, ev.clientX, ev.clientY);
    startX = loc.x;
    startY = loc.y;
    context.moveTo(startX, startY);
    isDown = true;
    startTime = new Date();

};

context.canvas.onmousemove = function (ev) {
    let loc = windowToCanvas(canvas, ev.clientX, ev.clientY);
    ev.preventDefault();
    if (isDown) {
        console.log('drawing');
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(loc.x, loc.y);

        // 获得笔触粗细
        context.lineWidth = setLineWidth(loc.x, loc.y);
        startX = loc.x;
        startY = loc.y;
        context.stroke();
    }

};

context.canvas.onmouseup = function (ev) {
    ev.preventDefault();
    isDown = false;

    console.log('onmouseup');
};
