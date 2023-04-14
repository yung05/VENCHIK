// ВЫПАДАЮЩЕЕ МЕНЮ
let submenu = document.querySelector('#submenu');
let dropMenu = document.querySelector('#dropMenu');

submenu.addEventListener('mouseover', function(){
    dropMenu.classList.add('drop');
    submenu.addEventListener('mouseout', function(){
        dropMenu.classList.remove('drop');
    });
});

dropMenu.addEventListener('mouseover', function(){
    dropMenu.classList.add('drop');
    dropMenu.addEventListener('mouseout', function(){
        dropMenu.classList.remove('drop');
    });
});

// ВХОД И РЕГИСТРАЦИЯ

// ЗАПУСК ОКНА
let loginBtn = document.getElementById('show-login-btn');
let dialog = document.querySelector('dialog');
let cross = document.getElementById('cross');

loginBtn.addEventListener('click', function() {
    dialog.showModal();
});

cross.addEventListener('click', function() {
    dialog.close();
});

// СКРИПТ САМОГО ОКНА
let signInBtn = document.querySelector('.signin-btn');
let signUpBtn = document.querySelector('.signup-btn');
let formBox = document.querySelector('.form-box');

signUpBtn.addEventListener('click', function () {
    formBox.classList.add('active');
});

signInBtn.addEventListener('click', function () {
    formBox.classList.remove('active');
});

// РЕГИСТРАЦИЯ
let notice = document.getElementById('notice');
let form_signup = document.querySelector('.form_signup');

form_signup.addEventListener('submit', function(event) {
    let promise = fetch('ready.php', {
        method: 'POST',
        body: new FormData(this),
    }).then (
        response => {
            return response.text();
        }
    ).then (
        text => {
            if (text) {
                notice.textContent = 'Успешно!';
                notice.classList.remove('noticehide');
                setTimeout(() => notice.classList.add('noticehide'), 3000);
            } else {
                notice.textContent = 'Попробуйте еще раз';
                notice.classList.remove('noticehide');
                setTimeout(() => notice.classList.add('noticehide'), 3000);
            }
        }
    )
    event.preventDefault();
});

form_signup.addEventListener('submit', function() {
    form_signup.reset();
})

// АВТОРИЗАЦИЯ
let user = document.getElementById('user');
let form_signin = document.querySelector('.form_signin');

form_signin.addEventListener('submit', function(event) {
    let loginavt = document.getElementById('loginavt').value;
    let passwordavt = document.getElementById('passwordavt').value;
    fetch('ready.php?loginavt=' + loginavt + '&passwordavt=' + passwordavt).then (
        response => {
            return response.text();
        }
    ).then (        
        text => {
            if (text == 'wrong name') {
                notice.textContent = 'Данные введены неверно';
                notice.classList.remove('noticehide');
                setTimeout(() => notice.classList.add('noticehide'), 3000);
            } else if (text == 'wrong pass') {
                notice.textContent = 'Неправильный пароль';
                notice.classList.remove('noticehide');
                setTimeout(() => notice.classList.add('noticehide'), 3000);
            } else {
                dialog.close();
                loginBtn.classList.add('loginhidden');
                user.classList.remove('userhide');
                user.textContent = text;
                notice.textContent = '';
                notice.classList.add('noticehide');
            }
        }
    )
    event.preventDefault();
});

form_signin.addEventListener('submit', function() {
    form_signin.reset();
})

// КНОПКА ВЫХОДА
let exit = document.getElementById('exit');

user.addEventListener('mouseover', function() {
    exit.classList.remove('exithide');
    user.addEventListener('mouseout', function() {
        exit.classList.add('exithide');
    })
})

exit.addEventListener('mouseover', function() {
    exit.classList.remove('exithide');
    exit.addEventListener('mouseout', function() {
        exit.classList.add('exithide');
    })
})

exit.addEventListener('click', function() {
    loginBtn.classList.remove('loginhidden');
    user.classList.add('userhide');
    user.textContent = '';
    exit.classList.add('exithide');
    loginavt.value = '';
    loginreg.value = '';
    passwordavt.value = '';
    passwordreg.value = '';
    emailreg.value = '';
})

// СЛАЙДЕР
let slides = document.querySelectorAll('.slide');
let index = 0;

function activateSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[n].classList.add('active');
}

