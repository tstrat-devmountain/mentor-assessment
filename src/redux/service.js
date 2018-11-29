import axios from 'axios';

export const getTasks = () =>
    axios.get(`https://practiceapi.devmountain.com/api/tasks/`)
    .then( response => response.data);

export const addTask = (title) =>
    axios.post('https://practiceapi.devmountain.com/api/tasks', { title })
    .then( response => response.data);

export const removeTask = (id) =>
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
        .then( response => response.data);

export const updateTask = (id, payload) =>
    axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, payload)
    .then( response => response.data);

export const completeTask = (id) => 
    axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then( response => response.data);
