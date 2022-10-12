const URL_API = 'https://server-fakewhatsapp-production.up.railway.app/'
import { UI } from "./dom.js";

const phoneNumber = new UI('phoneNumber');
const password = new UI('password');

const form = document.getElementById('form__login');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const user = {
        phoneNumber: phoneNumber.getValue(),
        password: password.getValue(),
    }
    //validations
    for (const key in user) {
        const element = user[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await axios.get(`${URL_API}users?phoneNumber=${user.phoneNumber}&password=${user.password}`);
        if (response.status === 200) {
            if (response.data.length) {
                //save localStorage session
                localStorage.setItem('user', JSON.stringify(response.data[0]))
                location.href = 'http://127.0.0.1:5500/pages/home.html'
            }else {
                Swal.fire(
                    'Oops!',
                    'Usuario o contraseña incorrecta!',
                    'error'
                )
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

const validationSession = () => {
    const user = localStorage.getItem('user');
    if (user) {
        location.href = 'http://127.0.0.1:5500/pages/home.html'
    }
}

validationSession()

form.addEventListener('submit', (e) => { handleSubmit(e) })
