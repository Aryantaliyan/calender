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


