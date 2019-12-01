import axios from 'axios';

export const register = newUser =>{
    return axios
    .post('users/register',{
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        email:newUser.email,
        password:newUser.password
    })
    .then(res =>{
        console.log("Registered");
        window.alert("Registered");
    })
}


export const login = users =>{
    return axios
    .post(users/login,{
        email:users.email,
        password:users.password
    })
    .then(res =>{
        localStorage.setItem('usertoken',res.data); //create the session
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}