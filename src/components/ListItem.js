import React from 'react';
import { strikethrough } from 'ansi-colors';

const ListItem = (props) => {
    const { task } = props;
    const c = task.completed 
        ? 
        { 
            textDecoration: 'line-through',
            cursor: 'no-drop'
        } 
        : { }

    console.log(task.completed);
    return (
        <div className="task" style={task.completed ? {textDecoration: 'line-through'} : {}}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <button style={c} onClick={() => task.completed ? null : props.completeFn(task.id) }>Complete</button>
            <button onClick={() => props.removeTask(task.id)}>Delete</button>

        </div>
    );
};

export default ListItem;