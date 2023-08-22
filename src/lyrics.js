import { reactive } from 'vue';
import anime from 'animejs';

export const lyrics = reactive({
    // originLyricsArray: '',
    lyricsArray: '',
    lyricsArrayWithSelectedStatus: [],
    tlyricsArray: '',
    tlyricsArrayWithSelectedStatus: [],
    showedLyrics: '',
    title: '',
    artist: '',
    albumCover: '',
    albumMainColor: '',
    albumColorPlatte: '',
    searchAPIUrl: "https://api.taions.nonon.moe",
    hasGotLyrics: '',
    hasShownLyrics: '',
    changeSelectedStatus(isSelected) {
        isSelected.value = !isSelected.value;
    },
    changeLyricsStatus(hasGotLyrics) {
        hasGotLyrics.value = !hasGotLyrics.value;
    },
    getLyrics(id, isClicked) {
        let lyricsURL = `${this.searchAPIUrl}/lyric?id=${id}`;
        isClicked.value = !isClicked.value; // 更新传入的 ref

        fetch(lyricsURL, {
            method: "GET",
            // mode: "no-cors",
            credentials: 'include'
        }).then(
            (response) => {
                isClicked.value = !isClicked.value; // 更新传入的 ref
                return response.json()
            }
        ).then((lyricInfo) => {
            // 定义获取歌词和歌词翻译的方法
            const getLyricsOnly = () => {
                let lyrics = lyricInfo.lrc.lyric;
                const lyricLines = lyrics.match(/\[\d+:\d+\.\d+\]([^\n]+)/g);
                this.lyricsArray = lyricLines.map(line => {
                    const lyricContent = line.replace(/\[\d+:\d+\.\d+\]/, '').trim();
                    return lyricContent;
                });
                for (let i = 0; i < this.lyricsArray.length; i++) {
                    this.lyricsArrayWithSelectedStatus[i] = { text: this.lyricsArray[i], isSelected: false, index: 'n' + i }
                }
            }

            const getTLyricsOnly = () => {
                let tlyrics = lyricInfo.tlyric.lyric;
                const tlyricLines = tlyrics.match(/\[\d+:\d+\.\d+\]([^\n]+)/g);
                this.tlyricsArray = tlyricLines.map(line => {
                    const tlyricContent = line.replace(/\[\d+:\d+\.\d+\]/, '').trim();
                    return tlyricContent;
                });
                for (let i = 0; i < this.tlyricsArray.length; i++) {
                    this.tlyricsArrayWithSelectedStatus[i] = { text: this.tlyricsArray[i], isSelected: false, index: 't' + i }
                }
            }

            // 通过歌词JSON信息判断含有的歌词类型，并处理歌词
            if (lyricInfo.lrc.lyric === "") {
                alert("暂无歌词🫠")
            } else if (lyricInfo.qfy == false && lyricInfo.tlyric && lyricInfo.tlyric.lyric === "") {
                getLyricsOnly();
                // console.log(this.lyricsArray);
            } else if (lyricInfo.qfy == false && lyricInfo.tlyric && lyricInfo.tlyric.lyric != "") {
                getLyricsOnly();
                getTLyricsOnly();
                // console.log(this.lyricsArray);
                // console.log(this.tlyricsArray);
            } else {
                getLyricsOnly();
                // console.log(this.lyricsArray);
            }
        });
    }
});
