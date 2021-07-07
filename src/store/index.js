import { createStore } from 'redux'

const initialState = {
    users: []
}

function reducer (state = initialState, action) {
    const { type, payload } = action
    console.log(payload)
    if (type === 'addUser') {
        return { ...state, users: [...state.users, payload]}
    } else if (type === 'editUser') {
        const newUsers = state.users
        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].email === localStorage.getItem('email')) {
                newUsers[i].name = payload.name
                newUsers[i].birthdate = payload.birthdate
            }
        }
        return { ...state, users: newUsers}
    } else {
        return state
    }
}

const store = createStore(reducer)

export default store