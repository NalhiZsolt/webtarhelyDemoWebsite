var db = firebase.firestore();

let newElement = document.querySelectorAll('section')[0];
let answeredElement = document.querySelectorAll('section')[1];
let buttonElement = document.querySelectorAll('input')[2];
let adminEmail = document.querySelectorAll('input')[0];
let adminPwd = document.querySelectorAll('input')[1];

buttonElement.addEventListener('click', function (e) {
    e.preventDefault();
    db.collection("admins").get()
        .then(data => {
            data.forEach((doc) => {
               // console.log(`${doc.id} => ${doc.data().email}, ${doc.data().password}`);
                if (adminEmail.value === doc.data().email && adminPwd.value === doc.data().password) {
                    document.querySelector('.modal').style.display = 'none';
                    getUserList();
                }
            });
        })
        .catch(err => console.log(err));
});

function getUserList() {
    let newElement = document.querySelectorAll('section')[0];
    let answeredElement = document.querySelectorAll('section')[1];
    newElement.innerHTML = `<h2>Új üzenetek</h2>`;
    answeredElement.innerHTML = `<h2>Folyamatban lévőek</h2>`;
    
    db.collection("userSentMessage").get()
        .then(messages => {
            messages.forEach(message => {
                //console.log(`${message.id} => ${message.data().userName}`);
                renderUserList(message);
            })
        })
        .catch(err => console.log(err));
}

function renderUserList(list) {    
    let frame = document.createElement('div');
    frame.className = "frame";
    let azonosito = list.id;
    frame.innerHTML = `
         <p><span>Név: </span>${list.data().userName}</p>
         <p><span>Cím: </span>${list.data().userAddress}</p>
         <p><span>Telefonszám: </span>${list.data().userPhone}</p>
         <p><span>E-mail cím: </span>${list.data().userEmail}</p>
         <p><span>Üzenet: </span>${list.data().userMessage}</p>
         <div class="container"> 
         <p><span>Azonosító: </span>${azonosito}</p>
         <div class="buttonContainer"> 
         <button onclick="answeredMsg(this.id)" id=${azonosito} class="answer"><i class="fas fa-reply"></i></button>
         <button onclick="deleteMsg(this.id)" id=${azonosito} class="delete"><i class="fas fa-trash-alt"></i></button>
         </div>
         </div>
         `;
    if (!list.data().answered) {
        newElement.appendChild(frame);
    } else {
        answeredElement.appendChild(frame);
    }
};

function answeredMsg(id) {
    console.log(id);
    let answer = true;
    const updateData = {};
    updateData.answered = answer;
    db.collection("userSentMessage").doc(id).update(updateData).then().catch();
    getUserList();
};
function deleteMsg(id) {
    db.collection("userSentMessage").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
    }).catch((error) => {
          console.error("Error removing document: ", error);
    });
    getUserList();
}