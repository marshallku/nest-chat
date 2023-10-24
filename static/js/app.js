const socket = io("http://localhost:3443/chat");
const app = document.getElementById("app");
const chatList = document.createElement("ul");
const chatForm = document.createElement("form");
const chatInput = document.createElement("input");
const userName = prompt("Name?") || "Anonymous";

socket.on("ReceiveMessage", (message) => {
    console.log(message);
    const li = document.createElement("li");

    li.innerText = `${message.name}: ${message.text}`;

    chatList.append(li);
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("SendMessage", {
        name: userName,
        text: chatInput.value,
    });
    event.currentTarget.reset();
});

chatForm.append(chatInput);
app.append(chatList, chatForm);
