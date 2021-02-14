export const intialState = {
    user: null
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
    }
}