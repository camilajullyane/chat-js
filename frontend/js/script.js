const login = document.querySelector(".login");
const loginForm = document.querySelector(".login_form");
const loginInput = document.querySelector(".login_input");

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat_form");
const chatInput = document.querySelector(".chat_input");


const user = {id: "", name: "", color: ""}

const colors = ["aliceblue","aquamarine","brown","coral","darkkhaki","gold"]


function randomColor() {
    let i = Math.floor(Math.random() * colors.length);
    return colors[i];
}

let websocket;
const handleSubmit = (event) => {

    event.preventDefault();
    user.id = crypto.randomUUID(); 
    user.name = loginInput.value;
    user.color = randomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    websocket = new WebSocket("ws://localhost:8080");
    websocket.onopen = () => websocket.send(`Usuário ${user.name} entrou no chat`);
    
    console.log(user);
}


loginForm.addEventListener("submit", handleSubmit);