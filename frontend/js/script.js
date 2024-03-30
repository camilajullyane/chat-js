const login = document.querySelector(".login");
const loginForm = document.querySelector(".login_form");
const loginInput = document.querySelector(".login_input");

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat_form");
const chatInput = document.querySelector(".chat_input");

const chatmessages = document.querySelector(".chat_messages");

const user = {id: "", name: "", color: ""}

const colors = ["aliceblue","aquamarine","brown","coral","darkkhaki","gold"]


function randomColor() {
    let i = Math.floor(Math.random() * colors.length);
    return colors[i];
}


const createMessageSelf = (content) => {
    const div = document.createElement("div");
    div.classList.add("message_self");
    div.innerHTML = content;

    return div;
} 


const createMessageOther = (content, sender, senderColor) => {
    const div = document.createElement("div");
    const span = document.createElementl("span")
    div.classList.add("message_self");
    div.innerHTML = content;

    return div;
} 


const processMessage = ({data}) => {
    const {userId, userName, userColor, content} = JSON.parse(data);

    const element = createMessageSelf(content);

    chatmessages.appendChild(element);

}


let websocket;
const handleLogin = (event) => {

    event.preventDefault();
    user.id = crypto.randomUUID(); 
    user.name = loginInput.value;
    user.color = randomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    websocket = new WebSocket("ws://localhost:8080");
    websocket.onmessage = processMessage    
}


const sendMessage = (event) => {
    event.preventDefault();
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message));
    chatInput.value = "";
}


loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);