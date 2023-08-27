<script setup>
import { ref, toRef, toRefs, reactive, watch } from 'vue';
import { lyrics } from './lyrics.js';
import draggable from 'vuedraggable';

const lyricsAsRefs = toRefs(lyrics);
const hasGotLyrics = toRef(lyrics, 'hasGotLyrics');
const hasShownLyrics = toRef(lyrics, 'hasShownLyrics');
const showedLyrics = lyricsAsRefs.showedLyrics; // 新定义这个变量是为了避免切换歌词翻译和原文时覆盖lyricsArray等原始值。
const selectedLyricsArray = ref([]);
const previewStyle = reactive({
    opacity: 0,
    minHeight: 0
});
const bgTransionDelay = ref(1.5);
const transBtnColor = ref();
const transBtnFontColor = ref();
const chooseLyricsBottom = ref(0);
const posterAreaStyle = reactive({
    top: 100,
    height: 80,
});
const styleSelectorAnimationName = ref('');
const styleSelectorAnimationInterationCount = ref('');
const optionCardOne = ref(false);
const textIsBlack = ref(true);
const textisWhite = ref(false);
const openOption = ref(false);
const textIsSerif = ref(false);
const textIsSans = ref(true);
const posterFontSize = ref(1.5);
const optionCardTwo = ref(false);
const polaroidDockOpacity = ref(0);
const taionsDockOpacity = ref(0);
const platteIndex = ref(0);
const showPolaroidSongInfo = ref(false);
const isBigTemplate = ref(false);
const chooseLyricsSecrtionShadow = ref(true);
const mediaQueryList = [
    window.matchMedia('(max-width: 768px)'),
    window.matchMedia('(max-width: 1280px)'),]

const generateBtn = reactive({
    bottom: ref(82),
    opacity: ref(0),
    pointer: ref('none'),
    arrowRotate: ref(45),
    flexDirection: ref('column'),
    animationPlayState: ref('paused'),
    animationName: ref(''),
    arrowAnimation: ref('bounceArrow'),
    handleAnimation: ref('bounce')
})

const templateStyle = reactive({
    height: '50%',
    width: '90%',
    borderWidth: 0,
    placeHolderDisplay: 1,
    backgroundImage: '',
    borderRadius: '0.5rem',
    innerBorderWidth: '0',
    innerWidth: '100%',
    innerHeight: 'auto',

    blur: 24
})

const templateSelector = ref([false, false]);

watch(lyricsAsRefs.albumColorPlatte, () => {
    transBtnColor.value = `rgb(${lyricsAsRefs.albumColorPlatte.value[1][0]},${lyricsAsRefs.albumColorPlatte.value[1][1]},${lyricsAsRefs.albumColorPlatte.value[1][2]})`
    transBtnFontColor.value = `rgb(${lyricsAsRefs.albumColorPlatte.value[2][0]},${lyricsAsRefs.albumColorPlatte.value[2][1]},${lyricsAsRefs.albumColorPlatte.value[2][2]})`
})

const changePreviewStyle = () => {
    if (selectedLyricsArray.value.length != 0) {
        previewStyle.opacity = 1;
        previewStyle.minHeight = '20%'
    } else {
        previewStyle.opacity = 0;
        previewStyle.minHeight = 0
    }
}

const generateBtnToggle = () => {
    if (selectedLyricsArray.value.length != 0) {
        generateBtn.opacity = 0.6;
        generateBtn.pointer = 'auto';
        generateBtn.animationName == 'inOut'
        setTimeout(() => {
            if (generateBtn.animationName != 'inOut') {
                generateBtn.animationName = 'inOut';
            }
        }, 100);
    } else {
        generateBtn.animationName = '';
        setTimeout(() => {
            generateBtn.opacity = 0;
            generateBtn.pointer = 'none';
        }, 10)
    }
}

