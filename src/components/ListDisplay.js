import React, { Component } from "react"
import { connect } from 'react-redux';
import { getTaskList, markComplete, addTaskToList, remove } from '../redux/reducer';
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
        this.props.getTaskList();
    }


    markComplete = (id) => {
        this.props.markComplete(id);
    }

    addTask = () => {
        const { title } = this.state;
        if (title) {
            this.props.addTaskToList(title);
            this.setState({title: ''});
        }
        
    }

    removeTask = (id) => {
        this.props.remove(id);
    }

    render() {
        // map list to display
        const { tasks, loading } = this.props;
        
        
        const taskList = tasks.map(task => 
            <ListItem key={task.id} task={task} completeFn={this.markComplete} removeTask={this.removeTask}/>
        );
            
        return (
            <div className="listDisplayContainer">
                <div className="task-form">
                    <h1>TO-DO:</h1>
                    <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                    <button onClick={this.addTask}>Add New Task</button>
                    <div className={`loading ${loading ? "show":"hide"}`}>{loading? 'Loading...' : ''}</div>
                </div>
                <div className='task-list'>
                    {taskList}
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        loading: state.loading
    }
}
export default connect(mapStateToProps, { addTaskToList, getTaskList, markComplete, remove })(ListDisplay);