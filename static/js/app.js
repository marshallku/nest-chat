const app = document.getElementById("app");
// HACK: The uri must be like `$ORIGIN/chat/?chatId=123`
const chatRoomId = location.search.slice(1).split("=").pop() || "PUBLIC";
const user = {
    token: "",
    name: "",
};

function resetApp() {
    app.innerHTML = "";
}

function renderLoginPage() {
    app.append(
        crtElt(
            "form",
            {
                events: {
                    async submit(event) {
                        event.preventDefault();

                        const { value: name } = event.target.id;
                        const { value: password } = event.target.pw;
                        const { value: type } = event.target.type;

                        const response = await fetch(`/auth/${type}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                password,
                            }),
                        });
                        const data = await response.json();

                        user.name = name;

                        if (type !== "signup") {
                            user.token = data.token;
                            renderChatApp();
                            return;
                        }

                        const loginResponse = await fetch("/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                password,
                            }),
                        });
                        const loginData = await loginResponse.json();

                        user.token = loginData.token;
                        renderChatApp();
                    },
                },
            },
            crtElt(
                "div",
                {},
                crtElt("label", {}, crtElt("span", {}, "ID: "), crtElt("input", { id: "id", type: "text" })),
            ),
            crtElt(
                "div",
                {},
                crtElt("label", {}, crtElt("span", {}, "PW: "), crtElt("input", { id: "pw", type: "password" })),
            ),
            crtElt(
                "div",
                {},
                crtElt("span", {}, "MODE: "),
                crtElt(
                    "label",
                    {},
                    crtElt("input", { type: "radio", name: "type", value: "login", checked: true }),
                    "로그인",
                ),
                crtElt("label", {}, crtElt("input", { type: "radio", name: "type", value: "signup" }), "signup"),
            ),
            crtElt("button", { type: "submit" }, "확인"),
        ),
    );
}

function renderChatApp() {
    resetApp();

    const socket = io(`${window.location.origin}/chat`, { auth: { token: user.token } });
    const chatList = document.createElement("ul");
    const chatForm = document.createElement("form");
    const chatInput = document.createElement("input");
    const { name: userName } = user;

    const appendMessage = (message) => {
        console.log(message);
        const li = document.createElement("li");

        li.innerText = `${message.name}: ${message.text}`;

        chatList.append(li);
    };

    socket.on("Error", (message) => {
        console.log(message);
    });

    socket.on("ReceiveMessage", appendMessage);

    socket.on("FetchMessages", (messages) => {
        messages.forEach(appendMessage);
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
}

renderLoginPage();
