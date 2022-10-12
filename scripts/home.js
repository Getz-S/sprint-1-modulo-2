import getConversations from "./getConver.js";
import getData from "./getData.js";
import { printChats } from "./dom.js";
import { printSearchChats } from "./dom.js";
import { printTopAside } from "./dom.js";

const  URLusers= 'https://server-fakewhatsapp-production.up.railway.app/users'
const  URLconvers= 'https://server-fakewhatsapp-production.up.railway.app/messages'
const userRaw = localStorage.getItem('user');
const formSearch = document.getElementById("formSearch");
const asideDefaultSection = document.getElementById('aside__defaultSection')
const asideProfileSection = document.getElementById('aside__profileSection')
const formProfileInfo = document.getElementById('aside__formPS')
const inputProfilePhoto = document.getElementById('inputProfilePhoto')
const inputName = document.getElementById('inputName')




const validationSession = () => {
    if (!userRaw) {
        location.href = 'http://127.0.0.1:5500/index.html'
    }
}

validationSession();

const handleCloseSession = () => {
    console.log('click')
    localStorage.clear();
    location.href = 'http://127.0.0.1:5500/index.html';
}

const renderChats = async () => {
    const users = await getData(URLusers)
    console.log(users);
    const userLogged = JSON.parse(userRaw)
    const conversations = await getConversations(URLconvers, userLogged.id)
    console.log(conversations)
    console.log(userLogged.id);
    printChats(conversations,users,userLogged.id)
}
renderChats();

const renderTopAside = () => {
    const userLogged = JSON.parse(userRaw)
    printTopAside(userLogged)
}
renderTopAside();

const openProfileSection = async () => {
    asideDefaultSection.classList.add('aside__defaultSection--hidden')
    asideProfileSection.classList.add('aside__profileSection--show')
    const userLogged = JSON.parse(userRaw)
    inputName.value = userLogged.name
    inputProfilePhoto.value = userLogged.profilePhoto
}
const closeProfileSection = () => {
    asideProfileSection.classList.remove('aside__profileSection--show')
    asideDefaultSection.classList.remove('aside__defaultSection--hidden')
}

formSearch.addEventListener("submit", async(e) => {
    e.preventDefault();
    let chatsWithQuery = []
    const users = await getData(URLusers)
    const userLogged = JSON.parse(userRaw)
    const query = formSearch[0].value;
    const conversaciones = await getConversations(URLconvers,userLogged.id);
    conversaciones.forEach((element) => {
        if (element.idUser1 == query || element.idUser2 == query){
            chatsWithQuery.push(element)
        }
    })
    console.log(chatsWithQuery);
    printSearchChats(chatsWithQuery,users,userLogged.id)
})


formProfileInfo.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userLogged = JSON.parse(userRaw)
    let editInfo = {
        name: inputName.value,
        password: userLogged.password,
        phoneNumber: userLogged.phoneNumber,
        id: userLogged.id,
        profilePhoto: inputProfilePhoto.value,
        phrase: "Hey there! I am using Dovvy",
        online: false
      }
      console.log(editInfo)
      try {
        const res = await axios.put(`${URLusers}/${userLogged.id}`, editInfo)
        console.log(res)
      } catch (err) {
        if (err.response.status == 404) {
            console.log('Resource could not be found!')
        } else {
            console.log(err.message)
        }
      }

})



  const btnCloseSession = document.getElementById('btnCloseSession');
  btnCloseSession.addEventListener('click', handleCloseSession);


  const profileImg = document.getElementById('profileImg')
  profileImg.addEventListener('click',() => openProfileSection())

  const arrowLeft = document.getElementById('arrowLeft')
  arrowLeft.addEventListener('click',() => closeProfileSection())