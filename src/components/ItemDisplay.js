import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setList } from '../redux/reducer';
import axios from 'axios';

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
                const index = this.props.tasks.findIndex(task => task.id === parseInt(this.props.match.params.id));
                const displayItem = this.props.tasks[index];
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
        if (id) {
            const payload = {
                title: title || oldItem.title,
                description: description || oldItem.description,
                completed,
            }
            axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, payload)
            .then( response => {
                this.props.setList(response.data);
                this.clearFields();
                this.props.history.push('/');
            })
            
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

    removeTask = (id) => {
        axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
        .then( response => {
            this.props.setList(response.data);
            this.props.history.push('/');
        });
    }

    render() {
        const { title, description, completed } = this.state;
        return (
            <div className="item-display">
                <input value={title} onChange={e => this.setState({ title: e.target.value })} />
                <button onClick={e=> this.setState({ completed: !completed })}>{ completed ? 'Un-Complete' : 'Complete'}</button>
                <input value={description} onChange={e => this.setState({ description: e.target.value })} />
                <button onClick={this.clearFields}>Reset</button>
                <button onClick={this.removeTask}>Delete</button>
                <button onClick={this.submit}>Save</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { setList })(ItemDisplay);