<script setup>
import { ref, watch, toRefs, onMounted, nextTick } from 'vue';
import SongResult from './SongResult.vue';
import { lyrics } from './lyrics.js';
import CreatePoster from './createPoster.vue'
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';
import anime from 'animejs';

const logoHasTopMargin = ref(false);
const searchInput = ref('');
const isMove = ref(false);
const isTransparent = ref(-1);
const showResults = ref(false);
const searchResultsLoading = ref(false);
const searchAPIUrl = "https://api.taions.nonon.moe";
const lyricsAsRefs = toRefs(lyrics);
const hasGotLyrics = ref(false);
const colorThief = new ColorThief();
const albumCover = new Image();
const isLogoClicked = ref(false);

let songsList = ref([]);
let songsListNew = ref([]);
let songsID = ref([]);

function searchSongs(keywords) {
    logoBounceLoop(2000, 2);
    let keywordSearch = `${searchAPIUrl}/search?keywords=${keywords}&limit=10`;
    showResults.value = true
    searchResultsLoading.value = true
    songsListNew.value = []
    fetch(keywordSearch, {
        method: "GET",
        // mode: "no-cors",
        credentials: 'include'
    })
        .then((response) => {
            return response.json();
        }
        )
        .then((songs) => {
            songsList.value = songs.result.songs;
            for (let i = 0; i < songsList.value.length; i++) {
                songsID.value[i] = songsList.value[i].id;
            }
            return songsID
        })
        .then((songsID) => {
            const songsDetailPromises = songsID.value.map(async (id) => {
                let songDetailURL = `${searchAPIUrl}/song/detail?ids=${id}`;
                const response = await fetch(songDetailURL, {
                    method: 'POST',
                    mode: 'cors',
                });
                return await response.json();
            });
            return Promise.all(songsDetailPromises);
        })
        .then((songsDetail) => {
            searchResultsLoading.value = false;
            for (let i = 0; i < songsDetail.length; i++) {
                songsList.value[i].albumCover = songsDetail[i].songs[0].al.picUrl;
            }
            // 因为 songList 在第二个then就被提前赋值了，会导致v-for在未获得专辑图片时提前渲染。所以在全部数据获取完成后使用 songListNew 来实现最终的渲染。
            songsListNew.value = songsList.value;
        })
}

function addLogoTopMargin() {
    const appElement = document.getElementById('app');
    const appHeight = appElement.offsetHeight;
    if (appHeight > window.innerHeight) {
        logoHasTopMargin.value = true;
    }
}

watch(lyricsAsRefs.lyricsArray, () => {
    lyrics.showedLyrics = lyrics.lyricsArrayWithSelectedStatus;
    lyrics.changeLyricsStatus(hasGotLyrics);
    lyrics.hasGotLyrics = hasGotLyrics; // 这个赋值是为了将App.vue中的hasGotLyrics值传递到CreatPoster.vue中的hasGotLyrics。
    setTimeout(() => {
        lyrics.hasShownLyrics = lyrics.hasGotLyrics;
    }, 4000)
});

watch(lyricsAsRefs.albumCover, () => {
    albumCover.crossOrigin = 'Anonymous';
    albumCover.src = lyrics.albumCover;

    albumCover.addEventListener('load', function () {
        lyricsAsRefs.albumMainColor.value = `rgb(${colorThief.getColor(albumCover, 5)[0]},${colorThief.getColor(albumCover, 5)[1]},${colorThief.getColor(albumCover, 5)[2]})`;
        lyricsAsRefs.albumColorPlatte.value = colorThief.getPalette(albumCover, 5); // 这个5和上面一行的5不是一个意思。详情看color thief文档。
    })
})

