var db = firebase.firestore();

const cardBlue = document.querySelector('#main .card-container .blue');
const cardYellow = document.querySelector('#main .card-container .yellow');
const cardGreen = document.querySelector('#main .card-container .green');
const tl = new TimelineMax();
tl.fromTo(cardBlue, 0.3, {y: "10%"}, {y: "0%", ease: Power2.easeInOut}, "= 0.3")
.fromTo(cardBlue, 0.3, {opacity: 0}, {opacity: 1}, "-= 0.3")
.fromTo(cardYellow, 0.3, {y: "10%",  x: -30}, {y: "0%", x: 0 , ease: Power2.easeInOut}, "= -0.1")
.fromTo(cardYellow, 0.3, {opacity: 0}, {opacity: 1}, "-= 0.3")
.fromTo(cardGreen, 0.3, {y: "10%", x: 30}, {y: "0%", x: 0, ease: Power2.easeInOut}, "= -0.1")
.fromTo(cardGreen, 0.3, {opacity: 0}, {opacity: 1 }, "-= 0.3")





function myMenuFunction(x) {
    x.classList.toggle("change");
}
let searchBox = document.querySelectorAll('.search-box input[type="text"] + span ');
searchBox.forEach(elm => {
    elm.addEventListener('click', () => {
        elm.previousElementSibling.value = '';
    });
});


//logo

// const logo = document.querySelectorAll('.logo path');
// for( let i = 0; i<logo.length;i++) {
//     console.log(`Letter ${i} is ${logo[i].getTotalLength()}`)
// }

const city = document.querySelector('#city');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal button');
let cityName =  document.querySelector('.modal .cityname');
let cityAddress =  document.querySelector('.modal .cityaddress');
let cityPhone =  document.querySelector('.modal .cityphone');
function kereses(event) {
    let x = event.keyCode;
    if (x == 13) {
        console.log(city.value);
        modal.style.display = "flex";
        cityName.innerHTML = city.value;
        let varos = city.value;
        cityAddress.innerHTML = 'Sajnos az Ön tartózkodási helyén nincs irodánk.';
        cityPhone.innerHTML = ''; 
        db.collection("irodak").get()
        .then( data => data.forEach(doc => { console.log( `${doc.id} => ${doc.data().city}` );
        
        if (varos == doc.data().city) {
                cityAddress.innerHTML = doc.data().address;
                cityPhone.innerHTML = doc.data().phone;
            } 
        }))
        .catch(err => console.log(err))
    }
}
modalButton.addEventListener('click', () => {
    modal.style.display = "none";
});

//form validáció
$(function () {
    let name = $("#name");
    let address = $("#address");
    let email = $("#email");
    let phone = $("#phone");
    let message = $("#message");
    $("#submitButton").on("click", function (e) {
        const patternNameValid = /^[A-Z].{3,30}$/;
        const patternAddressValid = /^[A-Z].{3,30}$/;
        const patternEmailValid = /^[\w].{3,30}@.+\..+$/;
        const patternPhoneValid = /^\+[\d() -]+$/;
        if(!patternNameValid.test(name.val())){
            $(name).css("border", "1px solid red");
            e.preventDefault();
        } else {
            $(name).css("border", "1px solid green");
        }
        if(!patternAddressValid.test(address.val())) {
            $(address).css("border", "1px solid red");
            e.preventDefault();
        } else {
            $(address).css("border", "1px solid green");
        }
        if(!patternEmailValid.test(email.val())) {
            $(email).css("border", "1px solid red");
            e.preventDefault();
        } else {
            $(email).css("border", "1px solid green");
        }
        if(!patternPhoneValid.test(phone.val())) {
            $(phone).css("border", "1px solid red");
            e.preventDefault();
        } else {
            $(phone).css("border", "1px solid green");
        }
        if($(message).val() ==='') {
            $(message).css("border", "1px solid red");
            e.preventDefault();
        } else {
            $(message).css("border", "1px solid green");
        }
        if(patternNameValid.test(name.val()) && patternAddressValid.test(address.val()) && patternEmailValid.test(email.val()) && patternPhoneValid.test(phone.val()) && message !== '') {
            let userSentMsg = {
                userName: $(name).val(),
                userAddress: $(address).val(),
                userEmail: $(email).val(),
                userPhone: $(phone).val(),
                userMessage: $(message).val(),
                answered: false
            }
            //saveUser(userSentMessage);
            e.preventDefault();
            db.collection("userSentMessage").add(userSentMsg)
                .then(data => {console.log('message saved with' + data.id); location.reload();})
                .catch(err => console.log(err));

        }
    })
   
});
function saveUser(user) {
    const http = new XMLHttpRequest();
    const URL = 'http://localhost:3000/userSentMessage';
    const jsonUser = JSON.stringify(user);
    http.open('POST', URL);
    http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    http.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 201) {
            console.log(this.responseText);
        }
    }
    http.send(jsonUser);
}
// Apolka része itt kezdődik
function myFunction1() {
    var dots1 = document.getElementById("dots1");
    var moreText1 = document.getElementById("more1");
    var btnText1 = document.getElementById("learnmore1");
  
    if (dots1.style.display === "none") {
      dots1.style.display = "inline";
      btnText1.innerHTML = "tudj meg többet"; 
      moreText1.style.display = "none";
    } else {
      dots1.style.display = "none";
      btnText1.innerHTML = "elrejtés"; 
      moreText1.style.display = "inline";
    }
}

function myFunction2() {
    var dots2 = document.getElementById("dots2");
    var moreText2 = document.getElementById("more2");
    var btnText2 = document.getElementById("learnmore2");
  
    if (dots2.style.display === "none") {
      dots2.style.display = "inline";
      btnText2.innerHTML = "tudj meg többet"; 
      moreText2.style.display = "none";
    } else {
      dots2.style.display = "none";
      btnText2.innerHTML = "elrejtés"; 
      moreText2.style.display = "inline";
    }
}

function myFunction3() {
    var dots3 = document.getElementById("dots3");
    var moreText3 = document.getElementById("more3");
    var btnText3 = document.getElementById("learnmore3");
  
    if (dots3.style.display === "none") {
      dots3.style.display = "inline";
      btnText3.innerHTML = "tudj meg többet"; 
      moreText3.style.display = "none";
    } else {
      dots3.style.display = "none";
      btnText3.innerHTML = "elrejtés"; 
      moreText3.style.display = "inline";
    }
}

window.addEventListener('scroll', ()=> {
  let content = document.querySelector('.icons.group');
  let contentPosition = content.getBoundingClientRect().top;
  let screenPosition = window.innerHeight; 
  if(contentPosition < screenPosition) {
      content.classList.add('start') 
  } else {
      content.classList.remove('start')
  }
})

window.addEventListener('scroll', ()=> {
  let content = document.querySelector('.icons.connection');
  let contentPosition = content.getBoundingClientRect().top;
  let screenPosition = window.innerHeight; 
  if(contentPosition < screenPosition) {
      content.classList.add('start') 
  } else {
      content.classList.remove('start')
  }
})

window.addEventListener('scroll', ()=> {
  let content = document.querySelector('.icons.headset');
  let contentPosition = content.getBoundingClientRect().top;
  let screenPosition = window.innerHeight; 
  if(contentPosition < screenPosition) {
      content.classList.add('start') 
  } else {
      content.classList.remove('start')
  }
})


// AOS.init({
//   duration: 2000,
//   easing: 'ease-out-cubic'
// });

// Apolka része itt végződik