const toggleSelect = (index) => {
    if (selectedLyricsArray.value.some((item) => item.originIndex == index)) {
        // console.log('already added!');
        showedLyrics.value[index.slice(1)].isSelected = !showedLyrics.value[index.slice(1)].isSelected;
        let deleteIndex = selectedLyricsArray.value.findIndex((item) => item.originIndex == index);
        selectedLyricsArray.value.splice(deleteIndex, 1);
    } else {
        // console.log('a new lyric!');
        showedLyrics.value[index.slice(1)].isSelected = !showedLyrics.value[index.slice(1)].isSelected;
        selectedLyricsArray.value.push({ text: showedLyrics.value[index.slice(1)].text, originIndex: index });
    };

    changePreviewStyle();

    generateBtnToggle();

}

const removeLyric = (index) => {
    if (index.includes('n')) {
        lyrics.lyricsArrayWithSelectedStatus[index.slice(1)].isSelected = !lyrics.lyricsArrayWithSelectedStatus[index.slice(1)].isSelected;
        let deleteIndex = selectedLyricsArray.value.findIndex((item) => item.originIndex == index);
        selectedLyricsArray.value.splice(deleteIndex, 1);
        changePreviewStyle();
    } else {
        lyrics.tlyricsArrayWithSelectedStatus[index.slice(1)].isSelected = !lyrics.tlyricsArrayWithSelectedStatus[index.slice(1)].isSelected;
        let deleteIndex = selectedLyricsArray.value.findIndex((item) => item.originIndex == index);
        selectedLyricsArray.value.splice(deleteIndex, 1);
        changePreviewStyle();
    };

    generateBtnToggle();

}

const hideCreator = () => {
    lyrics.changeLyricsStatus(hasGotLyrics);
    lyrics.hasShownLyrics = lyrics.hasGotLyrics;

    bgTransionDelay.value = 0;
    setTimeout(() => {
        bgTransionDelay.value = 1.5;
    }, 2000)

    // 清空歌词数组
    lyrics.lyricsArray.length = 0;
    lyrics.tlyricsArray.length = 0;
    lyrics.showedLyrics.length = 0;
    selectedLyricsArray.value.length = 0;

    changePreviewStyle();

    chooseLyricsBottom.value = 0;
    posterAreaStyle.top = 100;

    generateBtn.opacity = 0;
    generateBtn.pointer = 'none';
    generateBtn.animationName = '';
    generateBtn.bottom = 82;
    generateBtn.arrowRotate = 45;
    generateBtn.animationPlayState = 'paused';
    generateBtn.arrowAnimation = 'bounceArrow';
    generateBtn.handleAnimation = 'bounce';
    generateBtn.flexDirection = 'column';

    optionCardOne.value = false;
    optionCardTwo.value = false;

    chooseLyricsSecrtionShadow.value = false;
};

const transLyrics = () => {
    if (lyrics.tlyricsArray.length == 0) {
        alert('该歌曲没有翻译');
    } else {
        lyrics.showedLyrics = lyrics.showedLyrics === lyrics.tlyricsArrayWithSelectedStatus ? lyrics.lyricsArrayWithSelectedStatus : lyrics.tlyricsArrayWithSelectedStatus;
    };
};

const generate = () => {
    chooseLyricsBottom.value = chooseLyricsBottom.value == 0 ? 90 : 0;
    chooseLyricsSecrtionShadow.value = chooseLyricsSecrtionShadow.value == false ? true : false;

    if (posterAreaStyle.top == 100 && posterAreaStyle.height == 80) {
        posterAreaStyle.top = 10;
    } else if (posterAreaStyle.top == 100 && posterAreaStyle.height == 90) {
        posterAreaStyle.top = 5;
    } else {
        posterAreaStyle.top = 100;
    }

    generateBtn.bottom = generateBtn.bottom == 82 ? 12 : 82;
    generateBtn.animationPlayState = generateBtn.animationPlayState == 'paused' ? 'running' : 'paused'; // 控制inOut动画

    if (optionCardOne.value || optionCardTwo.value) {
        optionCardOne.value = false;
        optionCardTwo.value = false
    }

    setTimeout(() => {
        generateBtn.arrowRotate = generateBtn.arrowRotate == 225 ? 45 : 225;
        generateBtn.flexDirection = generateBtn.flexDirection == 'column' ? 'column-reverse' : 'column';
        generateBtn.arrowAnimation = generateBtn.arrowAnimation == 'bounceArrow' ? 'bounceArrowReverse' : 'bounceArrow';
        generateBtn.handleAnimation = generateBtn.handleAnimation == 'bounce' ? 'bounceReverse' : 'bounce';
    }, 500)
    setTimeout(() => {
        generateBtn.animationPlayState = 'paused'
    }, 3000)
    styleSelectorAnimationName.value = styleSelectorAnimationName.value == '' ? 'template-selector-bgcolor' : '';

}

