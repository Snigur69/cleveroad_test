const initialState = null;

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return action.user;
        }
        default: {
            return state;
        }
    }
}