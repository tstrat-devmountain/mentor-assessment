import React, { Component } from "react"
import { connect } from 'react-redux';
import { getList, setList } from '../redux/reducer';
import axios from 'axios';
import ListItem from './ListItem';

import './listDisplay.css';


class ListDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }
    
    componentDidMount() {
        // do axios here to initialize redux
        this.props.getList(
            axios.get('https://practiceapi.devmountain.com/api/tasks')
            .then(res => res.data)
        );
    }

    markComplete = (id) => {
        axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
        .then( response => {
            this.props.setList(response.data);
        })
    }

    addTask = () => {
        // axios
        const { title } = this.state;
        if (title) {
            axios.post('https://practiceapi.devmountain.com/api/tasks', { title })
            .then( response => {
                this.props.setList(response.data);
                this.setState({ title: '' }); // reset input field
            })
        }
        
        
    }

    removeTask = (id) => {
        axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
        .then( response => {
            this.props.setList(response.data);
        });
    }

    render() {
        // map list to display
        const { tasks } = this.props;
        if (!tasks.length) {
            return <></>;
        }
        
        const taskList = tasks.map(task => 
            <ListItem key={task.id} task={task} completeFn={this.markComplete} removeTask={this.removeTask}/>
        );
            
        return (
            <div className="listDisplayContainer">
                <div className="task-form">
                    <h1>Add New Task:</h1>
                    <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                    <button onClick={this.addTask}>Add Task</button>
                </div>
                {taskList}
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}
export default connect(mapStateToProps, { getList, setList })(ListDisplay);