// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React, { Component } from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import backgrounImage from './../images/bg-01.jpg'


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
                  {this.props.obj.date}
              </td>
              <td>
                  {this.props.obj.creationTime}
              </td>
              <td>
                <button onClick={this.eventHandler}>{this.props.obj.eventHandler}</button>
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
    return this.state.marks.filter(val => val.markId!==0).map((data, i) => {
        //data['eventHandler']=this.eventHandler.bin;
        return <DataTable obj={data} key={i} />;
    });
  }

  roomClassChanged(e){
    console.log(e);
    axios.get(`https://192.168.0.100/catalog/Classes.php?cmd=getClassesByClassRoomId&classRoomId=${e.value}`)
      .then(res => {
        console.log(res.data);
        let selectClassOptions = res.data.map(d => ({
          "value" : d.classeId,
          "label" : d.name
        }))
        this.setState({ classes: res.data , selectClassOptions: selectClassOptions, selectedRoomClass: e.value});
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
          "label" : d.student.name
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
    this.setState({ selectedStudent: e.value});
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
    this.setState({markValue: event.value});
  }

  markDateChanged(event) {
    console.log(event);
    let date=new Date(event+" UTC")
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
    console.log(date);
    this.setState({markDate: date, markDisplayedDate: event});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    axios.post(`http://localhost/catalog/Marks.php?cmd=addMark`, {classeId:this.state.selectedClass, studentId:this.state.selectedStudent, teacherId:1, 
                                              value:this.state.markValue, date:this.state.markDate})
    .then(res => {
      console.log(res.data);
      //this.setState({ classes: res.data , marks: res.data});
    })
    .catch(function (error) {
      console.log(error);
    });

    event.preventDefault();
  }

  eventHandler(event)
  {
    console.log(event)
  }

  render() {

    let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

    return (
      
      <div>

        <div className="bg-contact3" style={{ backgroundImage:`url(${backgrounImage})` }}>
          <div className="container-contact3">
            <div className="wrap-contact3">
              <form className="contact3-form validate-form">
                <span className="contact3-form-title">
                  Catalog Scolar
					</span>
                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <input className="input3" type="text" name="name" placeholder="Your Name" />
                  <span className="focus-input3"></span>
                </div>
                <div className="wrap-input3 input3-select">
                  <div>
                    <select className="selection-2" name="service">
                      <option>Needed Services</option>
                      <option>eCommerce Bussiness</option>
                      <option>UI/UX Design</option>
                      <option>Online Services</option>
                    </select>
                  </div>
                  <span className="focus-input3"></span>
                </div>

                <div className="container-contact3-form-btn">
                  <button className="contact3-form-btn">
                    Submit
						</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Tab;