const templateOne = () => {
    templateStyle.backgroundImage = lyricsAsRefs.albumCover;
    templateStyle.height = '70%';
    templateStyle.placeHolderDisplay = 0;
    templateStyle.borderRadius = '0px';
    templateStyle.innerWidth = '60%';
    templateStyle.innerHeight = '80%';
    templateStyle.innerBorderWidth = '4px 4px 0 4px';
    templateStyle.borderWidth = 0;

    polaroidDockOpacity.value = 1;
    taionsDockOpacity.value = 0;
    showPolaroidSongInfo.value = true;

    posterAreaStyle.top = 5;
    posterAreaStyle.height = 90;

    setTimeout(() => {
        let templateEle = document.getElementById('template');
        let templateHeight = templateEle.clientHeight;
        templateStyle.width = templateHeight + 'px';
    }, 1500)
}

const templateTwo = () => {
    templateStyle.backgroundImage = lyricsAsRefs.albumCover;
    templateStyle.height = '70%';
    templateStyle.placeHolderDisplay = 0;
    templateStyle.borderRadius = '0px';
    templateStyle.innerHeight = '100%'
    templateStyle.innerWidth = '100%'
    templateStyle.innerBorderWidth = '0';
    
    if (mediaQueryList[0].matches) {
        templateStyle.width = '80%';
        templateStyle.borderWidth = 1;
    } else {
        templateStyle.width = '40%';
        templateStyle.borderWidth = 1.5;
    }

    polaroidDockOpacity.value = 0;
    taionsDockOpacity.value = 1;
    showPolaroidSongInfo.value = false;

    posterAreaStyle.top = 5;
    posterAreaStyle.height = 90;
}

const changeTemplate = (index) => {
    styleSelectorAnimationInterationCount.value = '1'; // 终止模板选择区域背景闪烁动画
    if (templateSelector.value.some((ele) => ele == true)) {
        for (let i = 0; i < templateSelector.value.length; i++) {
            templateSelector.value[i] = false;
            styleSelectorAnimationInterationCount.value = '1';
        };
        templateSelector.value[index] = !templateSelector.value[index];
        if (index == 0) {
            templateOne();
        } else if (index == 1) {
            templateTwo();
        }
    } else {
        templateSelector.value[index] = !templateSelector.value[index];
        if (index == 0) {
            templateOne();
        } else if (index == 1) {
            templateTwo();
        }

        setTimeout(() => {
            openOption.value = true;
        }, 2000)

    }
}


const changeTextColor = (color) => {
    if (color == 'black') {
        textIsBlack.value = true;
        textisWhite.value = false;
    } else if (color == 'white') {
        textIsBlack.value = false;
        textisWhite.value = true;
    }
}

const changeTextFontFamily = (family) => {
    if (family == 'serif') {
        textIsSans.value = false;
        textIsSerif.value = true;
    } else if (family == 'sans') {
        textIsSans.value = true;
        textIsSerif.value = false;
    }
}

const changeFontSize = (symbol) => {
    if (symbol == '+') {
        posterFontSize.value = posterFontSize.value + 0.125;
    } else if (symbol == '-') {
        posterFontSize.value = posterFontSize.value - 0.125;
    }
}

