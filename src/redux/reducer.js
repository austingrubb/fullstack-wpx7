const initialState = {
    user: {
        auth0_id: 'lej4htoi3',
        name: "austin",
        email: "nndjmdmn",
        picture: "null"
    },
    memesList: [],
  }

  const LOGGED_IN = 'LOGGED_IN'
  const LOGGED_OUT = 'LOGGED_OUT'

  export default function reducer(state = initialState, action){
    switch (action.type) {
        case LOGGED_IN:
            const stateCopy = Object.assign({}, state)
            stateCopy.user = action.payload
            return stateCopy
        case LOGGED_OUT:
            return {...state, user: null}
        default: 
        return state;
    }
};

export function logIn(user){
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logOut(){
    return {
        type: LOGGED_OUT,
    }
}
