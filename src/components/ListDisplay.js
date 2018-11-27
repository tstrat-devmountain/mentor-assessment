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
        this.props.setList([{"id":0,"title":"walk the dog","description":"yo dawg!","completed":false},{"id":1,"title":"yo Dawg!","description":"snoop dog","completed":false}]);
    }

    markComplete = (id) => {
        console.log('update');
        const { tasks } = this.props;
        const newList = tasks.slice();
        newList[newList.findIndex(task => task.id === id)].completed = true;
        
        this.props.setList(newList);
    }

    addTask = () => {
        // axios

        const { tasks } = this.props;
        const newList = tasks.slice();
        const { title } = this.state;
        newList.push({
            id: Math.random() * 999,
            title,
            description: '',
            completed: false
        })
        this.props.setList(newList);
        this.setState({ title: '' }); // reset input field
    }

    removeTask = (id) => {
        console.log(id);

        const { tasks } = this.props;
        const newList = tasks.slice();
        newList.splice(newList.findIndex(task=> task.id === id), 1);
        this.props.setList(newList);
        this.setState({ title: '' }); // reset input field to regen list?
    }

    render() {
        // map list to display
        const { tasks } = this.props;
        if (!tasks.length) {
            return <></>;
        }
        
        const taskList = tasks.map(task => <ListItem key={task.id} task={task} completeFn={this.markComplete} removeTask={this.removeTask}/>);
            
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
export default connect(mapStateToProps, { setList })(ListDisplay);