const changeBlurredness = (symbol) => {
    let innerTemplate = document.querySelector('.innerTemplate');
    innerTemplate.style.transition = 'none';

    if (symbol == '+') {
        templateStyle.blur = templateStyle.blur + 2;
    } else if (symbol == '-') {
        templateStyle.blur = templateStyle.blur - 2;
    }
}

const uploadImage = () => {
    const file = document.getElementById('file');
    file.addEventListener('change', () => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file.files[0]);
        fileReader.onloadend = () => {
            templateStyle.backgroundImage = fileReader.result;
        }
    })
}

const changeTaionsBorderColor = (index) => {

    platteIndex.value = index;

}

document.addEventListener("click", event => {
    var cDom = document.querySelector(".options");
    var tDom = event.target;
    // console.log(tDom)
    if (cDom == tDom || cDom.contains(tDom)) {
        return
    } else {
        optionCardOne.value = false;
        optionCardTwo.value = false
    }
});

const dragOptions = reactive({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
})

const drag = ref(false);

</script>

<template>
    <button class="backBtn" @click="hideCreator"
        :style="{ backgroundColor: transBtnColor, color: transBtnFontColor }">Back</button>
    <main class="createArea flex flex-col h-full items-center justify-center overflow-scroll">

        <section
            class="chooseLyricSection flex justify-center w-4/5 md:w-2/4 lg:w-1/4 relative rounded-3xl overflow-hidden h-4/5"
            :style="{ bottom: chooseLyricsBottom + '%' }" :class="{ 'shadow-2xl': chooseLyricsSecrtionShadow }">
            <div class="bg-img w-full absolute h-full bg-center bg-cover bg-no-repeat rounded-3xl -z-10"
                :class="{ bgTransition: hasGotLyrics }"
                :style="{ backgroundImage: `url(${lyrics.albumCover})`, transitionDelay: bgTransionDelay + 's' }">
            </div>

            <div class="slected-lyrics-preview absolute top-2 right-2 w-1/3 backdrop-blur-sm" :style="previewStyle">
                <TransitionGroup name="previewSelection">
                    <div class="preview-lyirc-items" @click="removeLyric(lyric.originIndex)"
                        v-for="lyric in selectedLyricsArray" :key="lyric.originIndex">
                        {{ lyric.text }}
                    </div>
                </TransitionGroup>
            </div>

            <button class="absolute top-2 right-2 rounded-full pl-2 pr-2 z-10 opacity-50 hover:bg-slate-200"
                @click="transLyrics" :style="{ backgroundColor: transBtnColor }">
                <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
                    <path
                        d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                        :fill="transBtnFontColor">
                    </path>
                </svg>
            </button>

            <div class="lyrics overflow-scroll w-full p-5 rounded-3xl">
                <TransitionGroup name="showLyrics">
                    <div class="lyricItems block w-full text-slate-800" v-for="lyric in showedLyrics"
                        @click="toggleSelect(lyric.index)"
                        :class="{ textHoverTransition: hasShownLyrics, selectedLyrics: lyric.isSelected }"
                        :key="lyric.index.slice(1)">
                        {{ lyric.text }}</div>
                </TransitionGroup>
            </div>
        </section>

        <div class="generateBtn absolute w-12 z-50 flex items-center cursor-pointer"
            :style="{ opacity: generateBtn.opacity, pointerEvents: generateBtn.pointer, bottom: generateBtn.bottom + '%', flexDirection: generateBtn.flexDirection, animationPlayState: generateBtn.animationPlayState, animationName: generateBtn.animationName }"
            @click="generate()">
            <div class="generateHandle w-full border-t-8 rounded-md relative"
                :style="{ borderColor: transBtnFontColor, animationName: generateBtn.handleAnimation }">
            </div>
            <div class="generateArrow1 border-b-2 border-r-2 w-1/2 aspect-square"
                :style="{ borderColor: transBtnFontColor, transform: `rotate(${generateBtn.arrowRotate}deg)`, animationName: generateBtn.arrowAnimation }">
            </div>
            <div class="generateArrow2 border-b-2 border-r-2 w-1/2 aspect-square"
                :style="{ borderColor: transBtnFontColor, transform: `rotate(${generateBtn.arrowRotate}deg)`, animationName: generateBtn.arrowAnimation }">
            </div>
        </div>


        <section
            class="posterAreaSection flex flex-col md:flex-row justify-center items-center w-full md:w-2/4 lg:w-3/4 absolute rounded-2xl"
            :style="{ top: posterAreaStyle.top + '%', height: posterAreaStyle.height + '%' }">
            <div class="style-selector relative w-4/5 left-0 flex md:flex-col md:h-5/6 justify-center md:w-2/12 m-1 md:m-4 rounded-xl"
                :style="{ animationName: styleSelectorAnimationName, animationIterationCount: styleSelectorAnimationInterationCount }">
                <button class="selector-btn py-1 px-1 md:py-2 md:px-4" :class="{ clicked: templateSelector[0] }"
                    @click="changeTemplate(0)">宝丽来相纸</button>
                <button class="selector-btn py-1 px-1 md:py-2 md:px-4" :class="{ clicked: templateSelector[1] }"
                    @click="changeTemplate(1)">TAiONS</button>
            </div>

            <div class="divider h-4/5 hidden md:block border-r-4 m-2 border-blue-200"></div>

            <div class="poster h-full w-full md:w-4/5 m-1 flex flex-col justify-center items-center space-y-5">
                <div id="template"
                    class="flex justify-center items-center rounded-lg bg-center bg-cover select-none bg-indigo-200 overflow-hidden"
                    :class="{ bigTemplate: isBigTemplate }"
                    :style="{ borderImageSource: `linear-gradient(to right bottom, rgb(${lyricsAsRefs.albumColorPlatte.value[platteIndex]}), rgb(${lyricsAsRefs.albumColorPlatte.value[platteIndex + 1]}))`, borderImageSlice: 1, height: templateStyle.height, width: templateStyle.width, backgroundImage: 'url(' + templateStyle.backgroundImage + ')', borderRadius: templateStyle.borderRadius, borderWidth: templateStyle.borderWidth + 'rem' }">
                    <div class="innerTemplate font-mono font-bold text-2xl relative flex justify-center items-center flex-col border-white h-4/5 overflow-hidden"
                        :style="{ height: templateStyle.innerHeight, width: templateStyle.innerWidth, borderWidth: templateStyle.innerBorderWidth, backdropFilter: `blur(${templateStyle.blur}px)` }">

                        <draggable item-key="name" key="transition-group" class="list-group" :list="selectedLyricsArray"
                            v-bind="dragOptions" @start="drag = true" @end="drag = false" :component-data="{
                                tag: 'ul',
                                type: 'transition-group',
                                name: 'flip-list'
                            }">
                            <template #item="{ element }">
                                <div :key="element.name"
                                    class="list-group-item transition-opacity delay-100 p-2 -translate-y-6 text-center leading-normal"
                                    :style="{ opacity: Math.abs(templateStyle.placeHolderDisplay - 1), fontSize: posterFontSize + 'rem' }"
                                    :class="{ 'text-black': textIsBlack, 'text-white': textisWhite, 'font-serif': textIsSerif, 'font-sans': textIsSans }">
                                    {{ element.text }}
                                </div>
                            </template>
                        </draggable>

                        <!-- <div class="transition-opacity delay-100 m-2 w-5/6 -translate-y-6 text-center leading-normal"
                            v-for="lyric in selectedLyricsArray"
                            :style="{ opacity: Math.abs(templateStyle.placeHolderDisplay - 1), fontSize: posterFontSize + 'rem' }"
                            :class="{ 'text-black': textIsBlack, 'text-white': textisWhite, 'font-serif': textIsSerif, 'font-sans': textIsSans }">
                            {{ lyric.text }}
                        </div> -->
                        <div id="polaroidSongInfo" class="m-5 flex flex-col items-center" v-if="showPolaroidSongInfo">
                            <div class="font-normal text-base text-stone-700">{{ lyricsAsRefs.title.value }}</div>
                            <div class="font-normal text-base text-stone-700">{{ lyricsAsRefs.artist.value }}</div>
                        </div>

                        <div id="polaroidDock"
                            class="w-full h-12 bg-white absolute bottom-0 flex items-center transition-opacity"
                            :style="{ opacity: polaroidDockOpacity }">
                            <p class=" text-sm opacity-50">TAiONS</p>
                        </div>
                        <div id="taionsDock"
                            class="flex p-2 absolute bottom-0 h-20 w-full backdrop-blur-lg transition-all shadow-inner"
                            :style="{ opacity: taionsDockOpacity, backgroundColor: `rgba(${lyricsAsRefs.albumColorPlatte.value[1]},0.3)` }">
                            <div class="bg-violet-200 mr-2 h-full aspect-square rounded-md bg-cover bg-center"
                                :style="{ backgroundImage: `url(${templateStyle.backgroundImage})` }"></div>
                            <div class="flex flex-col justify-around">
                                <div class="font-sans font-normal text-normal text-ellipsis">{{ lyricsAsRefs.title.value }}
                                </div>
                                <div class="font-sans font-normal text-sm text-ellipsis">{{ lyricsAsRefs.artist.value }}
                                </div>
                            </div>
                        </div>
                        <p class="transition-opacity absolute text-center"
                            :style="{ opacity: templateStyle.placeHolderDisplay }">
                            \CHOOSE ONE TEMPLATE \</p>
                    </div>
                </div>
                <Transition name="card">
                    <div class="options relative md:static z-10 h-18 w-full md:w-5/6 p-1 md:p-2 flex flex-col md:flex-row  bg-violet-300 rounded-lg shadow-xl"
                        v-show="openOption" :class="{ 'opacity-0': isBigTemplate, 'hover:opacity-100': isBigTemplate }">
                        <div id="cardOne" class="w-full md:w-1/3 md:m-1 mb-1 relative">
                            <button
                                class="p-1 w-full rounded-lg bg-violet-50 hover:bg-violet-100 active:bg-violet-200 transition-all text-violet-900"
                                @click="optionCardOne = !optionCardOne">文字</button>
                            <Transition name="card">
                                <div class="option-card-1 absolute bottom-12 bg-stone-100 shadow-2xl rounded-lg flex flex-col p-1 mt-1 w-full"
                                    v-if="optionCardOne">
                                    <div class="m-1 flex justify-between">
                                        字号
                                        <button
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full hover:shadow-lg transition-all"
                                            @click="changeFontSize('-')">−</button>
                                        <button
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full hover:shadow-lg transition-all"
                                            @click="changeFontSize('+')">+</button>
                                    </div>

                                    <div class="m-1 flex justify-between">
                                        颜色
                                        <button value="balck"
                                            class="w-1/3 bg-black rounded-full hover:shadow-lg transition-all"
                                            @click="changeTextColor('black')"></button>
                                        <button value="white"
                                            class="w-1/3 bg-white rounded-full hover:shadow-lg transition-all"
                                            @click="changeTextColor('white')"></button>
                                    </div>

                                    <div class="m-1 flex justify-between">
                                        字体
                                        <button value="Serif"
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full font-serif hover:shadow-lg transition-all"
                                            @click="changeTextFontFamily('serif')">文字</button>
                                        <button value="Sans-Serif"
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full font-sans hover:shadow-lg transition-all"
                                            @click="changeTextFontFamily('sans')">文字</button>
                                    </div>
                                </div>
                            </Transition>

                        </div>

                        <div id="cardTwo" class="w-full md:w-1/3 md:m-1 mb-1 relative">
                            <button
                                class="p-1 w-full rounded-lg bg-violet-50 hover:bg-violet-100 active:bg-violet-200 transition-all text-violet-900"
                                @click="optionCardTwo = !optionCardTwo">背景</button>
                            <Transition name="card">
                                <div class="option-card-2 absolute bottom-12 bg-stone-100 shadow-2xl rounded-lg flex flex-col p-1 mt-1 w-full"
                                    v-if="optionCardTwo">
                                    <div class="m-1 flex justify-between">
                                        <input type="file" id="file" accept=".jpg, .jpeg, .png" class="hidden"
                                            @click="uploadImage" />
                                        <label for="file"
                                            class="w-full cursor-pointer px-3 text-center rounded-full border-0 bg-violet-100 hover:bg-violet-200 active:bg-violet-300 transition-all">替换背景图片</label>
                                    </div>

                                    <div class="m-1 flex justify-between">
                                        模糊
                                        <button
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full hover:shadow-lg transition-all"
                                            @click="changeBlurredness('-')">−</button>
                                        <button
                                            class="w-1/3 bg-indigo-100 hover:bg-indigo-300 active:bg-indigo-400 rounded-full hover:shadow-lg transition-all"
                                            @click="changeBlurredness('+')">+</button>
                                    </div>

                                    <div class="m-1 flex justify-between" v-if="!showPolaroidSongInfo">
                                        <button class="w-1/6 aspect-square rounded-md"
                                            :style="{ backgroundColor: `rgb(${lyricsAsRefs.albumColorPlatte.value[0]})` }"
                                            @click="changeTaionsBorderColor(0)"></button>
                                        <button class="w-1/6 aspect-square rounded-md"
                                            :style="{ backgroundColor: `rgb(${lyricsAsRefs.albumColorPlatte.value[1]})` }"
                                            @click="changeTaionsBorderColor(1)"></button>
                                        <button class="w-1/6 aspect-square rounded-md"
                                            :style="{ backgroundColor: `rgb(${lyricsAsRefs.albumColorPlatte.value[2]})` }"
                                            @click="changeTaionsBorderColor(2)"></button>
                                        <button class="w-1/6 aspect-square rounded-md"
                                            :style="{ backgroundColor: `rgb(${lyricsAsRefs.albumColorPlatte.value[3]})` }"
                                            @click="changeTaionsBorderColor(3)"></button>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div id="love" class="w-full md:w-1/3 md:m-1">
                            <button
                                class="p-1 w-full rounded-lg bg-violet-50 hover:bg-violet-100 active:bg-violet-200 transition-all"
                                @click="isBigTemplate = !isBigTemplate">❤️</button>
                        </div>
                    </div>
                </Transition>
                <!-- <button @click="saveImg()">saveImg</button> -->
            </div>
        </section>

    </main>
