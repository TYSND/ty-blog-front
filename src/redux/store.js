import { createStore } from 'redux';

let defaultState = {
    accessToken: ""
}


let reducers = (state = defaultState, action) => {
    switch (action.type) {
        case "set_access_token":
            console.log("set_access_token")
            localStorage.setItem("ty-blog-token", action.value)
            return {
                accessToken: action.value
            }
        default:
            return state
    }
}

const store = createStore(reducers);
export default store;