const URL_API = 'https://server-fakewhatsapp-production.up.railway.app/'
import { UI } from "./dom.js";

const name = new UI('name')
const phoneNumber = new UI('phoneNumber')
const password = new UI('password')

const form = document.getElementById('form__register')

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const newUser = {
        name: name.getValue(),
        phoneNumber: phoneNumber.getValue(),
        password: password.getValue(),
        profilePhoto: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
        phrase: 'Hey there! I am using Dovvy',
        online: false
    }
    //validations
    for (const key in newUser) {
       const element = newUser[key];
       if (element === '') {
        alert(`Falta llenar el campo ${key}`)
        return;
       }
    }
    //send to back
    try {
        let response = await axios.post(`${URL_API}users`, newUser);
        if (response.status === 201) {
            Swal.fire(
                'Good job!',
                'User created successfully',
                'success'
              )
        }
    } catch (error) {
        Swal.fire(
            'Oops',
            'An error has occurred',
            'error'
          )
    }
}

form.addEventListener('submit', (e) => {handleSubmit(e)})

