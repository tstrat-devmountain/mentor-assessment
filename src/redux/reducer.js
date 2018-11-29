// import * from './service';
import { getTasks, addTask, removeTask, updateTask, completeTask } from './service';

const INITIAL_STATE = {
    tasks: [],
    loading: false
}

const GET_TASKS = 'GET_TASKS';
const GET_TASKS_PENDING = 'GET_TASKS_PENDING';
const GET_TASKS_FULFILLED = 'GET_TASKS_FULFILLED';

const ADD_TASK = 'ADD_TASK';
const ADD_TASK_PENDING = 'ADD_TASK_PENDING'
const ADD_TASK_FULFILLED = 'ADD_TASK_FULFILLED'

const COMPLETE_TASK = 'COMPLETE_TASK'
const COMPLETE_TASK_PENDING = 'COMPLETE_TASK_PENDING'
const COMPLETE_TASK_FULFILLED = 'COMPLETE_TASK_FULFILLED'

const UPDATE_TASK = 'UPDATE_TASK'
const UPDATE_TASK_PENDING = 'UPDATE_TASK_PENDING'
const UPDATE_TASK_FULFILLED = 'UPDATE_TASK_FULFILLED'

const REMOVE_TASK = 'REMOVE_TASK'
const REMOVE_TASK_PENDING = 'REMOVE_TASK_PENDING';
const REMOVE_TASK_FULFILLED = 'REMOVE_TASK_FULFILLED';


const SET_LIST = 'SET_LIST';

export default function reducer (state = INITIAL_STATE, action) {

    switch (action.type) {
        
        case GET_TASKS_PENDING:
        case ADD_TASK_PENDING:  
        case COMPLETE_TASK_PENDING:
        case UPDATE_TASK_PENDING:
        case REMOVE_TASK_PENDING:
            return {...state, loading: true};
        
        case GET_TASKS_FULFILLED:
        case ADD_TASK_FULFILLED:
        case COMPLETE_TASK_FULFILLED:
        case UPDATE_TASK_FULFILLED:
        case REMOVE_TASK_FULFILLED:
            return {...state, loading: false, tasks: action.payload }
        
        /* The following is used for testing before converting to Promises */
        case SET_LIST:
            return { ...state, loading: false, tasks: action.payload }
        default:
            return state;
    }
}

export const getTaskList = () => {
    return {
        type: GET_TASKS,
        payload: getTasks()
    }
}

export const setList = (newList) => {
    return {
        type: SET_LIST,
        payload: newList
    }
}

export const addTaskToList = (newTask) => {
    return {
        type: ADD_TASK,
        payload: addTask(newTask)
    }
}
export const markComplete = (id) => {
    return {
        type: COMPLETE_TASK,
        payload: completeTask(id)
    }
}

export const remove = (id) => {
    return {
        type: REMOVE_TASK,
        payload: removeTask(id)
    }
}

export const update = (id, updates) => {
    return {
        type: UPDATE_TASK,
        payload: updateTask(id, updates)
    }
}