import router from "@/router";

export function authGuard() {
    let token = window.localStorage.getItem('token')
    if(token) return true
    else router.push('/')
}