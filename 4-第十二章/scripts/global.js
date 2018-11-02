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
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function moveElement(elementID,final_x,final_y,interval){
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
      return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos)/10);//向上取整
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top =  ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}
function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if(headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if(navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0; i<links.length; i++){
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl) != -1){//取得当前页面地址
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();//获取<a>中的文本 作为body的id 方便操作
            document.body.setAttribute("id",linktext);//当页面是Home时 bodyid就为home
        }
    }
}
function prepareSlideshow(){//页面一，指定动作
    var a = document.createElement("div");
    a.setAttribute("id", "slideshow");
    var b = document.createElement("img");
    b.setAttribute("id", "frame");
    b.setAttribute("src", "images/slideshow.gif");
    b.setAttribute("alt", "a introduce picture");
    a.appendChild(b);
    var c = document.getElementById("intro");
    if(!c) return false;
    //c.appendChild(a);
    insertAfter(a, c);
    var links = document.getElementsByTagName("a");
    for(var i = 0; i<links.length; i++){
        links[i].onmouseover = function(){
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1){
                moveElement("frame",0,0,10);
            }
            if(destination.indexOf("about.html") != -1){
                moveElement("frame",-150,0,10);
            }
            if(destination.indexOf("photos.html") != -1){
                moveElement("frame",-300,0,10);
            }
            if(destination.indexOf("live.html") != -1){
                moveElement("frame",-450,0,10);
            }
            if(destination.indexOf("contact.html") != -1){
                moveElement("frame",-600,0,10);
            }
        }
    }
}
function showSection(id){//页面二，显示当前页面的内容
    var sections = document.getElementsByTagName("section");
    for(var i=0; i<sections.length; i++){
        if(sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        }else{
            sections[i].style.display = "block";
        }
    }
}
function prepareInternalnav(){//页面二，确定用户点击的选项
    var articles = document.getElementsByTagName("article");
    if(articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    for(var i = 0; i<links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];//获得#后面的字符串
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}
function showPic(whichpic){
    if(!document.getElementById("placeholder")){
        return false;
    }
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if(placeholder.nodeName != "IMG"){
        return false;
    }
    placeholder.setAttribute("src",source);//等价于placeholder.src = source;
    if(document.getElementById("description")){
    var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
    var description = document.getElementById("description");
    if(description.firstChild.nodeType == 3){
         description.firstChild.nodeValue = text;
        }
    }
    return true;
}
function prepareGallery(){//页面三，给预览图片加上点击动作
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById("imagegallery")){
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i = 0; i<links.length; i++){
        links[i].onclick = function(){
            return showPic(this)?false:true;   
            }
    }
}
function preparePlaceholder(){//页面三，创建一个展示的图片框
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an images.");
    description.appendChild(desctext);
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for(var i=0; i<tables.length; i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for(var j=0; j<rows.length; j++){
            if(odd == true){
                addClass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }
    }
}
function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function(){
            this.className = this.oldClassName;
        }
    }
}
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        element.className = element.className + " " + value;
    }
}
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
    //document.body.appendChild(header);
    //document.body.appendChild(dl);
    var table = document.getElementsByTagName("table");
    insertAfter(header,table[0]);
    insertAfter(dl,header);
}
function focusLabels(){
    if(!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for(var i=0; i<labels.length; i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
            var id = this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();//选中这个框 焦点
        }
    }
}
function resetFields(whichform){//考虑到键盘用户使用TAB操作
    if(Modernizr.input.placeholder) return;
    for(var i=0; i<whichform.element.length; i++){
        var element = whichform.elements[i];
        if(element.nodeType == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder");
        if(!check) continue;
        element.onfocus = function(){//按TAB或者单击表单字段触发
            var text = this.placeholder || this.getAttribute("placeholder");
            if(this.value == text){
                this.className = "";
                this.value = "";
            }
        }
        element.onblur = function(){//焦点移出表单字段触发
            if(this.value == ""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}
function prepareForms(){
    for(var i=0; i<document.forms.length; i++){
        var thisForm = document.forms[i];
        resetFields(thisForm);
        thisForm.onsubmit = function(){
            if(!validateForm(this)) return false;
            /*var article = document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this, article)) return false;
            return true;*/
            return validateForm(this);
        }
    }
}
function isFilled(field){//在没有THML5的时候检查用户是否在文本框填入信息
    if(field.value.replace(" ","").length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}
function isEmail(field){//在没有THML5的时候粗略检查文本框填入信息是否为电子邮件
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function validateForm(whichform){
    for (var i=0; i<whichform.elements.length; i++){
        var element = whichform.elements[i];
        if(element.required == "required"){
            if(!isFilled(element)){
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if(element.type == "email"){
            if(!isEmail(element)){
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}
//Ajax  没实现回头看
/*function getHTTPObject(){
    if(typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function(){
            try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
             catch(e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
             catch(e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP");}
             catch(e){}
            return false;
        }
        return new XMLHttpRequest();
}
function displayAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","Loading...");
    element.appendChild(content);
}
function submitFormWithAjax(whichform, thetarget){
    var request = getHTTPObject();
    if(!request){return false;}
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for(var i=0; i<whichform.elements.length; i++){
        element = whichform.elements[i];
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        if(request.readyState == 4){
            if(request.status == 200 || request.status == 0){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }else{
                    thetarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>";
                }
            }else{
               thetarget.innerHTML = "<p>" + request.statusText + "</p>"; 
            }
        }
    } 
    request.send(data);
    return true;
}*/
addLoadEvent(prepareSlideshow);
addLoadEvent(highlightPage);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRows);
addLoadEvent(stripeTables);
//addLoadEvent(focusLabels);
addLoadEvent(prepareForms);