import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
    const { task } = props;
    const c = task.completed 
        ? 
        { 
            textDecoration: 'line-through',
            cursor: 'no-drop'
        } 
        : { }

    return (
        <div className="task" style={task.completed ? {textDecoration: 'line-through'} : {}}>
            <Link to={`/${task.id}`}><h1>{task.title}</h1></Link>
            {/* <p>{task.description}</p> */}
            <div>
            <button style={c} onClick={() => task.completed ? null : props.completeFn(task.id) }>Complete</button>
            <i className="fas fa-times" onClick={() => props.removeTask(task.id)}></i>
            </div>

        </div>
    );
};

export default ListItem;