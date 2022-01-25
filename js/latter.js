var LyricsFormer; // 歌词处理1
var LyricsLatter; // 歌词处理2(结果)
var albumimg; //专辑封面
var sourceImage; //获取封面主色
var colorThief;
var color;
var songinfo = new Array(6);
var songid = new Array(6);
var songList;
var lyricLi;
function getinfo() {
      $(".bg-margin").css("background-color", "rgba(73, 73, 73, 0.2)")
      $(".songs").remove();
      $(".meting").remove()
      $("#BottomBorder").css("display", "none");
      $(".result").fadeOut("3000ms");
      $(".result").fadeIn("3000ms");
      $("#s-bgimg").fadeOut("slow");
      $(".g-bgimg").fadeOut("slow");
      $(".lyrics ul").fadeOut("slow");
      $(".title").fadeOut("slow");
      $(".creator").fadeOut("slow");
      $(".g-lyrics ul").fadeOut("slow")
      // 搜索关键词获取搜索结果及id
      if ($("#search-form").val() == null || $("#search-form").val() == "") {
            return;
      }
      $.ajax({
            url: "https://yuulyrics.vercel.app/search?keywords=" + $("#search-form").val() + "&limit=5",
            type: "post",
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (data) {
                  songList = data.result.songs;
                  for (let i = 0; i < 5; i++) {
                        songid[i] = songList[i].id,
                              songinfo[i] = songList[i]
                  };
            }
      }).then(function () {
            // 获取歌曲信息
            for (let i = 0; i < 5; i++) {
                  $.ajax({
                        url: "https://yuulyrics.vercel.app/song/detail?ids=" + songid[i],
                        type: 'post',
                        dataType: 'json',
                        xhrFields: { withCredentials: true },
                        success: function (data) {
                              songinfo[i].album.picUrl = data.songs[0].al.picUrl
                        }
                  }).then(function () { //显示结果
                        $div = `<div class="songs container-fluid row">` +
                              "<img src=" + songinfo[i].album.picUrl + `?param=500y500 alt="" class="img-circle" title="获取歌词" onclick="getansLyrics(${songid[i]})" name="${songinfo[i].name}" artist="${songinfo[i].artists[0].name}">` +
                              `<p class="col-xs-8 text-center" tiltle="获取歌词" style="" onclick="getLyrics(${songinfo[i].id})">${songinfo[i].name}<br>${songinfo[i].artists[0].name}</p>
                                </div>`
                        $(".result").append($div)
                        $(".songs").fadeIn("3000ms")
                  })
            }
      }).then(function () {
      })
};
function getansLyrics(id) {
      // 获取歌词和封面
      $(".meting").remove()
      $.ajax({
            url: 'https://yuulyrics.vercel.app/lyric?id=' + id,
            type: 'post',
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function (data) {
                  let regExp = new RegExp(".*</li>", "g");
                  let tlyric = "<li>" + data.tlyric.lyric.replace(/\[.*\]/g, "");
                  lyricLi = tlyric.replaceAll("\n", "</li><li>").match(regExp);
                  $("#geci").html(lyricLi)
                  $(".lyrics ul").fadeIn("slow")
                  // 获取音乐
                  $("body").append(`<meting-js class="meting" server="netease" type="song" fixed="true" id="` + id + `""></meting-js>`)
                  // 获取背景图片
                  albumimg = $("[onclick*='" + id + "']").attr("src")
                  $("#s-bgimg").attr("src", albumimg);
                  $(".g-bgimg").css("background-image", "url(" + albumimg + ")");
                  $("#s-bgimg").fadeIn("slow");
                  $(".g-bgimg").fadeIn("slow");
                  $("#imgBottom").attr("src", albumimg);
                  // 歌曲名及艺术家
                  title = $("[onclick*='" + id + "']").attr("name")
                  artist = $("[onclick*='" + id + "']").attr("artist")
                  $("#songTitle").html(title);
                  $("#singer").html(artist);
                  // 歌词选中效果
                  $(".lyrics li").click(function () {
                        if ($(this).hasClass("selected-lyrics"))
                              $(this).removeClass("selected-lyrics");
                        else
                              $(this).addClass("selected-lyrics");
                  });
            }
      })
}
function getLyrics(id) {
      // 获取歌词和封面
      $(".meting").remove()
      $.ajax({
            url: 'https://yuulyrics.vercel.app/lyric?id=' + id,
            type: 'post',
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function (data) {
                  let regExp = new RegExp(".*</li>", "g");
                  let lyric = "<li>" + data.lrc.lyric.replace(/\[.*\]/g, "");
                  lyricLi = lyric.replaceAll("\n", "</li><li>").match(regExp);
                  $("#geci").html(lyricLi)
                  $(".lyrics ul").fadeIn("slow")
                  // 获取音乐
                  $("body").append(`<meting-js class="meting" server="netease" type="song" fixed="true" id="` + id + `""></meting-js>`)
                  // 获取背景图片
                  albumimg = $("[onclick*='" + id + "']").attr("src")
                  $("#s-bgimg").attr("src", albumimg);
                  $(".g-bgimg").css("background-image", "url(" + albumimg + ")");
                  $("#s-bgimg").fadeIn("slow");
                  $(".g-bgimg").fadeIn("slow");
                  $("#imgBottom").attr("src", albumimg);
                  // 歌曲名及艺术家
                  title = $("[onclick*='" + id + "']").attr("name")
                  artist = $("[onclick*='" + id + "']").attr("artist")
                  $("#songTitle").html(title);
                  $("#singer").html(artist);
                  // 歌词选中效果
                  $(".lyrics li").click(function () {
                        if ($(this).hasClass("selected-lyrics"))
                              $(this).removeClass("selected-lyrics");
                        else
                              $(this).addClass("selected-lyrics");
                  });
            }
      })
}
$(".quote").click(function () {
      //隐藏APlayer歌词
      $('.aplayer-lrc').addClass('aplayer-lrc-hide')
      // 清空海报中歌词
      $(".g-lyrics-li").remove();
      // 由于歌词选中效果this的影响，歌词选中效果的click函数不会失效。
      // 添加下面函数让海报区域的歌词也有选中-取消选中的效果
      $(".g-lyrics-li").click(function () {
            $(this).removeClass("selected-lyrics");
      });
      // 调整选中的歌词顺序，添加到海报区域
      $($(".selected-lyrics").toArray().reverse()).each(function (index, data) {
            $(data).removeClass("selected-lyrics").addClass("g-lyrics-li")
            $(".g-lyrics ul").prepend(data)
            $(".g-lyrics ul").fadeIn("slow")
      });
      // console.log($(".g-lyrics-hidden").css("height"))
      //显示歌曲信息框
      $("#BottomBorder").css("display", "block");
      var gLyricsHeight = $(".g-lyrics").height();
      if ($(".g-lyrics-hidden").css("height") == "500px") {
            let BottomBorderMargin = 340 - gLyricsHeight;
            $("#BottomBorder").css("margin-top", BottomBorderMargin);
      };
      if ($(".g-lyrics-hidden").css("height") == "350px") {
            let BottomBorderMargin = 190 - gLyricsHeight;
            $("#BottomBorder").css("margin-top", BottomBorderMargin);
      };
      // $("#imgBottom").css("width", $("#imgBottom").css("height"));
      // 重新导入歌词文本(避免了被移动到右边后，左边消失)
      $("#geci").html(lyricLi);
      // 获取专辑封面主颜色
      sourceImage = document.getElementById("s-bgimg");
      colorThief = new ColorThief();
      color = colorThief.getPalette(sourceImage, 5);
      $(".bg-margin").css("background-color", "rgb(" + color[0] + ")");
      $("#BottomBorder").css("background", "rgba(" + color[1] + " ,0.3)")
      $(".color1").css("background", "rgb(" + color[0] + ")");
      $(".color2").css("background", "rgb(" + color[1] + ")");
      $(".color3").css("background", "rgb(" + color[2] + ")");
      // 再次添加选中歌词函数，让用户可以重新选择歌词
      $(".lyrics li").click(function () {
            if ($(this).hasClass("selected-lyrics"))
                  $(this).removeClass("selected-lyrics");
            else
                  $(this).addClass("selected-lyrics");
      });
      // 海报高度自适应
      $(".bg-margin").css("height", $(".g-lyrics-hidden").css("height"));
      // console.log($(".g-lyrics-hidden").css("height"))
      $(".g-bgimg-hidden").css("height", "100%");
      $(".g-bgimg").css("height", "100%");
});
// 切换颜色
function changeBackroundColor(id) {
      $(".bg-margin").css("background-color", "rgb(" + color[id] + ")");
      $("#BottomBorder").css("background", "rgba(" + color[(id + 1) % 3] + " ,0.3)")
}
// 更改背景图片模糊
function changeblur() {
      blurvalue = $("#blur").val();
      $(".g-bgimg").css("filter", "blur(" + blurvalue + "px)")
}
// 更改背景图片透明度
function changeopacity() {
      opacityvalue = $("#opacity").val();
      $(".g-bgimg").css("opacity", opacityvalue)
}
//自定义背景图片
const gbgimg = document.getElementsByClassName('g-bgimg');
const file = document.getElementById('file');
const reader = new FileReader();
reader.addEventListener("load", function () {
      $(".g-bgimg").css("background-image", `url(${reader.result})`)
}, false);
file.addEventListener('change', function () {
      const image = this.files[0];
      if (image) reader.readAsDataURL(image);
}, false);
// 绑定点击事件以替换input file样式
$("#uploadimg").click(function () {
      $("#file").click();
});
// 自定义字体颜色
$(".colorPickerbtn").click(function () {
      $("#colorPicker").click()
});
colorPicker.addEventListener("input", glyrics, false);
colorPicker.addEventListener("change", watchColorPicker, false);
function watchColorPicker(event) {
      document.querySelectorAll("#glyrics").forEach(function (p) {
            p.style.color = event.target.value;
      });
}
// 保存图片
var save = document.getElementById('gPoster')
function screenshot() {
      // Generate screenshot and download
      html2canvas(save, { useCORS: true, allowTaint: true }).then(function (canvas) {
            // Export canvas as a blob 
            canvas.toBlob(function (blob) {
                  // Generate file download
                  window.saveAs(blob, Date().slice(0, 21) + ".png");
            });
      });
}
// 更换广告内容
function changeAd() {
      $('#tag').html('<i class="fas fa-heart"></i>')
      $("#tag").css("color", "rgb(243, 103, 126)")
      $('#picshot i').animate({ 'font-size': '2.5rem' }, 'fast')
      $('#picshot i').animate({ 'font-size': '2rem' }, 'fast')
      $('#tag').animate({ 'font-size': '1.7rem' }, 'fast')
      $('#tag').animate({ 'font-size': '1.5rem' }, 'fast')
}