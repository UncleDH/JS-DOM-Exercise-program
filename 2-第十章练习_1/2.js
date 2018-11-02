function positionMessage(){
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
   // moveElement("message",200,200,10);
    movement = setTimeout("moveElement('"+"message"+"',"+200+","+200+","+10+")",1000);

}

function moveElement(elementID,final_x,final_y,interval){
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
      return true;
    }
    if (xpos < final_x) {
      xpos++;
    }
    if (xpos > final_x) {
      xpos--;
    }
    if (ypos < final_y) {
      ypos++;
    }
    if (ypos > final_y) {
      ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement = setTimeout(repeat,10);
}
function moveMessage(){
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == 200 && ypos == 100){
        return true;
    }   
    if(xpos < 200){
        xpos++;
    }
    else if(xpos > 200){
        xpos--;
    }
    if(ypos < 200){
        ypos++;
    }
    else if(ypos > 200){
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    movement = setTimeout("moveMessage()",10);
}
function addLoadEvent(func){//共享onload事件
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(positionMessage);
//addLoadEvent(moveMessage);