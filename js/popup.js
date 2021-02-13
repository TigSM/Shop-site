const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length>0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
    
}

const popupCloseIcon = document.querySelectorAll('.popup-close');

if (popupCloseIcon.length>0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
    
}

function popupOpen(curentPopup) {
if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) { 
        popupClose(popupActive, false);
        } 
        else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {  
        if(!e.target.closest('.popup-content')) {
            popupClose(e.target.closest('.popup'));
        }  
        })    
}
} 

function popupClose(popupActive, dounlock = true) { 

    if(unlock) {
        popupActive.classList.remove('open');
        if(dounlock) {
            bodyUnLock();
        }
    }
        
    
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.all = lockPaddingValue;
        }
        body.style.all= lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout( function () {
            unlock=true;
    }, timeout);
}

function bodyUnLock() {

    setTimeout( function () {
        for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.padding = '0px';
    }
        body.style.all = '0px';
        body.classList.remove('lock');
}, timeout);

        unlock = false;
        setTimeout( function () {
            unlock=true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
            
            
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }

})

// let form;

// function findElements() {
//   form = document.querySelector('popup-content');
// }

// function showMessage(data) {
//   alert(data.id);
// }

// function onSuccess(data) {
//   showMessage(data);
// }

// function onError(data) {
// 	console.error(data);
// }

// function collectData(currentForm) {
//   return new FormData(currentForm);
// }

// function setOptions(currentForm) {
//   return {
//     method: 'post',
//     body: collectData(currentForm),
//   };
// }

// function sendForm(currentForm) {
//   return fetch(currentForm.action, setOptions(currentForm));
// }

// function onSubmit(event) {
//   event.preventDefault();
//   const { currentTarget } = event;
//   sendForm(currentTarget)
// 		.then(response => response.json())
//     .then(data => onSuccess(data, currentTarget))
// 		.catch(onError);
// }

// // function subscribe() {
// //   form.addEventListener('submit', onSubmit);
// // }

// // function init() {
// //   findElements();
// //   subscribe();
// // }

// init();

(function() {

  // проверяем поддержку
    if (!Element.prototype.closest) {

    // реализуем
        Element.prototype.closest = function(css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
        return null;
    };
    }

})();

(function() {

  // проверяем поддержку
    if (!Element.prototype.matches) {

    // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;

    }

})();