</template>

<style>
@keyframes inOut {
    10% {
        opacity: 0;
    }

    30% {
        opacity: 0;
    }

    100% {
        opacity: 0.6;
    }
}

@keyframes bounce {
    40% {
        transform: translateY(15px);
    }

    100% {
        transform: translateY(-4px);
    }
}

@keyframes bounceReverse {
    40% {
        transform: translateY(-15px);
    }

    100% {
        transform: translateY(4px);
    }
}

@keyframes bounceArrow {
    40% {
        opacity: 1;
        transform: translateY(15px) rotate(45deg);
    }

    100% {
        opacity: 0;
        transform: translateY(-4px) rotate(45deg);
    }
}

@keyframes bounceArrowReverse {
    40% {
        opacity: 1;
        transform: translateY(-15px) rotate(225deg);
    }

    100% {
        opacity: 0;
        transform: translateY(4px) rotate(225deg);
    }
}

@keyframes template-selector-bgcolor {
    0% {
        background-color: #f4bbbb00;
    }

    50% {
        background-color: #f5b7b7;
    }

    100% {
        background-color: #f4bbbb00;
    }
}
</style>

<style scoped>
.ghost {
    color: #5f6063a9;
    background: #00000018;
}

.list-group-item {
    cursor: move;
}

.card-enter-active,
.card-leave-active {
    transition: all 0.25s ease;
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
    bottom: 1rem;
    transform: scale(0.8);
}

