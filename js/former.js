$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})
function query() {
    $("#imgButton").attr("src", "https://oss.yuuiki.cn/2021/11/29/26c30d71b178cf5bc9f811c3085f50e5.gif")
    let timer = setTimeout(() => {
        console.log("(๑•̀ㅂ•́)و✧");
        $("#imgButton").attr("src", "https://oss.yuuiki.cn/2022/01/22/2f552f50f8f7de99af0842fe67110d73.png")
    }, 1000);
}
// function fontSizeUp() {
//     let lyricsSize = $(".g-lyrics-li").css("font-size");
//     let unit = lyricsSize.slice(-2);
//     let size = parseFloat(lyricsSize) + 5;
//     if (size > 45) {
//         return;
//     }
//     $(".g-lyrics-li").css("font-size", size + unit)
//     var gLyricsHeight = $(".g-lyrics").height();
//     var BottomBorderMargin = 340 - gLyricsHeight;
//     if ($(".g-lyrics-hidden").css("height") == "500px") {
//         $("#BottomBorder").css("margin-top", BottomBorderMargin);
//     };
// }
// function fontSizeLow() {
//     let lyricsSize = $(".g-lyrics-li").css("font-size");
//     let unit = lyricsSize.slice(-2);
//     let size = parseFloat(lyricsSize) - 5;
//     if (size < 30) {
//         return;
//     }
//     $(".g-lyrics-li").css("font-size", size + unit)
//     var gLyricsHeight = $(".g-lyrics").height();
//     var BottomBorderMargin = 340 - gLyricsHeight;
//     if ($(".g-lyrics-hidden").css("height") == "500px") {
//         $("#BottomBorder").css("margin-top", BottomBorderMargin);
//     };
// }
// 更换字体
function changeFontFamily() {
    if ($("#fontFamily").val() == "serif") {
        $(".g-lyrics li,.g-lyrics2 li").css("font-family", "NotoSerif")
    } else if ($("#fontFamily").val() == "MS-Mincho") {
        $(".g-lyrics li,.g-lyrics2 li").css("font-family", "jp")
    } else if ($("#fontFamily").val() == "sans-serif") {
        $(".g-lyrics li,.g-lyrics2 li").css("font-family", "sans-serif")
    } else if ($("#fontFamily").val() == "Amaru") {
        $(".g-lyrics li,.g-lyrics2 li").css("font-family", "Amaru")
    }
}
// function changGraphical(no) {
//     console.log(1);
//     if (no == 1) {
//         $(".g-bgimg-hidden").css("border", "0px none rgb(51, 51, 51)")
//     }
//     if (no == 2) {
//         console.log($(".g-bgimg-hidden").css("border-right"));
//         $(".g-bgimg-hidden").css("border-right")
//     }
//     $(".g-bgimg-hidden").css("border-right", "70px solid transparent;");

// }