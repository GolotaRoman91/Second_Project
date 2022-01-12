import "core-js/stable";
import "regenerator-runtime/runtime";
import { bodySignUp } from './types';
import { bodySignIn } from './types';
import { DOM } from './dom'
checkToken();
async function sendRequest(method: string, url: string, body: bodySignUp): Promise<string> {
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    });
    return response.json();
}
export async function modal(): Promise<void> {
    showMessage();
    async function showMessage() {
        const bodySignUp = {
            password: DOM.password.value,
            login: DOM.login.value,
            first_name: DOM.firstname.value,
            last_name: DOM.surname.value
        };
        const data = await sendRequest('POST', DOM.requestURl, bodySignUp)
        console.log(data)
        checkResponse(data, bodySignUp)
    }
}
async function checkResponse(data: any, bodySignUp: bodySignUp): Promise<void> {
    switch (true) {
    case (data === "Registration successful"): {
        DOM.wrapUp.classList.add("hidden"),
        DOM.wrapIn.classList.remove("hidden")
        break;
    }
    case (data === `User with login ${bodySignUp.login} already exist`): {
        DOM.outputUp.innerHTML = data.message;
        break;
    }
    case (!!data.message.status): {
        DOM.outputUp.innerHTML = data.message.data;
        break;
    }
    case (!!data.first_name): {
        DOM.outputUp.innerHTML = data.first_name;
        break;
    }
    case (!!data.last_name): {
        DOM.outputUp.innerHTML = data.last_name;
        break;
    }
    default: {
        DOM.outputUp.innerHTML = "Invalid data";
    }
    }
}
export function checkToken(): void {
    if (!localStorage.getItem('token')) {
        DOM.wrapRegistr.classList.remove("hidden")
        DOM.filmsArea.classList.add("hidden")
        DOM.navigationRight.classList.add("hidden")
    } else {
        DOM.wrapRegistr.classList.add("hidden")
        DOM.filmsArea.classList.remove("hidden")
        DOM.navigationRight.classList.remove("hidden")

    }

}
async function sendRequestSignIn(method: string, url: string, body: bodySignIn) {
    console.log(body)
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers
        });
        const data = await response.json()
        if (data.accessToken) {
            return data;
        } else {
            throw new Error()
        }
    } catch (error) {
        return "Invalid data"
    }
}
export async function signIn(): Promise<void> {
    const bodySignIn = {
        login: DOM.username.value,
        password: DOM.userpass.value
    }
    const result = await sendRequestSignIn('POST', DOM.requestURlsignIn, bodySignIn);
    if (result === "Invalid data") {
        DOM.outputIn.innerHTML = "Invalid password or username"
    } else {
        localStorage.setItem('token', JSON.stringify(result.accessToken))
    }
    checkToken()
}
export function toSignUp(): void {
    DOM.wrapIn.classList.remove("hidden")
    DOM.wrapUp.classList.add("hidden")
}
export function toSignIn(): void {
    DOM.wrapIn.classList.add("hidden")
    DOM.wrapUp.classList.remove("hidden")
}
export function signOut(): void {
    localStorage.removeItem('token');
    checkToken();
}