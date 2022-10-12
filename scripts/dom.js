const chatsContainer = document.getElementById('aside__chats-container')
const topAside = document.getElementById('topAside')
const topChat = document.getElementById('main__top')


export class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID)
    }

    getValue() {
        return this.target.value;
    }
}

export const printTopAside = (userLogged) => {
    topAside.innerHTML = '';
    topAside.innerHTML = `
    <img src="${userLogged.profilePhoto}"
    alt="Profile photo" id="profileImg">
<button class="aside__btnCloseSession" id="btnCloseSession">Close<br>Session</button>
    `
}

export const printChats = (chats,users,idUserLogged) => {
    chatsContainer.innerHTML = '';
    chats.forEach(chat => {
        let userfriend;
        if (chat.idUser1 != idUserLogged ) {
            userfriend = chat.idUser1
        }else{
            userfriend = chat.idUser2
        }
        console.log(users)
        console.log(userfriend)
        console.log(chat);
        console.log(chat.conversation)
        const lastConver = chat.conversation[chat.conversation.length-1]
        console.log(lastConver);
        chatsContainer.innerHTML += `
        <article class="aside__chat">
        <figure>
            <img src="${users[userfriend-1].profilePhoto}"
                alt="${users[userfriend-1].name} profile photo" class="imageFriend">
        </figure>
        <div class="aside__chat-information">
            <h3>${users[userfriend-1].name}</h3>
            <p><span data-testid="msg-check" aria-label=" Inviato " data-icon="msg-check" class=""
                    style="user-select: auto;"><svg width="12" height="11" viewBox="0 0 12 11" fill="none"
                        class="" style="user-select: auto;">
                        <path
                            d="M11.155.653A.457.457 0 0 0 10.85.55a.493.493 0 0 0-.38.178L4.28 8.365 1.875 6.093a.463.463 0 0 0-.336-.146.47.47 0 0 0-.344.146l-.31.31a.445.445 0 0 0-.14.337c0 .136.046.25.14.343l2.995 2.996a.724.724 0 0 0 .502.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374l-.337-.273Z"
                            fill="currentcolor" style="user-select: auto;"></path>
                    </svg></span>${lastConver.message}</p>
        </div>
    </article>
        `
    })
}

export const printSearchChats = (chats,users,idUserLogged) => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let time = `${hours}:${minutes}`
    console.log(time)
    chatsContainer.innerHTML = '';
    chats.forEach(chat => {
        let userfriend;
        if (chat.idUser1 != idUserLogged ) {
            userfriend = chat.idUser1
        }else{
            userfriend = chat.idUser2
        }
        console.log(users)
        console.log(userfriend)
        console.log(chat);
        console.log(chat.conversation)
            chat.conversation.forEach(element => {
            chatsContainer.innerHTML += `
            <article class="aside__chat">
            <figure>
                <img src="${users[userfriend-1].profilePhoto}"
                    alt="">
            </figure>
            <div class="aside__chat-information">
                <h3>${users[userfriend-1].name}</h3>
                <p><span data-testid="msg-check" aria-label=" Inviato " data-icon="msg-check" class=""
                        style="user-select: auto;"><svg width="12" height="11" viewBox="0 0 12 11" fill="none"
                            class="" style="user-select: auto;">
                            <path
                                d="M11.155.653A.457.457 0 0 0 10.85.55a.493.493 0 0 0-.38.178L4.28 8.365 1.875 6.093a.463.463 0 0 0-.336-.146.47.47 0 0 0-.344.146l-.31.31a.445.445 0 0 0-.14.337c0 .136.046.25.14.343l2.995 2.996a.724.724 0 0 0 .502.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374l-.337-.273Z"
                                fill="currentcolor" style="user-select: auto;"></path>
                        </svg></span>${element.message}</p>
            </div>
        </article>
            `
        })

    })
}

export const printTopChat = () => {
    topChat.innerHTML = '';

}
