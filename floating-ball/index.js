var oBall = $('.ball');
var isdrag = false;
var NowLeft, disX, MoveL;
var NowTop, disY, MoveT;
var bodyW = $('body').width(); // 页面宽高
var bodyH = $('body').height();

var oBallImg = oBall.find('.ball-relative');
oBallImg.on('touchstart', thismousedown);
oBallImg.find('.ball-menu').on('touchmove', thismousemove);
oBallImg.on('touchend', thismouseup);

function thismousedown(e) {
    isdrag = true;
    NowLeft = parseInt(oBallImg.css('left') + 0); // 当前图标定位的位置
    NowTop = parseInt(oBallImg.css('top') + 0);
    disX = e.touches[0].pageX; // 当前点击位置
    disY = e.touches[0].pageY;
    e.preventDefault();

}

function thismousemove(e) {
    MoveL = NowLeft + e.touches[0].pageX - disX;
    MoveT = NowTop + e.touches[0].pageY - disY;
    if (isdrag) {
        oBall.find('.ball-absolute').fadeOut();
        // 判断左移至最左边
        if (e.touches[0].pageX <= oBallImg.width() / 2) {
            MoveL = 0;
        }
        // 判断右移至最右边
        if (e.touches[0].pageX + oBallImg.width() / 2 >= bodyW) {
            MoveL = bodyW - oBallImg.width();
        }
        // 判断上移至最上边
        if (e.touches[0].pageY <= oBallImg.height() / 2) {
            MoveT = 0;
        }
        // 判断下移至最下边
        if (e.touches[0].pageY + oBallImg.height() / 2 >= bodyH) {
            MoveT = bodyH - oBallImg.height();
        }
        oBallImg.css({
            'left': MoveL,
            'top': MoveT
        })
    }
    e.preventDefault();
}

function thismouseup(e) {
    isdrag = false;

    // 判断位置是否移动
    // oBallImg.css('left')，在手机上会精确到千分位
    if (parseInt(oBallImg.css('left')) == NowLeft && parseInt(oBallImg.css('top')) == NowTop) { // 未移动
        if (oBall.find('.ball-absolute').css('display') == 'block') {
            oBall.find('.ball-absolute').fadeOut();
            $(this).find('.ball-menu').attr('src', 'images/ball-menu.png');
        } else {
            $(this).find('.ball-menu').attr('src', 'images/ball-menu-click.png');
            oBall.find('.ball-absolute').fadeIn();
            // 2 悬浮球投影宽度，4 内容投影宽度，5悬浮球距离内容的距离
            var oBallContW = oBall.find('.ball-absolute').width(); // 内容宽高
            var oBallContH = oBall.find('.ball-absolute').height();
            var oBallImgContW = oBallContW - oBallImg.width(); // 悬浮球和内容的差

            // 判断左边距离
            if (NowLeft > oBallImgContW / 2 + 4) {
                oBall.find('.ball-absolute').css('left', -oBallImgContW / 2 + 6);
                oBall.find('.triangle-before,.triangle-after').css('right', 50)
            } else {
                oBall.find('.ball-absolute').css('left', -NowLeft + 14);
                oBall.find('.triangle-before,.triangle-after').css('right', 50 + 32 - NowLeft)
            }

            // 判断右边距离
            if (bodyW - NowLeft - oBallImg.width() < oBallImgContW) {
                oBall.find('.ball-absolute').css({
                    'left': 'auto',
                    'right': 4 + 10 - (bodyW - NowLeft - oBallImg.width())
                })
                oBall.find('.triangle-before,.triangle-after').css('right', (bodyW - NowLeft - oBallImg.width()) + 10)
            }
            // 判断下边距离
            if (bodyH - NowTop - oBallImg.height() - 4 <= oBallContH + 5) { // 内容在上面
                oBall.find('.ball-absolute').css('top', -oBallContH - 4); // 内容距离悬浮球距离
                oBall.find('.triangle').addClass('triangle-bottom').removeClass('triangle-top');
            } else {
                oBall.find('.ball-absolute').css('top', oBallImg.height());
                oBall.find('.triangle').addClass('triangle-top').removeClass('triangle-bottom');
            }

        }
    }
    e.stopPropagation();
}

oBall.find('.ball-absolute p').unbind().on('touchend', function (e) {
    $(this).addClass('ball-click-act').siblings().removeClass('ball-click-act');
})
$(document).unbind().on('touchend', function () {
    oBall.find('.ball-absolute').fadeOut();
    oBall.find('.ball-menu').attr('src', 'images/ball-menu.png');
})