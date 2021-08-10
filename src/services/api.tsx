import axios, { AxiosRequestConfig } from "axios"
import React, { useEffect } from "react";

axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.post['Content-Type'] = 'application/json';

export class APIService {    
    
    async login(username:string, password:string){
        return new Promise((res, rej) => {
           axios.get(`/user`, {auth:{username, password}})
            .then((ret:any)=>{
                let user = ret.data
                axios.defaults.headers.common["Authorization"] = `token ${password}`
                sessionStorage.setItem('user', JSON.stringify(user))
                res(user)
            })
            .catch((err) => {
                rej(err)
            })
        })
    }
    
    async logout(){
        return new Promise((res, rej)=>{
            sessionStorage.removeItem('user')
            res("LOGGED OUT")
            // Auth.signOut()
            // .then((data) => {
            //     res(data)
            // })
            // .catch((err) => {
            //     rej(err)
            // })
        })
    }
    
    async getCurrentUser(){
        let _user = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')||""):undefined
        return new Promise((res, rej)=>{res(_user)})
        // return new Promise((res, rej)=>{
        //     Auth.currentAuthenticatedUser()
        //     .then(data => res(data))
        //     .catch(err => rej(err))
        // })
    }

    async getRepos(){
        return new Promise((res, rej) => {
            axios.get(`/orgs/Decathlon/repos`)
             .then((ret:any)=>{
                //  console.log("axios getRepos", ret)
                 let data = ret.data
                 res(data)
             })
             .catch((err) => {
                 rej(err)
             })
         })
    }
}