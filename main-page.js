let schedules = {}
const savedSchedules = localStorage.getItem('schedules');
if (savedSchedules) {
  schedules = JSON.parse(savedSchedules);
}

let date = new Date(); //let is no redeclaration, reassignment possible

const renderCalendar = () => {
  const viewYear = date.getFullYear(); //web standards year
  const viewMonth = date.getMonth(); //zero-base months 0~11>jan~dec

  // year-month Fill
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;
  // .class name and getMonth need to +1
  const prevLast = new Date(viewYear, viewMonth, 0); // last month last Date
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // this month last Date

  const PLDate = prevLast.getDate();// getdate called date
  const PLDay = prevLast.getDay(); //getday called days of the week 0~6>Sun~Sat

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

const prevDates = [];
const thisDates = [];
const nextDates = [];

if (PLDay !== 6) {
  for (let i = 0; i < PLDay + 1; i++) {
    const d = PLDate - i;
    prevDates.unshift({
      date: d,
      month: viewMonth === 0 ? 11 : viewMonth - 1,
      year: viewMonth === 0 ? viewYear - 1 : viewYear,
      type: 'other'
    });
  }
}

for (let i = 1; i <= TLDate; i++) {
  thisDates.push({
    date: i,
    month: viewMonth,
    year: viewYear,
    type: 'this'
  });
}

for (let i = 1; i < 7 - TLDay; i++) {
  nextDates.push({
    date: i,
    month: viewMonth === 11 ? 0 : viewMonth + 1,
    year: viewMonth === 11 ? viewYear + 1 : viewYear,
    type: 'other'
  });
}

const allDates = [...prevDates, ...thisDates, ...nextDates];


  // Dates 정리
const dateDivs = allDates.map(d => {
  const ymd = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.date).padStart(2, '0')}`;
  const hasSchedule = schedules[ymd] && schedules[ymd].length > 0;
  const dotHTML = hasSchedule ? '<div class="dot"></div>' : '';
  return `<div class="date"><span class="${d.type}">${d.date}${dotHTML}</span></div>`;
});

document.querySelector('.dates').innerHTML = dateDivs.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (parseInt(date.innerText, 10) === today.getDate()) {
        date.classList.add('today');
        break;
      }

    }
  }
  renderTodaySchedule();
};
renderCalendar();
function renderTodaySchedule() {
  const today = new Date();
  const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const list = document.querySelector('.schedule-list');
  list.innerHTML = '';
  console.log('오늘 키:', key, '일정:', schedules[key]);

  if (schedules[key]) {
    schedules[key].forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = '일정 없음';
    list.appendChild(li);
  }
}
renderTodaySchedule();

document.querySelector('.ns').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('hidden');
});

document.querySelector('.ds').addEventListener('click', () => {
  const dateToDelete = prompt('삭제할 날짜를 yyyy-mm-dd 형식으로 입력하세요:');
  if (schedules[dateToDelete]) {
    delete schedules[dateToDelete];
    localStorage.setItem('schedules', JSON.stringify(schedules));
    alert('일정이 삭제되었습니다.');
    renderCalendar();
    renderTodaySchedule()
  } else {
    alert('해당 날짜에 일정이 없습니다.');
  }
});

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function saveSchedule() {
  const dateInput = document.getElementById('schedule-date').value;
  const textInput = document.getElementById('schedule-text').value;

  if (!schedules[dateInput]) {
    schedules[dateInput] = [];
  }
  schedules[dateInput].push(textInput);
  localStorage.setItem('schedules', JSON.stringify(schedules));
  closeModal();
  renderCalendar();
  renderTodaySchedule()
}

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  }
  
  const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  }
  
  const goToday = () => {
    date = new Date();
    renderCalendar();
  }
