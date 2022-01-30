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
// 字体大小
function fontSizeUp() {
    let lyricsSize = $(".g-lyrics-li").css("font-size");
    let unit = lyricsSize.slice(-2);
    let size = parseFloat(lyricsSize) + 2;
    $(".g-lyrics-li").css("font-size", size + unit)
    //显示歌曲信息框&高度自适应
    var gLyricsHeight = parseFloat($(".g-lyrics").css("height"));
    var BottomBorderHeight = parseFloat($("#BottomBorder").css("height"));
    if (gLyricsHeight + BottomBorderHeight <= 440 && screen.width > 970) {
        let BottomBorderMargin = 340 - gLyricsHeight;
        $("#BottomBorder").css("margin-top", BottomBorderMargin);
    } else if (gLyricsHeight + BottomBorderHeight <= 290 && screen.width < 970) {
        let BottomBorderMargin = 190 - gLyricsHeight;
        $("#BottomBorder").css("margin-top", BottomBorderMargin);
    } else { $("#BottomBorder").css("margin-top", "0px"); }
    // 海报高度自适应
    $(".bg-margin").css("height", gLyricsHeight + BottomBorderHeight + 60);
    $(".g-lyrics-hidden").css("height", gLyricsHeight + BottomBorderHeight + 60);
    $(".g-bgimg-hidden").css("height", "100%");
    $(".g-bgimg").css("height", "100%");
}
function fontSizeLow() {
    let lyricsSize = $(".g-lyrics-li").css("font-size");
    let unit = lyricsSize.slice(-2);
    let size = parseFloat(lyricsSize) - 2;
    $(".g-lyrics-li").css("font-size", size + unit)
    //显示歌曲信息框&高度自适应
    var gLyricsHeight = parseFloat($(".g-lyrics").css("height"));
    var BottomBorderHeight = parseFloat($("#BottomBorder").css("height"));
    if (gLyricsHeight + BottomBorderHeight <= 440 && screen.width > 970) {
        let BottomBorderMargin = 340 - gLyricsHeight;
        $("#BottomBorder").css("margin-top", BottomBorderMargin);
    } else if (gLyricsHeight + BottomBorderHeight <= 290 && screen.width < 970) {
        let BottomBorderMargin = 190 - gLyricsHeight;
        $("#BottomBorder").css("margin-top", BottomBorderMargin);
    } else { $("#BottomBorder").css("margin-top", "0px"); }
    // 海报高度自适应
    $(".bg-margin").css("height", gLyricsHeight + BottomBorderHeight + 60);
    $(".g-lyrics-hidden").css("height", gLyricsHeight + BottomBorderHeight + 60);
    $(".g-bgimg-hidden").css("height", "100%");
    $(".g-bgimg").css("height", "100%");
}
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