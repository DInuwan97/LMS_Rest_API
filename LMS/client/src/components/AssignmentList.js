import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

class AssignmentList extends Component {

    constructor(props){
        super(props);
        this.state = {
            assignment :[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/assignment')
        .then(respose =>{
            this.setState({assignment:respose.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    tabRow(){
        return this.state.assignment.map(function(object,i){
            return <TableRow obj={object} key={i} />
        })
    }



  render() {
    return (
      <div>
        <h1 align="center">Assignment - Exam List</h1>
        <h2>
            <table className="table table-striped" style={{marginTop:20}}>

                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Assignement Description</th>
                        <th>Deadline</th>
                    </tr>
                </thead>

                <tbody>
                    {this.tabRow()}
                </tbody>



            </table>

        </h2>
      </div>
    );
  }
}

export default AssignmentList;
