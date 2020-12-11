// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React, { Component } from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class DataTable extends Component {
  render() {
      return (
          <tr>
              <td>
                  {this.props.obj.markId}
              </td>
              <td>
                  {this.props.obj.value}
              </td>
              <td>
                  {this.props.obj.class}
              </td>
              <td>
                  {this.props.obj.creationTime}
              </td>
          </tr>
      );
  }
}


/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: {},
      marks: [{ value: '' }],
      value: "asd",
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
    });

    axios.get('https://192.168.0.100/catalog/ClassRooms.php?cmd=getClassRooms')
      .then(res => {
        let selectOptions = res.data.map(d => ({
          "value" : d.classRoomId,
          "label" : d.name
        }))
        this.setState({ classes: res.data , selectOptions: selectOptions});
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Next steps: Error handling using the error object
  }

  dataTable() {
    return this.state.marks.map((data, i) => {
        return <DataTable obj={data} key={i} />;
    });
  }

  roomClassChanged(e){
    console.log(e);
    axios.get(`https://192.168.0.100/catalog/Classes.php?cmd=getClassesByClassRoomId&classRoomId=${e.value}`)
      .then(res => {
        let selectClassOptions = res.data.map(d => ({
          "value" : d.classeId,
          "label" : d.name
        }))
        this.setState({ classes: res.data , selectClassOptions: selectClassOptions, selectedRoomClass: e.value});
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  classChanged(e){
    console.log(e);
    axios.get(`http://localhost/catalog/StudentClasses.php?cmd=getStudentClassesByClasseId&classeId=${e.value}`)
      .then(res => {
        let selectStudentOptions = res.data.map(d => ({
          "value" : d.student.studentId,
          "label" : d.student.firstName
        }))
        this.setState({ classes: res.data , selectStudentOptions: selectStudentOptions, selectedClass: e.value});
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  studentChanged(e){
    console.log(e);
    axios.get(`http://localhost/catalog/Marks.php?cmd=getMarksByClasseIdStudentId&classeId=${this.state.selectedClass}&studentId=${e.value}`)
      .then(res => {
        console.log(res.data);
        this.setState({ classes: res.data , marks: res.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(event) {
    console.log(event);
    this.setState({value: event.target.value});
  }

  markChanged(event) {
    console.log(event);
    //this.setState({value: event.target.value});
  }

  markDateChanged(event) {
    console.log(event);
    this.setState({markDate: event});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {

    let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

    return (
      <div>
        <h3>Hello World!</h3>
        <h1>Congratulations {userName}!</h1> <h3>This is the tab you made :-)</h3>
        <div>
        <Select options={this.state.selectOptions} onChange={this.roomClassChanged.bind(this)}/>
        <Select options={this.state.selectClassOptions} onChange={this.classChanged.bind(this)}/>
        <Select options={this.state.selectStudentOptions} onChange={this.studentChanged.bind(this)}/>
      </div>
        <table className="table table-striped table-dark">
          <thead className="thead-dark">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>CreationTime</td>
            </tr>
          </thead>
          <tbody>
            {this.dataTable()}
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Nota:
          </label>
          <Select options={[{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }, { value: 6, label: 6 },
          { value: 7, label: 7 }, { value: 8, label: 8 }, { value: 9, label: 9 }, { value: 10, label: 10 }]} onChange={this.markChanged.bind(this)} />
          <label>
            Name:
          </label>
          <input type="text" onChange={this.handleChange.bind(this)} />
          
          <input type="submit" value="Submit" />
        </form>
        <DatePicker   
            onChange={this.markDateChanged.bind(this)}
            selected={this.state.markDate}
            
          />

      </div>
    );
  }
}
export default Tab;