onMounted(() => {
    var animeBegin = anime.timeline({
        easing: 'easeInOutSine',
    });

    animeBegin.add({
        targets: '.line-drawing path',
        duration: 2000,
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: function (el, i) { return i * 300 },
    }).add({
        targets: '.line-drawing path',
        fill: {
            value: '#a0b3f7',
            duration: 1000,
            delay: function (el, i) { return i * 200 },
        },
        'stroke-width': {
            value: '4px',
            duration: 1000,
            delay: function (el, i) { return + i * 200 },
        },
    })
})



function logoBouncePlay() {
    const logoBounce = anime({
        targets: '.line-drawing path',
        translateY: 20,
        duration: 2000,
        delay: function (el, i) { return i * 200; },
        direction: 'alternate',
        autoplay: false,
    })
    logoBounce.play()
}

function logoBounceLoop(duration, loopTime) {
    const logoBounce = anime({
        targets: '.line-drawing path',
        translateY: 20,
        duration: duration,
        delay: function (el, i) { return i * 200; },
        direction: 'alternate',
        autoplay: false,
        loop: loopTime
    })
    logoBounce.play()
}

</script>

<template>
    <header class="flex flex-col items-center h-full">
        <div class="logo line-drawing m-2 relative -top-16"
            @click="isMove = !isMove, isTransparent = -isTransparent, isLogoClicked = !isLogoClicked, logoBounceLoop(1000, 2)"
            :class="{ 'w-1/2': isLogoClicked, 'w-full': !isLogoClicked, 'clicked-logo': isLogoClicked }">
            <svg id="logo-svg" data-name="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 596 192">
                <g>
                    <path class="cls-2"
                        d="M55.73,158.89c-1.74-1.85-2.61-4.41-2.61-7.66V56.05H25.09c-2.81,0-5.01-.78-6.61-2.35-1.6-1.57-2.4-3.74-2.4-6.52s.77-5.13,2.32-6.7c1.55-1.57,3.78-2.35,6.68-2.35H100.46c2.9,0,5.13,.78,6.68,2.35,1.55,1.57,2.32,3.8,2.32,6.7s-.8,4.96-2.4,6.52c-1.6,1.57-3.8,2.35-6.61,2.35h-28.03v95.18c0,3.13-.9,5.66-2.69,7.57-1.79,1.91-4.14,2.87-7.04,2.87s-5.23-.93-6.97-2.78Z" />
                    <path class="cls-2"
                        d="M115.27,158.71c-1.74-1.85-2.61-4.41-2.61-7.66v-60.9c0-16.82,4.02-29.99,12.05-39.5,8.03-9.51,19.22-14.27,33.55-14.27,9.39,0,17.52,2.15,24.4,6.44,6.87,4.29,12.13,10.5,15.76,18.62,3.63,8.12,5.45,17.69,5.45,28.71v60.9c0,3.25-.87,5.8-2.61,7.66-1.74,1.85-4.07,2.78-6.97,2.78s-5.25-.96-7.04-2.87c-1.79-1.91-2.69-4.44-2.69-7.57v-28.36h-52.57v28.36c0,3.13-.9,5.66-2.69,7.57-1.79,1.91-4.14,2.87-7.04,2.87s-5.23-.93-6.97-2.78Zm69.27-53.94v-15.14c0-11.6-2.2-20.33-6.61-26.19-4.41-5.86-10.96-8.79-19.68-8.79-17.52,0-26.29,11.66-26.29,34.97v15.14h52.57Z" />
                    <path class="cls-2"
                        d="M221.21,58.58c-2.18-2.38-3.27-5.48-3.27-9.31s1.09-6.93,3.27-9.31c2.18-2.38,5.06-3.57,8.64-3.57s6.51,1.19,8.79,3.57c2.27,2.38,3.41,5.48,3.41,9.31s-1.14,6.93-3.41,9.31c-2.28,2.38-5.21,3.57-8.79,3.57s-6.46-1.19-8.64-3.57Zm1.81,100.31c-1.65-1.85-2.47-4.41-2.47-7.66V83.37c0-3.25,.82-5.8,2.47-7.66,1.65-1.85,3.97-2.78,6.97-2.78s5.23,.93,6.97,2.78c1.74,1.86,2.61,4.41,2.61,7.66v67.86c0,3.25-.87,5.8-2.61,7.66s-4.07,2.78-6.97,2.78-5.33-.93-6.97-2.78Z" />
                    <path class="cls-2"
                        d="M280.46,153.76c-8.18-5.28-14.4-12.64-18.66-22.1-4.26-9.45-6.39-20.33-6.39-32.62s2.13-23.17,6.39-32.62c4.26-9.45,10.48-16.82,18.66-22.1,8.18-5.28,17.93-7.92,29.26-7.92s21.08,2.64,29.26,7.92c8.18,5.28,14.4,12.65,18.66,22.1,4.26,9.46,6.39,20.33,6.39,32.62s-2.13,23.17-6.39,32.62c-4.26,9.46-10.48,16.82-18.66,22.1-8.18,5.28-17.93,7.92-29.26,7.92s-21.08-2.64-29.26-7.92Zm54.97-22.27c6.1-7.94,9.15-18.76,9.15-32.45s-3.17-24.65-9.51-32.54c-6.34-7.89-15.27-11.83-26.79-11.83-10.55,0-18.76,4.03-24.61,12.09-5.86,8.06-8.79,18.82-8.79,32.28s3.05,24.51,9.15,32.45c6.1,7.95,14.67,11.92,25.7,11.92s19.6-3.97,25.7-11.92Z" />
                    <path class="cls-2"
                        d="M377.1,158.89c-1.74-1.85-2.61-4.41-2.61-7.66V85.63c0-15.43,4.02-27.49,12.05-36.19,8.04-8.7,19.17-13.05,33.4-13.05s25.36,4.35,33.4,13.05c8.03,8.7,12.05,20.77,12.05,36.19v65.6c0,3.25-.87,5.8-2.61,7.66-1.74,1.85-4.07,2.78-6.97,2.78s-5.25-.96-7.04-2.87c-1.79-1.91-2.69-4.44-2.69-7.57V85.11c0-9.86-2.23-17.4-6.68-22.62-4.45-5.22-10.94-7.83-19.46-7.83s-15.01,2.61-19.46,7.83c-4.45,5.22-6.68,12.76-6.68,22.62v66.12c0,3.13-.9,5.66-2.69,7.57-1.79,1.91-4.14,2.87-7.04,2.87s-5.23-.93-6.97-2.78Z" />
                    <path class="cls-2"
                        d="M503.3,156.02c-8.33-3.77-15.54-9.19-21.64-16.27-1.45-1.74-2.18-3.71-2.18-5.92,0-2.55,.97-4.99,2.91-7.31,1.55-1.85,3.24-2.78,5.08-2.78,1.94,0,4.26,1.33,6.97,4,4.55,4.99,9.95,8.85,16.19,11.57,6.24,2.73,12.71,4.09,19.39,4.09s11.38-1.3,14.96-3.92c3.58-2.61,5.37-6.29,5.37-11.05s-1.94-9.02-5.81-12.09c-3.87-3.07-10.46-5.83-19.75-8.26-14.62-3.83-25.25-8.87-31.88-15.14-6.63-6.26-9.95-14.32-9.95-24.19,0-6.26,1.74-11.86,5.23-16.79,3.49-4.93,8.35-8.76,14.59-11.48,6.24-2.72,13.38-4.09,21.42-4.09,9,0,17.01,1.77,24.03,5.31,7.02,3.54,12.37,8.5,16.05,14.88,1.26,2.44,1.89,4.52,1.89,6.26-.1,2.9-1.31,5.39-3.63,7.48-1.26,1.04-2.71,1.57-4.36,1.57-3,0-5.47-1.39-7.41-4.18-2.81-4.06-6.56-7.25-11.25-9.57-4.7-2.32-9.8-3.48-15.32-3.48-6.88,0-12.22,1.25-16.05,3.74-3.83,2.5-5.74,5.95-5.74,10.35s1.86,8.03,5.59,10.88c3.73,2.84,10.19,5.54,19.39,8.09,10.17,2.9,18.35,6.18,24.54,9.83,6.19,3.65,10.72,7.98,13.58,12.96,2.85,4.99,4.28,10.96,4.28,17.92s-1.65,12.44-4.94,17.49c-3.29,5.05-7.94,8.93-13.94,11.66-6,2.72-12.97,4.09-20.91,4.09-9.49,0-18.4-1.88-26.72-5.66Z" />
                </g>
                <rect class="cls-1" width="600" height="200" />
            </svg>
        </div>
        <input type="text" name="searchbar"
            class="searchbox relative -top-16 text-center self-center p-3 border-solid border-2 rounded-full m-2 text-xl focus:border-blue-300"
            placeholder="Search Songs..." v-model="searchInput" @keydown.enter="searchSongs(searchInput)"
            :class="{ searchboxShow: isMove }" :style="{ opacity: isTransparent - 0.3 }">
    </header>
    <main class="searchResults relative -top-16 sm:w-10/12 md:w-3/5" :class="{ showResults: showResults, searchResultsLoading: searchResultsLoading }">
        <TransitionGroup name="searchResults" @after-enter="addLogoTopMargin()">
            <SongResult v-for="song in songsListNew" :title="song.name" :artist="song.artists[0].name"
                :album-cover="song.albumCover" :key="song.id" :id="song.id" />
        </TransitionGroup>
    </main>
    <main class="posterCreator" :class="{ toPosterCreator: hasGotLyrics }"
        :style="{ backgroundColor: lyricsAsRefs.albumMainColor.value }">
        <CreatePoster />
    </main>
