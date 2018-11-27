import React, { Component } from "react"
import { connect } from 'react-redux';
import { getList, setList } from '../redux/reducer';
import axios from 'axios';


class ListDisplay extends Component {
    
    componentDidMount() {
        // do axios here to initialize redux
        this.props.setList([{"id":0,"title":"walk the dog","description":"yo dawg!","completed":true},{"id":1,"title":"yo Dawg!","description":"snoop dog","completed":true}]);
    }



    render() {
        // map list to display
        console.log('list display', this.props.tasks);
        const { tasks } = this.props;
        if (!tasks.length) {
            return <></>;
        }
        
        const taskList = tasks.map(task => {
            return (
                <div>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            )
        })
        return (
            <div>
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