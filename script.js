const days = document.querySelector(".days")
const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

let leftTime = {
 dys: 0,
 hrs: 0,
 mins: 0,
 secs: 0,
}

let secondsTotal;

function time(){
  secondsTotal = Math.floor((new Date('2022, 09, 01') - new Date()) / 1000)//month.date.year
  setTimeLeft();
  let interval = setInterval(() => {
    if(secondsTotal < 0){
      clearInterval(interval);
    }
    timeCounter();
    // console.log(leftTime);
  }, 1000)
  
}
time()
function timeCounter() {
  if(secondsTotal > 0){
    --leftTime.secs;
    if (leftTime.mins >= 0 && leftTime.secs < 0) {
      leftTime.secs = 59
      --leftTime.mins
    }
    if (leftTime.hrs >= 0 && leftTime.mins < 0) {
      leftTime.mins = 59;
      --leftTime.hrs;
    }
    if (leftTime.dys >= 0 && leftTime.hrs < 0) {
      leftTime.hrs = 23
      --leftTime.dys
    }
  }

  --secondsTotal;
  showTimer();  
}

function showTimer() {
  // days.innerText = leftTime.dys;
  // hours.innerText = leftTime.hrs;
  // minutes.innerText = leftTime.mins;
  // seconds.innerText = leftTime.secs;

  animateFlip(days, leftTime.dys)
  animateFlip(hours, leftTime.hrs)
  animateFlip(minutes, leftTime.mins)
  animateFlip(seconds, leftTime.secs)
}
function animateFlip(element, value){
  const valueDom = element.querySelector('.bottom-back').innerText;
  const currentValue = value < 10 ? '0' + value : '' + value;

  if (valueDom === currentValue) return;


  element.querySelector(".top-back span").innerText = currentValue;
   element.querySelector(".bottom-back span").innerText = currentValue;
   
   gsap.to(element.querySelector('.top'), 0.7, {
      rotationX: '-180deg',
      transformPerspective:300,
      ease:Quart.easeOut,
      onComplete: () => {
        element.querySelector(".top").innerText = currentValue;
        element.querySelector(".bottom").innerText = currentValue;
        gsap.set(element.querySelector('.top'), {rotationX: 0})
      }
   });
   gsap.to(element.querySelector(".top-back"), 0.7, {
     rotationX: 0,
     transformPerspective: 300,
     ease:Quart.easeOut,
     clearProps: 'all'
   });
}

function setTimeLeft() {
  leftTime.dys = Math.floor(secondsTotal / (60 * 60 * 24));
  leftTime.hrs = Math.floor(secondsTotal / (60 * 60) % 24);
  leftTime.mins = Math.floor(secondsTotal / (60) % 60);
  leftTime.secs = Math.floor(secondsTotal % 60 );
  
}