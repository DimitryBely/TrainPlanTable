"use strict";
window.addEventListener( 'DOMContentLoaded', () => {
    const   btns = document.querySelectorAll('.innerMenu'),
            tables = document.querySelectorAll('.days'),
            timer = document.querySelector('.timer'),
            timerBtns = document.querySelectorAll('.timerBtn'),
            timerInputs = document.querySelectorAll('.timerInput');

    let timerTimeout;

    function checkTimer(){
        if( (timerInputs[0].value === '00') && (timerInputs[1].value === '00') && (timerInputs[2].value === '00') ) return -1;

        return 0;
    }

    function setTimer(param) {
        if(param !== 0){
            let h = timerInputs[0],
                m = timerInputs[1],
                s = timerInputs[2];

            if(s.value === '00'){
                if(m.value !== '00'){
                    s.value = '59';
                    if( (+m.value - 1).toString().length === 1) m.value = '0' + (+m.value - 1);
                    else m.value = +m.value - 1;
                } else if(m.value === '00'){
                    if(h.value !== '00') {
                        if( (+h.value - 1).toString().length === 1) h.value = '0' + (+h.value - 1);
                        else h.value = +h.value - 1;
                        m.value = '59';
                        s.value = '59'
                    }
                }
            } else if( (+s.value - 1).toString().length === 1) s.value = '0' + (+s.value - 1);
            else s.value = +s.value - 1;

            if( (+h.value === 0) && (+m.value === 0) && (+s.value === 0) ) setTimer(0);
            else timerTimeout = setTimeout( function () {
                setTimer(1);
            }, 1000);
        } else {
            timerBtns[0].value = 'Start';
            clearTimeout(timerTimeout);
        }
    }

    btns[0].addEventListener( 'click', () => {
        for(let j = 0; j < 7; j++){
            tables[j].style.display = 'flex';
        }
    });

    for(let i = 1; i < 8; i++) {
        btns[i].addEventListener( 'click', () => {
            for(let j = 0; j < 7; j++){
                tables[j].style.display = 'none';
            }
            tables[i-1].style.display = 'flex';
        });
    }

    btns[8].addEventListener( 'click', () => {
        timer.style.display === 'none' ? timer.style.display = 'flex' : timer.style.display = 'none';
    });

    timerBtns[0].addEventListener( 'click', () => {
        if(!~checkTimer()) alert('ERROR! TIME IS NULL!');
        else {
            if(timerBtns[0].value === 'Start') {
                timerBtns[0].value = 'Stop';
                setTimer(1);
            } else {
                timerBtns[0].value = 'Start';
                setTimer(0);
            }
        }
    });

    timerBtns[1].addEventListener( 'click', () => {
        timerInputs[1].value = +timerInputs[1].value + 1;
        if(timerInputs[1].value.length === 1) timerInputs[1].value = '0' + timerInputs[1].value;
        if(timerInputs[1].value == 60){
            timerInputs[1].value = '00';
            timerInputs[0].value = +timerInputs[0].value + 1;
            if(timerInputs[0].value.length === 1) timerInputs[0].value = '0' + timerInputs[0].value;
        }
    });

    timerBtns[2].addEventListener( 'click', () => {
        timerInputs[1].value = +timerInputs[1].value + 5;
        if(timerInputs[1].value.length === 1) timerInputs[1].value = '0' + timerInputs[1].value;
        if(timerInputs[1].value >= 60){
            timerInputs[1].value = +timerInputs[1].value - 60;
            timerInputs[0].value = +timerInputs[0].value + 1;
            if(timerInputs[1].value.length === 1) timerInputs[1].value = '0' + timerInputs[1].value;
            if(timerInputs[0].value.length === 1) timerInputs[0].value = '0' + timerInputs[0].value;
        }
    });
});