import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setList, remove, update } from '../redux/reducer';
import { Link } from 'react-router-dom'
import axios from 'axios';

import './itemDisplay.css';

class ItemDisplay extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            description: '',
            completed: false,
            oldItem: {}
        }
    }

    componentDidMount() {
        // get from params with axios so that it isn't redux dependant
        if (this.props.tasks.length) {
            const index = this.props.tasks.findIndex(task => task.id === parseInt(this.props.match.params.id));
            const displayItem = this.props.tasks[index];
            this.setDisplayItem(displayItem);
        
        } else {
            axios.get('https://practiceapi.devmountain.com/api/tasks')
            .then( response => {
                this.props.setList(response.data); // fill in redux in case its not there already
                const index = response.data.findIndex(task => task.id === parseInt(this.props.match.params.id));
                const displayItem = index >= 0 ? response.data[index] : {};
                this.setDisplayItem(displayItem);
            })
        }
    }


    setDisplayItem = (displayItem) => {
        this.setState({
            title: displayItem.title,
            description: displayItem.description,
            completed: displayItem.completed,
            oldItem: displayItem
        })
    }
    reset = () => {
        const { oldItem } = this.state;
        this.setState({
            title: oldItem.title,
            description: oldItem.description,
            completed: oldItem.completed
        });
    }

    submit = () => {
        const { title, description, completed, oldItem } = this.state;
        const id = oldItem.id;

        if (id || id === 0) {
            const payload = {
                title: title || oldItem.title,
                description: description || oldItem.description,
                completed,
            }
            this.props.update(id, payload);
            this.clearFields();
            this.props.history.push('/');
        }
    }

    clearFields = () => {
        const { oldItem } = this.state;
        this.setState({
            title: oldItem.title || '',
            description: oldItem.description || '',
            completed: oldItem.completed || false
        })
    }

    removeTask = () => {
        this.props.remove(this.state.oldItem.id);
        this.props.history.push('/');
    }

    render() {
        const { title, description, completed } = this.state;
        return (
            <div className="item-display">
                <Link to='/'>◀ Back to Tasks</Link>
                <h1>Task:</h1>
                <div className="title">
                    <input value={title} onChange={e => this.setState({ title: e.target.value })} />
                    <button onClick={e=> this.setState({ completed: !completed })}>{ completed ? 'Un-Complete' : 'Complete'}</button>
                </div>
                <h1>Description:</h1>
                <textarea type="text" className="textbox" value={description} 
                    onChange={e => {
                        this.setState({ description: e.target.value })
                        e.target.style.height = `${e.target.scroll.height + 3}px`;
                    }} 
                />
                <div className="buttons">
                <button className="reset" onClick={this.clearFields}>Reset</button>
                <button onClick={this.removeTask}>Delete</button>
                <button className="save" onClick={this.submit}>Save</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { setList, remove, update })(ItemDisplay);