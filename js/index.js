window.onload = function () {
    //关闭头部广告
    //关闭按钮
    var ad_close = document.querySelector(".J_adv_close__btn")
    //广告box
    var box_Adv = document.querySelector(".J_adv")
    ad_close.onclick = function () {
        box_Adv.style.opacity = 0
        setTimeout(dis_Adv, 500)
    }
    function dis_Adv() {
        box_Adv.style.height = "0px";
        // box_Adv.style.display = "none"
    }
    /* 导航条 hotword 文字切换效果 */
    var hotWord = document.querySelector(".hotWord")
    // console.log(hotWord)

    //切换数组
    var wordArr = ["清爽沐浴露", "满199减100", "脉动爽一夏", "家居清凉节", "家电嗨购日", "爱车服务月"]
    //索引
    var wordIndex = 0
    var hotWordchange = function () {
        wordIndex >= wordArr.length - 1 ? wordIndex = 0 : wordIndex++
        hotWord.innerText = wordArr[wordIndex]
    }
    //定时器
    var wordTime = setInterval(hotWordchange, 3000)

    //鼠标悬停时，停止计时器

    hotWord.onmouseover = function () {
        clearInterval(wordTime)
    }
    //离开时，重新启动
    hotWord.onmouseout = function () {
        clearInterval(wordTime)
        wordTime = setInterval(hotWordchange, 3000)
    }

    /* 轮播图效果 */
    var banner = document.querySelector(".banner")
    var list = document.querySelectorAll(".banner ul li")
    var points = document.querySelectorAll(".banner ol li")
    var prevBtn = document.querySelector(".banner .prevBtn")
    var nextBtn = document.querySelector(".banner .nextBtn")

    var index = 0

    var timer = null
    timer = setInterval(changeImg, 2000)
    //改变li的透明度和层级
    function changeZOpacity(x) {
        for (var i = 0; i <= list.length - 1; i++) {
            list[i].style.zIndex = 0
            list[i].style.opacity = 0
            list[i].style.transition = "all .5s"
        }
        list[x].style.zIndex = 1
        list[x].style.opacity = 1
        list[x].style.transition = "all .5s"
    }
    //切换图片函数
    function changeImg() {
        index >= list.length - 1 ? index = 0 : index++
        changeZOpacity(index)
        setPoints(index)
    }
    //小圆点
    function setPoints(index) {
        for (var i = 0; i <= points.length - 1; i++) {
            points[i].classList.remove('active')
        }
        points[index].classList.add('active')
    }
    //小圆点事件
    for (var i = 0; i < points.length; i++) {
        points[i].index = i
        points[i].onmouseover = function () {
            index = this.index
            changeZOpacity(index)
            setPoints(index)
        }
    }
    //鼠标悬停，停止定时器
    banner.onmouseover = function () {
        clearInterval(timer)
    }
    //鼠标离开，重启定时器
    banner.onmouseout = function () {
        clearInterval(timer)
        timer = setInterval(changeImg, 2000)
    }
    //轮播左边按钮
    prevBtn.onclick = function () {
        index <= 0 ? index = list.length - 1 : index--
        changeZOpacity(index)
        setPoints(index)
    }
    //轮播右边按钮
    nextBtn.onclick = function () {
        index >= list.length - 1 ? index = 0 : index++
        changeZOpacity(index)
        setPoints(index)
    }

    /* 京东秒杀*/
    var ulSlider = document.querySelector(".seckill-list")
    var btnPrev = document.querySelector(".seckill-btn__prev")
    var btnNext = document.querySelector(".seckill-btn__next")
    var liSlider = document.querySelectorAll(".seckill-list__item")
    //获取li宽度 每次显示4个
    var widthSlider = document.querySelector(".seckill-list__item").offsetWidth * 4
    var indexSlider = 0
    //滚动中不触发
    var scoll = false

    btnPrev.onclick = function () {
        if (scoll)
            return
        if (indexSlider == 0) {
            indexSlider = liSlider.length / 4 - 1
            ulSlider.style.left = - indexSlider * widthSlider + "px"
        }
        indexSlider--
        animationMove(ulSlider, -indexSlider * widthSlider) + "px"
    }
    btnNext.onclick = function () {
        if (scoll)
            return
        console.log("onclick", scoll)
        //尾部添加和头部相同,（设置回初始位置不会突兀）
        if (indexSlider == liSlider.length / 4 - 1) {
            indexSlider = 0
            ulSlider.style.left = 0 + "px"
        }
        indexSlider++
        animationMove(ulSlider, -indexSlider * widthSlider) + "px"
    }
    //滚动动画
    /**
     * obj:轮播对象
     * target：所需达到目标值
     */
    function animationMove(obj, target) {
        scoll = true
        clearInterval(obj.timer)
        obj.timer = setInterval(function () {
            var currentLeft = obj.offsetLeft//或者当前元素left值
            var isLeft = currentLeft > target ? true : false
            isLeft ? currentLeft -= 10 : currentLeft += 10
            if (currentLeft == target) {
                clearInterval(obj.timer)
                obj.style.left = target + "px"
                scoll = false
            } else {
                obj.style.left = currentLeft + "px"
            }
        }, 8)
    }
}
window.onscroll = function () {
    //滚动高度
    var top = document.documentElement.scrollTop
    var j_Elevator = document.querySelector(".J_elevator")

    if (top > 685) {
        j_Elevator.classList.add("J_elevator_fix")
    }
    else {
        j_Elevator.classList.remove("J_elevator_fix")
    }
}
