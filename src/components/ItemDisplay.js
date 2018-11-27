import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../redux/reducer';

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
    }

    reset = () => {
        const { oldItem } = this.state;
        this.setState({
            title: oldItem.title,
            description: oldItem.description,
            completed: oldItem.completed
        });
    }
    render() {
        const { title, description, completed } = this.props;
        return (
            <div className="item-display">
                <input value={title} onChange={e => this.setState({ title: e.target.value })} />
                <button onClick={e=> this.setState({ completed: !completed })}>{ completed ? 'Un-Complete' : 'Complete'}</button>
                <input value={description} onChange={e => this.setState({ description: e.target.value })} />
                
            </div>
        );
    }
}

export default connect(null, { updateTask })(ItemDisplay);