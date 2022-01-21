      var info; // 声明歌曲信息
      var LyricsFormer; // 歌词处理1
      var LyricsLatter; // 歌词处理2(结果)
      var albumimg;
      var smallsize;
      var sourceImage;
      var colorThief;
      var color;
      $("img,p").click(function(){
            // 获取歌词
            $.ajax({
                    url: 'https://yuulyrics.vercel.app/lyric?id=825646',
                    type: 'get',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    success: function(data){
                        // 导入歌词文本
                        LyricsFormer = data.lrc.lyric.replace(/\[.*\]/g,"<li>");
                        LyricsLatter = LyricsFormer.replace("\n","</li>");
                        document.getElementById('geci').innerHTML = LyricsLatter;
                        // 歌词选中效果
                        $(".lyrics li").click(function() {
                            if($(this).hasClass("selected-lyrics"))
                                $(this).removeClass("selected-lyrics");
                            else
                                $(this).addClass("selected-lyrics");
                        });
                    }
            })
            // 获取歌曲信息
            $.ajax({
                    url: 'https://yuulyrics.vercel.app/song/detail?ids=825646',
                    type: 'get',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    success: function(data){
                            info = data
                            // 修改背景图片
                            albumimg = info.songs[0].al.picUrl;
                            smallsize = albumimg + '?param=500y500'; // api调整图片大小
                            $("#s-bgimg").attr("src",smallsize);
                            $(".g-bgimg").css("background-image","url("+smallsize+")");
                    }
                })
        });
    $(".quote").click(function(){
        // 将选中歌词移动至生成区域
        $($(".selected-lyrics").toArray().reverse()).each(function(index,data){
            $(data).removeClass("selected-lyrics").addClass("g-lyrics-li")
            $(".g-lyrics ul").prepend(data)
        });
        // 重新导入歌词文本(避免了被移动到右边后，左边消失)
        $("#geci").html(LyricsLatter)
        // 生成海报的歌曲名及艺术家
        $(".title").html("《"+info.songs[0].name+"》");
        $(".creator").html("—"+info.songs[0].ar[0].name);
        // 颜色
        sourceImage = document.getElementById("s-bgimg");
        colorThief = new ColorThief();
        color = colorThief.getPalette(sourceImage,5);
        $(".bg-margin").css("background-color","rgb("+color[0]+")");
        $(".color1").css("background","rgb("+color[0]+")");
        $(".color2").css("background","rgb("+color[1]+")");
        $(".color3").css("background","rgb("+color[2]+")");
    });
    // 切换颜色
    $(".color1").click(function(){
        $(".bg-margin").css("background-color","rgb("+color[0]+")")
    })
    $(".color2").click(function(){
        $(".bg-margin").css("background-color","rgb("+color[1]+")")
    })
    $(".color3").click(function(){
        $(".bg-margin").css("background-color","rgb("+color[2]+")")
    })