.innerTemplate {
    transition: all 0.5s ease;
}

.style-selector {
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

#template {
    min-height: 50%;
    transition: all 1.5s ease, border-image-source 0s;
    position: relative;
}

.bigTemplate {
    transform: scale(1.2);
}

.options {
    transition: all 0.5s ease;
}

.selector-btn {
    margin: 10px;
    /* padding: 10px 15px; */
    border: none;
    font-size: 17px;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow, background-color;
}

.selector-btn {
    background: rgb(157, 209, 252);
    box-shadow: 0 0 5px rgb(157, 209, 252);
}

.selector-btn:hover {
    box-shadow: 0 0 5px rgb(157, 209, 252),
        0 0 25px rgb(157, 209, 252);
    /* 0 0 50px rgb(0, 140, 255), */
    /* 0 0 100px rgb(0, 140, 255); */
}

.clicked {
    background-color: #5f6063;
}

.previewSelection-move,
.previewSelection-enter-active,
.previewSelection-leave-active {
    transition: all 0.5s ease;
}

.previewSelection-enter-from,
.previewSelection-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.previewSelection-leave-active {
    position: absolute;
}

.showLyrics-enter-active {
    transition: all 2s ease;
    transition-delay: 1.5s;
    opacity: 1;
    pointer-events: none;
}

