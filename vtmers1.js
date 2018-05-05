window.onload = function () {
    //获取所需元素
    var imgs_div = document.getElementById("imgs");
    var nav_div = document.getElementById("nav");
    var imgsUl = imgs_div.getElementsByTagName("ul")[0];
    var nav = nav_div.getElementsByTagName("ul")[0];
    var preous = document.getElementById("preous")
    var next = document.getElementById("next");
    var timer;
    var animTimer;
    var index = 1;
    var picWidth = imgs_div.offsetWidth;
    play();
    
    
    preous.onclick = function () {
        initImgs(index);
        index -= 1;
        if (index < 1) {
            index =3;
        }
        animate(picWidth);
        btnShow(index);

    }
    next.onclick = function () {
        initImgs(index);
        index += 1;
        if (index > 3) {
            index = 1;

        }
        animate(-picWidth);
        btnShow(index);

    }

    function animate(offset) {
        var newLeft = parseInt(imgsUl.offsetLeft) + offset;

        if (newLeft > 0) {
            donghua(-picWidth*3);

        } else if (newLeft < -picWidth * 3) {
            donghua(0);

        } else {
            donghua(newLeft);

        }


    }
    function donghua(offset) {
        clearInterval(animTimer);
        animTimer = setInterval(function () {
            imgsUl.style.left = imgsUl.offsetLeft + (offset - imgsUl.offsetLeft) / 10 + "px";
            if (imgsUl.offsetLeft - offset < 10 && imgsUl.offsetLeft - offset > -10) { 
                imgsUl.style.left = offset + "px";
                clearInterval(animTimer);
                play(); }
        }, 20);

    }
    function initImgs(cur_index) {
        clearInterval(timer);
        clearInterval(animTimer);
        var off = cur_index * picWidth;
        imgsUl.style.left = -off + "px";

    }
    function play() {
        timer = setInterval(function () {
            next.onclick(); }, 2000)

    }
    function btnShow(cur_index) {
        var list = nav.children;
        for (var i = 0; i < nav.children.length; i++) {
            nav.children[i].children[0].className = "hidden";
        }
        nav.children[cur_index - 1].children[0].className = "current";
    }
    for (var i = 0; i < nav.children.length; i++) {
        nav.children[i].index = i;
        var sd = nav.children[i].index;
        nav.children[i].onmouseover = function () {
            index = this.index + 1;
            initImgs(this.index + 1);
            btnShow(this.index + 1);
        }
        nav.children[i].onmouseout = function () {
            play();
         }
    }
}