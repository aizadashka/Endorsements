import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-447cb-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-el")
const senderEl = document.getElementById("from-input-el")
const recieverEl = document.getElementById("to-input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("endorsements-el")
const likeBtn = document.querySelector("likes")

publishBtn.addEventListener("click", function() {
    let inputValue = {}
    inputValue.endorsement = inputFieldEl.value
    inputValue.sender = senderEl.value
    inputValue.reciever = recieverEl.value
    
    
    push(endorsementsInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsEl()
        
        for (let i = itemsArray.length - 1; i >= 0 ; i--) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsEl(currentItem)
        }    
    } else {
        clearEndorsementsEl()
    }
})

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
    senderEl.value = ""
    recieverEl.value = ""
}

function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.innerHTML = `<p class="sender-reciever">To ${itemValue.reciever}</p>
        <p>${itemValue.endorsement}</p>
        <p class="sender-reciever">From ${itemValue.sender}</p>
        `
    
    endorsementsEl.append(newEl)
}
