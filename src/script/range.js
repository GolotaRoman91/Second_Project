window.onload = function () {
    slideOne();
    slideTwo();
    slideThree();
    slideFour();
};

let sliderOne = document.getElementById('slider-1');
let sliderTwo = document.getElementById('slider-2');
let displayValOne = document.getElementById('range1');
let displayValTwo = document.getElementById('range2');
let minGap1 = 0;
let sliderTrack1 = document.querySelector('.slider-track-first');
let sliderMaxValue1 = document.getElementById('slider-1').max;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap1) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap1;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor1();
}
function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap1) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap1;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor1();
}
function fillColor1() {
    percent1 = (sliderOne.value / sliderMaxValue1) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue1) * 100;
    sliderTrack1.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

let sliderThree = document.getElementById('slider-3');
let sliderFour = document.getElementById('slider-4');
let displayValThree = document.getElementById('range3');
let displayValFour = document.getElementById('range4');
let minGap2 = 0;
let sliderTrack2 = document.querySelector('.slider-track-second');
let sliderMaxValue2 = document.getElementById('slider-3').max;

function slideThree() {
    if (parseInt(sliderFour.value) - parseInt(sliderThree.value) <= minGap2) {
        sliderThree.value = parseInt(sliderFour.value) - minGap2;
    }
    displayValThree.textContent = sliderThree.value;
    fillColor2();
}
function slideFour() {
    if (parseInt(sliderFour.value) - parseInt(sliderThree.value) <= minGap2) {
        sliderFour.value = parseInt(sliderThree.value) + minGap2;
    }
    displayValFour.textContent = sliderFour.value;
    fillColor2();
}
function fillColor2() {
    percent3 = (sliderThree.value / sliderMaxValue2) * 100;
    percent4 = (sliderFour.value / sliderMaxValue2) * 100;
    sliderTrack2.style.background = `linear-gradient(to right, #dadae5 ${percent3}% , #3264fe ${percent3}% , #3264fe ${percent4}%, #dadae5 ${percent4}%)`;
}
