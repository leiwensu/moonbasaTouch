//Created by leiwenxiu on 2017/2/15

 /*
 * @param {Object} ele   dialog元素
 * @param {Object} $this 触发当前事件的target
 */
function openPropertyActionSheet(ele,$this){
    var mask = $(ele).prev(".weui-mask"),
        weuiActionsheet = $(ele),
        cancel = $(ele).find(".weui-icon-cancel"),
        numAdd = $(ele).find(".cr_add_btn botton"),
        numSub = $(ele).find(".cr_sub_btn botton"),
        size = $(ele).find(".cr_size_list input"),
        color = $(ele).find(".cr_color_list input"),
        num = $(ele).find(".cr_num_text input").val();

    mask.removeClass("weui-mask--hidden");
    mask.addClass("weui-mask--visible");
    weuiActionsheet.removeClass("weui-actionsheet_hidden");
    weuiActionsheet.addClass("weui-actionsheet_toggle");
    mask.show()
        .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
        .addClass('weui_fade_toggle').one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
    });
    cancel.one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
    });
    mask.unbind('transitionend').unbind('webkitTransitionEnd');

    /*商品数量增减交互处理*/
    var number = $this.parent().prev(".weui-media-box__desc").find("input").val();
    changeAccount("#crAsAccount",number);
    /*尺码颜色选择控制*/
    size.each(function () {
        $(this).on('click',function () {
            if($(this).prop("checked")==true){
                $(".cr_size").html("\""+$(this).val()+"\"");
                $(this).parent().siblings('label').removeClass("active");
                $(this).parent().addClass("active");
            }
        })
    })
    color.each(function () {
        $(this).on('click',function () {
            if($(this).prop("checked")==true){
                $(".cr_color").html("\""+$(this).val()+"\"");
                $(this).parent().siblings('label').removeClass("active");
                $(this).parent().addClass("active");
            }
        })
    })

}
/**
 * 隐藏商品属性选择Actionsheet
 * @param {Object} weuiActionsheet  [[Actionsheet窗口]]
 * @param {[[Type]]} mask            [[遮罩层]]
 */
function hideActionSheet(weuiActionsheet, mask) {
    weuiActionsheet.removeClass('weui-actionsheet_toggle');
    mask.removeClass('weui-mask--visible');
    mask.on('transitionend', function () {
        mask.hide();
    }).on('webkitTransitionEnd', function () {
        mask.hide();
    });
    weuiActionsheet.find(".cr_add_btn").unbind();
    weuiActionsheet.find(".cr_sub_btn").unbind();
}

/**
 * 商品数量增减
 * @param {Object} element 增减button的parent对象
 * @param {Number} number  输入框当前值
 */
function changeAccount(element,number) {
    var addBtn = $(element).find(".cr_add_btn");
    var subBtn = $(element).find(".cr_sub_btn");
    var num = $(element).find(".cr_num_text input").val();
    if(number){
        $(element).find(".cr_num_text input").val(number);
    }
    if(num<=1){
        subBtn.addClass("disabled_btn");
    }
    addBtn.on('click',function () {
        num = $(element).find(".cr_num_text input").val();
        num++;
        if(num<=1){
            $(this).addClass("disabled_btn");
        }else{
            $(element).find(".cr_sub_btn").removeClass("disabled_btn");
        }
        $(element).find(".cr_num_text input").val(num);
    })
    subBtn.on('click',function () {
        num = $(element).find(".cr_num_text input").val();
        num--;
        if(num<2){
            $(this).addClass("disabled_btn");
        }
        if(num<1){
            return;
        }
        $(element).find(".cr_num_text input").val(num);

    })

}