function nextSlide() {
  if (index === slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  activateSlide(index);
}

setInterval(nextSlide, 3000);

// ОБРАТНЫЙ ТАЙМЕР //
let timerDays = document.getElementById('timer-days');
let timerHours = document.getElementById('timer-hours');
let timerMinutes = document.getElementById('timer-minutes');
let timerSeconds = document.getElementById('timer-seconds');
let timerBox = document.getElementById('timerbox')
let preloader = document.getElementById('preloader');

document.addEventListener('DOMContentLoaded', function() {
    let dateEnd = new Date(2023, 11, 31);
    let timerId = null;
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    function countdownTimer() {
        let diff = dateEnd - new Date();
        if (diff <= 0) {
          clearInterval(timerId);
        }
        let days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        let hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        let minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        let seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        timerDays.textContent = days < 10 ? '0' + days : days;
        timerHours.textContent = hours < 10 ? '0' + hours : hours;
        timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;

        timerDays.dataset.title = declensionNum(days, ['День', 'Дня', 'Дней']);
        timerHours.dataset.title = declensionNum(hours, ['Час', 'Часа', 'Часов']);
        timerMinutes.dataset.title = declensionNum(minutes, ['Минута', 'Минуты', 'Минут']);
        timerSeconds.dataset.title = declensionNum(seconds, ['Секунда', 'Секунды', 'Секунд']);
    }
    setInterval(countdownTimer, 1000);
    
    setTimeout(function () {
        preloader.remove();
        timerbox.style.display = 'flex';
    }, 1000);
});

// ВИДЕО
let video = document.querySelector('video');
let videoblock = document.querySelector('.videoblock');
let isPlayed = true;

window.addEventListener('scroll', function() {
    let topdistancevideo = videoblock.getBoundingClientRect().top;
    let botdistancevideo = videoblock.getBoundingClientRect().bottom;
    if (botdistancevideo < 400 && isPlayed) {
        video.pause();
        isPlayed = false;
    }
    if (topdistancevideo > 600 && isPlayed) {
        video.pause();
        isPlayed = false;
    }
    if (botdistancevideo > 400 && topdistancevideo < 600 && !isPlayed) {
        video.play();
        isPlayed = true;
    }
});

// ЛАЙКИ
let hearts = document.querySelectorAll('.heart');
let activeLike = false;
let likeValue;

document.addEventListener('DOMContentLoaded', function(){
    let counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        let likeId = counter.dataset.id;
        if(localStorage.getItem(`likeValue_${likeId}`)){
            counter.textContent = Number(localStorage.getItem(`likeValue_${likeId}`));
            let heart = counter.previousElementSibling;
            heart.style.fill = 'red';
            activeLike = true;
        }else{
            counter.textContent = Math.floor(Math.random() * 10) + 1;
        }
    })
})

for(let like of hearts){
    like.addEventListener('click', function(){
        let numlike = like.nextElementSibling;
        let likeId = numlike.dataset.id;
        if(activeLike == false){
            like.style.fill = 'red';
            activeLike = true;
            numlike.textContent = Number(numlike.textContent) + 1;
            likeValue = numlike.textContent;
            localStorage.setItem(`likeValue_${likeId}`, likeValue)
        }else{
            like.style.fill = '#FC9EAE';
            activeLike = false;
            numlike.textContent = Number(numlike.textContent) - 1;
            localStorage.removeItem(`likeValue_${likeId}`)
        }
    })
}

// ФОРМА ОБРАТНОЙ СВЯЗИ

// отправка формы обратной связи в БД
let formrm = document.getElementById('contact');

formrm.addEventListener("submit", function(event) {
    let promise = fetch('ready.php', {
        method: 'POST',
        body: new FormData(this),
    }).then (
        response => {
            return response.text();
        }
    ).then (
        text => {
            if (text == 'good') {
                let successMessage = document.createElement("div");
                successMessage.innerText = "Заявка успешно отправлена!";
                successMessage.classList.add("success-message");
                document.body.appendChild(successMessage);
                setTimeout(function() {
                    successMessage.remove();
                }, 3000);
                formrm.reset();
            } else {
                let errorMessage = document.createElement("div");
                errorMessage.innerText = "Что-то пошло не так!";
                errorMessage.classList.add("error-message");
                document.body.appendChild(errorMessage);
                setTimeout(function() {
                    errorMessage.remove();
                }, 3000);
            }
        }
    );
    event.preventDefault();
});

// валидация для формы обратной связи
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let messageInput = document.getElementById('message');
let submitBtn = document.getElementById('submitBtn');

let nameHint = document.getElementById('nameHint');
let emailHint = document.getElementById('emailHint');
let messageHint = document.getElementById('messageHint');

nameInput.addEventListener('focus', function() {
    nameHint.classList.remove('hinthide');
    nameInput.addEventListener('input', function() {
        if (!/^[a-zA-Zа-яА-Я0-9]{2,15}$/.test(nameInput.value)) {
            nameHint.style.color = 'rgb(191, 22, 22)';
            submitBtn.disabled = true;
        } else {
           nameHint.style.color = '#199619';
           submitBtn.disabled = false;
        }
    });
})

nameInput.addEventListener('blur', function(){
    nameHint.classList.add('hinthide');
})

emailInput.addEventListener('focus', function() {
    emailHint.classList.remove('hinthide');
    emailInput.addEventListener('input', function() {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
            emailHint.style.color = 'rgb(191, 22, 22)';
            submitBtn.disabled = true;
        } else {
           emailHint.style.color = '#199619';
           submitBtn.disabled = false;
        }
    });
})

emailInput.addEventListener('blur', function(){
    emailHint.classList.add('hinthide');
})


messageInput.addEventListener('focus', function() {
    messageHint.classList.remove('hinthide');
    messageInput.addEventListener('input', function() {
        if (!/^.{10,250}$/g.test(messageInput.value)) {
            messageHint.style.color = 'rgb(191, 22, 22)';
            submitBtn.disabled = true;
        } else {
           messageHint.style.color = '#199619';
           submitBtn.disabled = false;
        }
    });
})

messageInput.addEventListener('blur', function(){
    messageHint.classList.add('hinthide');
})