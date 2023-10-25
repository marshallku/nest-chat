const socket = io(`${window.location.origin}/chat`);
const app = document.getElementById("app");
const chatList = document.createElement("ul");
const chatForm = document.createElement("form");
const chatInput = document.createElement("input");
const userName = prompt("Name?") || "Anonymous";
// HACK: The uri must be like `$ORIGIN/chat/?chatId=123`
const chatRoomId = location.search.slice(1).split("=").pop() || "PUBLIC";

socket.on("ReceiveMessage", (message) => {
    console.log(message);
    const li = document.createElement("li");

    li.innerText = `${message.name}: ${message.text}`;

    chatList.append(li);
});

socket.emit("Connect", {
    name: userName,
    chatRoomId,
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("SendMessage", {
        name: userName,
        text: chatInput.value,
        chatRoomId,
    });
    event.currentTarget.reset();
});

chatForm.append(chatInput);
app.append(chatList, chatForm);
