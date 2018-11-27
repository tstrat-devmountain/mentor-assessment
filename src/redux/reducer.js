// import * from './service';

const INITIAL_STATE = {
    tasks: [],
    loading: false
}

const GET_TASKS = 'GET_TASKS';
const GET_TASKS_PENDING = 'GET_TASKS_PENDING';
const GET_TASKS_FULFILLED = 'GET_TASKS_FULFILLED';

const SET_LIST = 'SET_LIST';

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TASKS_PENDING:
            return {...state, loading: true};
        
        case GET_TASKS_FULFILLED:
            return { ...state, loading: false, tasks: action.payload }
        /* The following is used for testing before converting to Promises */
        case SET_LIST:
            return { ...state, loading: false, tasks: action.payload }
        default:
            return state;
    }
}

export const getList = (promise) => {
    return {
        type: GET_TASKS,
        payload: promise
    }
}


export const setList = (newList) => {
    return {
        type: SET_LIST,
        payload: newList
    }
}
