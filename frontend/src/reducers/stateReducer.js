export const intialState = {
    user: null,
    newPost: null,
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }

        case 'SET_NEW_POST':
            return { ...state, newPost: action.payload }

        default:
            return state
    }
}