const monthDisplayElement = document.querySelector('.month-display');
const yearDisplayElement = document.querySelector('.year-display');
const datesElement= document.querySelector('.dates');
const prevBtn= document.querySelector('.left');
const nextBtn= document.querySelector('.right');
const yearUpBtn = document.querySelector('.year-up');
const yearDownBtn = document.querySelector('.year-down');

let currentDate= new Date();
const updateCalendar= () =>{
    const curentYear= currentDate.getFullYear();
    const currentMonth= currentDate.getMonth();

    const firstDay= new Date(curentYear, currentMonth, 0);
    const lastDay= new Date(curentYear, currentMonth + 1, 0);
    const totalDays= lastDay.getDate();
    const firstDayindex= firstDay.getDay();
    const lastDayindex= lastDay.getDay();

    // Update month and year displays separately
    const monthString = currentDate.toLocaleString('default', { month: 'long' });
    monthDisplayElement.textContent = monthString;
    yearDisplayElement.textContent = curentYear;

    let datesHTML="";

    for (let i=firstDayindex; i>0; i--) {
        const prevDate=new Date(curentYear, currentMonth,0 - i + 1);
        datesHTML+= `<div class="date inactive"><span>${prevDate.getDate()}</span></div>`;
    }
    for(let i=1; i<=totalDays; i++) {
        const date =new Date(curentYear, currentMonth, i);
        const activeClass= date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML+= `<div class="date ${activeClass}"><span>${i}</span></div>`;
    }
    for (let i=1; i<7-lastDayindex; i++) {
        const nextDate=new Date(curentYear, currentMonth + 1, i);
        datesHTML+= `<div class="date inactive"><span>${nextDate.getDate()}</span></div>`;
    }   
    datesElement.innerHTML= datesHTML;
    
    // Add special date functionality after dates are rendered
    addSpecialDateEvents();
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});
yearUpBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateCalendar();
});

yearDownBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    updateCalendar();
});
document.addEventListener('DOMContentLoaded', () => {
    updateCalendar();
});

// Special date functionality
const popupCard = document.getElementById('popup-card');
const hoverSound = document.getElementById('hover-sound');
let hoverTimeout;

function addSpecialDateEvents() {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    console.log('Current month:', currentMonth, 'Current year:', currentYear);
    
    // Check if we're viewing July (month index 6)
    if (currentMonth === 6) {
        console.log('We are in July! Looking for date 30...');
        const dates = document.querySelectorAll('.date');
        console.log('Found', dates.length, 'date elements');
        
        dates.forEach((dateElement, index) => {
            const dateText = dateElement.querySelector('span');
            if (dateText) {
                console.log(`Date ${index}: "${dateText.textContent}", inactive: ${dateElement.classList.contains('inactive')}`);
                if (dateText.textContent === '30' && !dateElement.classList.contains('inactive')) {
                    console.log('Found July 30th! Adding special styling...');
                    // Add special styling
                    dateElement.classList.add('special-date');
                    
                    // Add hover events with delay to prevent flickering
                    dateElement.addEventListener('mouseenter', () => {
                        clearTimeout(hoverTimeout);
                        showPopupWithSound();
                    });
                    dateElement.addEventListener('mouseleave', () => {
                        hoverTimeout = setTimeout(() => {
                            hidePopupWithSound();
                        }, 150); // Small delay to prevent flickering
                    });
                }
            }
        });
    } else {
        console.log('Not in July, current month is:', currentMonth);
    }
}

function showPopupWithSound() {
    // Show popup
    popupCard.classList.add('show');
    
    // Show falling sparkles
    const fallingSparkles = document.getElementById('falling-sparkles');
    if (fallingSparkles) {
        fallingSparkles.classList.add('active');
    }
    
    // Show birthday animation
    const birthdayAnimation = document.getElementById('birthday-animation');
    if (birthdayAnimation) {
        birthdayAnimation.classList.add('active');
    }
    
    // Play sound continuously
    hoverSound.volume = 0.3; // Set volume to 30%
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => {
        console.log('Audio play failed - this is normal on some browsers without user interaction');
        // Create a simple beep using Web Audio API as fallback
        createBeepSound();
    });
}

function hidePopupWithSound() {
    // Hide popup
    popupCard.classList.remove('show');
    
    // Hide falling sparkles
    const fallingSparkles = document.getElementById('falling-sparkles');
    if (fallingSparkles) {
        fallingSparkles.classList.remove('active');
    }
    
    // Hide birthday animation
    const birthdayAnimation = document.getElementById('birthday-animation');
    if (birthdayAnimation) {
        birthdayAnimation.classList.remove('active');
    }
    
    // Stop sound
    hoverSound.pause();
    hoverSound.currentTime = 0;
}

// Fallback beep sound using Web Audio API
function createBeepSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

addSpecialDateEvents();


