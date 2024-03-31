const login = document.querySelector(".login");
const loginForm = document.querySelector(".login_form");
const loginInput = document.querySelector(".login_input");

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat_form");
const chatInput = document.querySelector(".chat_input");

const chatMessages = document.querySelector(".chat_messages");

const user = {id: "", name: "", color: ""};

const colors = ["aliceblue","aquamarine","brown","coral","darkkhaki","gold"];


function randomColor() {
    let i = Math.floor(Math.random() * colors.length);
    return colors[i];
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}


const createMessageSelfElement = (content) => {
    const div = document.createElement("div");
    div.classList.add("message_self");
    div.innerHTML = content;

    return div;
} 


const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div");
    div.classList.add("message_other");
    const span = document.createElement("span");
    span.classList.add("message_sender");

    div.appendChild(span);

    span.innerHTML = sender;
    span.style.color = senderColor;

    div.innerHTML += content;

  

    return div;
} 


const processMessage = ({data}) => {
    const {userId, userName, userColor, content} = JSON.parse(data);

    if(userId == user.id) {
        const element = createMessageSelfElement(content);
        chatMessages.appendChild(element);
        scrollScreen();

    } else {
        const element = createMessageOtherElement(content, userName, userColor);
        chatMessages.appendChild(element);
        scrollScreen();

    }


}


let websocket;
const handleLogin = (event) => {

    event.preventDefault();
    user.id = crypto.randomUUID(); 
    user.name = loginInput.value;
    user.color = randomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    websocket = new WebSocket("wss://backend-cfc7.onrender.com");
    websocket.onmessage = processMessage;
    scrollScreen()    
}

const sendMessage = (event) => {
    event.preventDefault();
//Cria outro objeto com todas as infos e agora o conteudo da mensagem

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    //Converte o objeto para string
    websocket.send(JSON.stringify(message));
    chatInput.value = "";
}


loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);