function displayAbbreviations(){
    if(!document.getElementsByClassName) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
   // var a = document.getElementsByTagName("body");
   //获得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if(abbreviations.length < 1) return false;
    var c = [];
    var d = [];
    //遍历这些缩略词
    for (var i = 0; i<abbreviations.length; i++){
        if(abbreviations[i].childNodes.length < 1) continue;//为不支持abbr的浏览器提供
        c[i] = abbreviations[i].getAttribute("title");
        d[i] = abbreviations[i].lastChild.nodeValue;//使用lastChild 防止abbr内还有别的节点
    }
    //创建定义列表
    var dl = document.createElement("dl");
    for(var j = 0; j<abbreviations.length; j++){
        //创建定义标题和内容
        var dt = document.createElement("dt");
        var dd = document.createElement("dd");
        var text_d = document.createTextNode(d[j]);
        var text_c = document.createTextNode(c[j]);
        dt.appendChild(text_d);
        dd.appendChild(text_c);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    if (dl.childNodes.length < 1) return false;//为不支持abbr的浏览器提供
    //创建表格的标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    //添加到页面主体
    document.body.appendChild(header);
    document.body.appendChild(dl);
    //insertAfter(header,document.getElementById("2"))
    //insertAfter(dl,header);
}
function displayCitations(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var quotes = document.getElementsByTagName("blockquote");
    for(var i=0; i<quotes.length; i++){
        //确保cite是存在的
        if(quotes[i].getAttribute("cite")){
            var url = quotes[i].getAttribute("cite"); 
            var quoteChildren = quotes[i].getElementsByTagName("*");
                if(quoteChildren.length < 1) continue;
            var elem = quoteChildren[quoteChildren.length - 1];
            //使用alert(quotes[i].lastChild.nodeType);可以验证chrome把blockquote中的换行符当成了文本 ，用get子元素最保险
            var link = document.createElement("a");
            link.setAttribute("href",url);
            var link_text = document.createTextNode("source");
            link.appendChild(link_text);
            //创建一个上标
            var superscript = document.createElement("sup");
            superscript.appendChild(link);
            //添加到最后一个元素节点
            elem.appendChild(superscript);
        }
    }
}
function displayAccesskeys(){
    var a = document.getElementById("navigation");
    var b = a.getElementsByTagName("a");
    var ul = document.createElement("ul");
    for(var i=0; i<b.length; i++){
        if(b[i].getAttribute("accesskey")){
            var c = b[i].getAttribute("accesskey");
            var text = b[i].childNodes[0].nodeValue;
            var li = document.createElement("li");
            t = document.createTextNode(c + ":" + text);
            li.appendChild(t);
            ul.appendChild(li);
        }
    }
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Accesskeys");
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(ul);
    
}
function test(){
    var id = document.getElementById("name");
    id.style.color = "yellow";
}
function  highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("li");
    for(var i=0; i<rows.length; i++){
    rows[i].onmouseover = function(){
        this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function(){
        this.style.fontWeight = "normal";
    }
    }
}
function styleElementSiblings(tag,theclass){
    if(!document.getElementsByTagName) return false;
    var elems = document.getElementsByTagName(tag);
    var elem;
    for(var i=0; i<elems.length; i++){
        elem = getNextElement(elems[i].nextSibling);
        addClass(elem,theclass);
    }
}
function getNextElement(node){
    if(node.nodeType == 1){
        return node;
    } 
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        element.className = element.className + " " + value;
    }
}
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
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
addLoadEvent(displayAbbreviations);
addLoadEvent(displayCitations);
addLoadEvent(displayAccesskeys);
//addLoadEvent(test);
addLoadEvent(highlightRows);
addLoadEvent(function(){
    styleElementSiblings("h1","h1_color");
})