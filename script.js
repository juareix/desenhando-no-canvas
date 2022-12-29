//dados iniciais
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d'); //especificA o contextp da tela 2d ou 3d

//eventos
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

//detectando os eventos de mouse na tela canvas declarada como screen
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

//funcoes

//VERIFICA QUAL COR CLICADA 
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    //console.log("COR CLICADA: ", color);
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    //console.log('clickou');
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft; //ajustando as dimensoes da tela canvas
    mouseY = e.pageY - screen.offseTop;

}

function mouseMoveEvent(e){
    //console.log('moveu');
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent(){
    //console.log('soltou');
    canDraw = false;
}
function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();//comanda q sera escrito linha
    ctx.lineWidth = 5;//largura da linha
    ctx.lineJoin = "round";//arrendonda a linha
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}