</template>

<style scoped>
.cls-1 {
    fill: none;
}

.cls-2 {
    fill: #a0b3f700;
    stroke: #dde1f4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1px;
}

.searchResults-enter-active,
.searchResults-leave-active {
    transition: all 1s ease;
}

.searchResults-enter-from,
.searchResults-leave-to {
    opacity: 0;
    transform: translateY(-120px);
}

.posterCreator {
    position: fixed;
    top: 0;
    left: 100vw;
    width: 100%;
    height: 100%;
    /* background-color: rgb(255, 255, 255); */
    transition: all 1.5s ease;
}

.toPosterCreator {
    left: 0;
}

.logo {
    user-select: none;
    transition: all 1s ease;
    cursor: pointer;
}

.clicked-logo {
    pointer-events: none;
}

.searchbox {
    outline: 0;
    transition: border-color 0.3s ease, width 1s ease, opacity 1s ease;
    display: block;
    width: 0;
    background-color: rgba(239, 240, 241, 0.709);
    backdrop-filter: blur(20px);
    color: rgb(3, 23, 48)
}

.searchbox::placeholder {
    opacity: 0.3;
    font-style: italic;
}

.logoTranslateY {
    transform: translateY(-2.8rem);
    pointer-events: none;
}

.searchboxShow {
    width: 60%;
}

.searchResults {
    border-color: rgb(112, 137, 184);
    border-width: 1px;
    border-radius: 10px;
    opacity: 0;
    min-height: 0;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: scroll;
    scrollbar-width: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px 10px;
    padding: 10px;
    background-color: rgba(215, 224, 227, 0.282);
    backdrop-filter: blur(10px);
    transition: all 1s ease;
}

.searchResults::-webkit-scrollbar {
    display: none;
}

.showResults {
    opacity: 1;
    min-height: 80%;
}

.searchResultsLoading {
    animation: backgroun-color 2s linear infinite;
    /* max-height: 200px; */
}

@keyframes backgroun-color {
    0% {
        background-color: rgba(175, 202, 225, 0);
    }

    50% {
        background-color: rgba(252, 211, 145, 0.419)
    }

    100% {
        background-color: rgba(175, 202, 225, 0)
    }
}
</style>
