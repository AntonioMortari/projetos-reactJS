import { legacy_createStore as createStore } from "redux";

const initialState = {
    isLogged: JSON.parse(localStorage.getItem('islogged')) || false
}

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'LOGIN':
            newState = { ...state }
            newState.isLogged = true
            localStorage.setItem('islogged', JSON.stringify(newState.isLogged))

            return newState

        case 'LOGOUT':
            newState = { ...state }
            newState.isLogged = false
            localStorage.setItem('islogged', JSON.stringify(newState.isLogged))

            return newState

        default:
            return state

    }
}

const store = createStore(reducer)

export default store