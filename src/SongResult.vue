<script setup>
import { ref } from 'vue';
import { lyrics } from './lyrics.js';

defineProps(['title', 'artist', 'albumCover', 'id']);
const isClicked = ref(false);


const handleClick = (id,title,artist) => {
    lyrics.getLyrics(id, isClicked);
    lyrics.title = title;
    lyrics.artist = artist;
};

</script>

<template>
    <div class="songResult" @click="lyrics.albumCover = albumCover, handleClick(id,title, artist)" :class="{ clicked: isClicked }">
        <div class="albumCover" :style="{ backgroundImage: `url('${albumCover}')` }"></div>
        <div class="songTitle">
            <p>{{ title }}</p>
            <p>{{ artist }}</p>
        </div>
    </div>
</template>

<style scoped>
.clicked {
    background-color: rgba(175, 175, 255, 0.449);
    background-size: 200%;
    animation: clickedAnime 1s linear infinite alternate;
    transition: all 0.5s linear;
}

@keyframes clickedAnime {
    to {
        background-color: rgba(113, 137, 255, 0.449);
    }
}

.albumCover {
    min-width: 48px;
    height: 48px;
    margin: 8px;
    border-radius: 7px;
    background-position: center;
    background-size: cover;
}

.songTitle {
    margin: 8px 8px 8px 0px;
}

.songTitle p:first-child {
    font-size: 1.2rem;
    max-height: 2rem;
    overflow: scroll;
    scrollbar-width: none;
}

.songTitle p:first-child::-webkit-scrollbar {
    display: none;
}

.songTitle p:last-child {
    color: rgb(105, 101, 101);
    overflow: scroll;
    scrollbar-width: none;
}

.songTitle p:last-child::-webkit-scrollbar {
    display: none;
}

.songResult:hover {
    background-color: rgba(175, 175, 255, 0.449);
    cursor: pointer;
}

.songResult {
    width: 100%;
    border: rgb(248, 248, 248) 1.2px solid;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: all 200ms linear;
}
</style>