.showLyrics-leave-active {
    transition: all 0.2s ease;
    opacity: 0;
}

.showLyrics-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.chooseLyricSection {
    bottom: 0%;
    transition: all 3s ease;
}

.posterAreaSection {
    background-color: rgba(250, 235, 215, 0.829);
    transition: all 3s ease;
}

.generateBtn {
    right: 5%;
    transition: opacity 0.5s ease, bottom 3s ease;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-play-state: paused;
}

.generateHandle {
    animation: 3s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
}

.generateArrow1 {
    animation: 3s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
    animation-delay: 0.05s;
}

.generateArrow2 {
    animation: 3s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
    animation-delay: .15s;
}

.slected-lyrics-preview {
    z-index: 2;
    background-color: #5f606378;
    padding: 5px;
    border-radius: 10px;
    transition: all 0.5s ease;
    transition-delay: 0.2s;
}

.preview-lyirc-items {
    margin: 8px 2px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    border-radius: 7px;
    user-select: none;
}

.preview-lyirc-items:hover {
    background-color: #c5c5c5;
    border-radius: 7px;
    cursor: pointer;
}

.preview-lyirc-items:hover::after {
    content: '';
    background-color: #5f6063;
    opacity: 1;
}

.bg-img {
    filter: blur(0) contrast(1);
    transition: filter 1.6s ease;
}

