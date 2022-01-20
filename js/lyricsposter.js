
      function change2color(colStr){
            $(".bg-margin").attr("class","bg-margin");
            $(".bg-margin").addClass(colStr)
    }  
        $(".lyrics ul").click(function() {
            $(this).addClass('selected-lyrics'); },// 添加当前元素的样式
        $(".lyrics ul").click(function() {    
            if($(this).hasClass("selected-lyrics"))
                $(this).removeClass("selected-lyrics");
            else
                $(this).addClass("selected-lyrics");
        }));


    $(document).ready(function(){
          $("button").click(function(){
                $.ajax({
                      url: 'https://yuulyrics.vercel.app/lyric?id=399367218',
                      type: 'get',
                      dataType: 'json',
                      xhrFields: {withCredentials: true},
                      success: function(data){
                            var LyricsFormer = data.lrc.lyric.replace(/\[.*\]/g,"<li>");
                            var LyricsLatter = LyricsFormer.replace("\n","</li>");
                            document.getElementById('geci').innerHTML = LyricsLatter;
                      }
                })
          });
    });
