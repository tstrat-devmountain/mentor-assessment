// import * from './service';

const INITIAL_STATE = {
    tasks: [],
    loading: false
}

const GET_TASKS = 'GET_TASKS';
const GET_TASKS_PENDING = 'GET_TASKS_PENDING';
const GET_TASKS_FULFILLED = 'GET_TASKS_FULFILLED';

const UPDATE_TASK = 'UPDATE_TASK';
// const UPDATE_TASK_PENDING = 'UPDATE_TASK_PENDING';
// const UPDATE_TASK_FULFILLED = 'UPDATE_TASK_FULFILLED';

const SET_LIST = 'SET_LIST';

export default function reducer (state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case GET_TASKS_PENDING:
            return {...state, loading: true};
        
        case GET_TASKS_FULFILLED:
            return { ...state, loading: false, tasks: action.payload }

        /* The following is used for testing before converting to Promises */
        case SET_LIST:
            return { ...state, loading: false, tasks: action.payload }
        case UPDATE_TASK:
            const tasks = state.tasks;
            const index = tasks.findIndex(t => t.id === action.payload.id);
            tasks[index] = { ...tasks[index], ...action.payload };

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

export const updateTask = (item) => {
    return {
        type: UPDATE_TASK,
        payload: item
    }
}