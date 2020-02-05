var xhr = new XMLHttpRequest();
xhr.open("get","jsonData.txt",false);
var data = null;
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
}
xhr.send(null)

//动态数据绑定
var ulist = document.getElementById("list");
var listImg = ulist.getElementsByTagName("img");
!function(){
    var str = '';
    if(data){
        for(var i = 0; i < data.length; i++){
            var curData = data[i];
            str += '<li>';
            str += '<div><img src="" trueImg="'+ curData["img"] +'"></div>';
            str += '<div class="content">';
            str += '<h2>'+ curData["title"] +'</h2>';
            str += '<p>'+ curData["desc"] +'</p>';
            str += '</div>';
            str += '</li>';
        }
    }
    ulist.innerHTML = str;
}()

//图片延迟加载
function lazyImg(curImg){
    var img = new Image;
    img.src = curImg.getAttribute("trueImg");
    img.onload = function(){
        curImg.src = this.src;
        curImg.style.display = "block";
        img = null;
    }
    curImg.isLoad = true;
}

//多张图片延迟加载
function handleAllImg(){
    for(var i = 0; i < listImg.length; i++){
        var curImg = listImg[i];
        if(curImg.isLoad){ //当前图片处理过直接跳过处理后面的
            continue;
        }
        //当前图片隐藏状态只能通过父节点获取到图片高度
        var curImgHeight = curImg.parentNode.offsetHeight;
        var a = curImgHeight + offset(curImg.parentNode).top;
        var b = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);
        if(a < b){
            lazyImg(curImg);
            fadeIn(curImg);
        }
    }
}

//页面打开首屏和滚动条滚动的时候图片加载
window.setTimeout(handleAllImg,500);
window.onscroll = handleAllImg;

//图片渐显效果
function fadeIn(c){
    var interval = 10; 
    var duration = 500;
    var target = 1;
    var step = target/duration * interval;
    var timer = window.setInterval(function(){
        var curOpacity = window.getComputedStyle(c,null).opacity - 0;
        if(curOpacity >= 1){
            c.style.opacity = 1;
            clearInterval(timer);
            return;
        }
        curOpacity += step;
        c.style.opacity = curOpacity;
    },interval)
}

function offset(curEle){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent;
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;
    // 只要没找到 body，我们就把父级参照物的边框和偏移量也进行累加
    while(par){
        // 累加父级参照物的边框
        if(navigator.userAgent.indexOf("MISE 8.0") ===  -1){  // 兼容ie8
            totalLeft += par.clientLeft;
            totalTop += par.clientTop;
        }
        // 累加父级参照物本身的偏移量
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop;
        par = par.offsetParent;
    }
    return {left: totalLeft, top: totalTop}
}