.bgTransition {
    filter: blur(16px) contrast(.6);
}

.lyrics {
    scrollbar-width: none;
}

.lyrics::-webkit-scrollbar {
    display: none;
}

.createArea {
    scrollbar-width: none;
}

.createArea::-webkit-scrollbar {
    display: none;
}

.lyricItems {
    outline-style: none;
    cursor: pointer;
    margin: 10px 0 25px 0;
    padding: 0 10px;
    font-size: 1.8rem;
    transition: all 1.6s ease;
    transition-delay: 2s;
    border-radius: 10px;
    user-select: none;
}

.lyricItems:hover {
    color: #f8f7f7;
    background-color: #5f60638c;
    border-radius: 10px;
}

.textHoverTransition {
    transition: all 0.2s ease;
    transition-delay: 0s;
}

.selectedLyrics {
    font-size: 2rem;
    background-color: #f8f7f7c5;
    border-radius: 10px;
}

.backBtn {
    color: #5f6063;
    padding: 0.3em 1.2em;
    font-size: 18px;
    border-radius: 0.5em;
    border: 1px solid #e8e8e8;
    position: absolute;
    top: 15px;
    left: 20px;
    transition: all .3s;
    opacity: 0.6;
}

.backBtn:hover {
    background-color: #c5c5c5;
    border: 1px solid white;
}
</style>