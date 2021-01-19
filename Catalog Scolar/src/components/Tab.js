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
                  {this.props.obj.value}
              </td>
              <td>
                  {this.props.obj.date}
              </td>
              <td>
                  {this.props.obj.classe.name}
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
      marks: [{ value: '' , classe: {name: ""}}],
      value: "asd",
      student: {name: ""},
      selectedStudent: {value: "", label: "Select.."},
      selectedClass: {value: "", label: "Select.."},
      markValue: 0,
      
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

      console.log(this.state.context);

      if (this.state.context['userLicenseType'] === "Teacher") {
        axios.post('https://automations.avramiancuturda.ro/api/Authentication.php?cmd=addToken', { username: this.state.context['upn'], password: this.state.context['userObjectId'] })
          .then(res => {
            console.log(res.data);
            if(res.data.tokenId === 0)
            {
              alert("Drepturi acces lipsa!");
              return;
            }
            if(res.data.tokenUser.type !== "0")
            {
              console.log(res.data.tokenUser);
              alert("Drepturi acces lipsa profesor!");
              return;
            }
            this.setState({ token: res.data});

            axios.get(`https://automations.avramiancuturda.ro/api/ClassRooms.php?cmd=getClassRooms&token=${this.state.token.value}`)
              .then(res => {
                let selectOptions = res.data.map(d => ({
                  "value": d.classRoomId,
                  "label": d.name
                }))
                this.setState({ classes: res.data, selectOptions: selectOptions });
                console.log(res.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else if (this.state.context['userLicenseType'] === "Student") {
        //this.state.context['upn'] = "codrut.ciurcui@avramiancuturda";
        //this.state.context['userObjectId'] = "cristiana.giurgiu@avramiancutu";
        axios.post('https://automations.avramiancuturda.ro/api/Authentication.php?cmd=addToken', { username: this.state.context['upn'], password: this.state.context['userObjectId'] })
          .then(res => {
            console.log(res.data);
            if(res.data.tokenId===0){
              alert("Drepturi acces lipsa!");
              return
            }
            if (res.data.tokenUser.type !== "1") {
              alert("Drepturi acces lipsa elev!");
              return;
            }
            this.setState({ token: res.data, tokenType: 0});
            

            axios.get(`https://automations.avramiancuturda.ro/api/Students.php?cmd=getStudentsByEmail&email=${this.state.token.tokenUser.username}&token=${this.state.token.value}`)
            .then(res => {
              console.log(res.data);
              this.setState({ student: res.data[0]});

              axios.get(`https://automations.avramiancuturda.ro/api/Marks.php?cmd=getMarksByStudentId&studentId=${this.state.student.studentId}&token=${this.state.token.value}`)
                .then(res => {
                  console.log(res.data);
                  console.log(res.data[0].markId)
                  if(res.data[0].markId === 0)
                  {
                    res.data = [{ value: 'Nicio nota incarcata' , date: new Date(), classe: {name: ""}}]
                  }
                  this.setState({ classes: res.data , marks: res.data});
                })
                .catch(function (error) {
                  console.log(error);
                });
              
            })
            .catch(function (error) {
              console.log(error);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });

    
    // Next steps: Error handling using the error object
  }

  dataTable() {
    return this.state.marks.filter(val => val.markId!==0).map((data, i) => {
        //data['eventHandler']=this.eventHandler.bin;
        console.log(data.date);
        let date=new Date(data.date+" UTC")
        console.log(date);
        let data2=data;
        data2.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return <DataTable obj={data2} key={i} />;
    });
  }

  checkPrimaryClass(text) {
    return text.includes("CP") || text.includes("a I-a") || text.includes("a II-a") || text.includes("a III-a") || text.includes("a IV-a");
  }

  convertMarkToPrimaryMark(mark) {
    if(mark === "1")
      return "I";
    if(mark === "2")
      return "S";
    if(mark === "3")
      return "B";
     if(mark === "4")
      return "FB";
    return mark;
  }

  roomClassChanged(e){
    console.log(e);
    let availableMarks = [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }, { value: 6, label: 6 },
      { value: 7, label: 7 }, { value: 8, label: 8 }, { value: 9, label: 9 }, { value: 10, label: 10 }]
    if(this.checkPrimaryClass(e.label)) {
      availableMarks = [{ value: 1, label: 'I' }, { value: 2, label: 'S' }, { value: 3, label: 'B' }, { value: 4, label: 'FB' }]
    }
    this.setState({selectedStudent: {value: "", label: "Select.."}, selectedClass: {value: "", label: "Select.."},selectStudentOptions:[], availableMarks: availableMarks})
    axios.get(`https://automations.avramiancuturda.ro/api/Classes.php?cmd=getClassesByClassRoomId&classRoomId=${e.value}&token=${this.state.token.value}`)
      .then(res => {
        console.log(res.data);
        let selectClassOptions = res.data.map(d => ({
          "value" : d.classeId,
          "label" : d.name
        }))
        this.setState({ classes: res.data , selectClassOptions: selectClassOptions, selectedRoomClass: e.value, selectedRoomClassLabel: e.label});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  classChanged(e){
    console.log(e);
    this.setState({selectedClass: e});
    axios.get(`https://automations.avramiancuturda.ro/api/StudentClasses.php?cmd=getStudentClassesByClasseId&classeId=${e.value}&token=${this.state.token.value}`)
      .then(res => {
        console.log(res.data);
        let selectStudentOptions = res.data.map(d => ({
          "value" : d.student.studentId,
          "label" : d.student.name
        }))
        this.setState({ classes: res.data , selectStudentOptions: selectStudentOptions, selectedStudent: {value: "", label: "Select.."}});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  studentChanged(e){
    console.log(e);
    this.setState({ selectedStudent: e});
    axios.get(`https://automations.avramiancuturda.ro/api/Marks.php?cmd=getMarksByClasseIdStudentId&classeId=${this.state.selectedClass.value}&studentId=${e.value}&token=${this.state.token.value}`)
      .then(res => {
        console.log(res.data);

        if(this.checkPrimaryClass(this.state.selectedRoomClassLabel))
          res.data.forEach(element => element.value=this.convertMarkToPrimaryMark(element.value))
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
    event.preventDefault();
    if(this.state.selectedClass.value==="") {
      alert("Nicio clasa selectata")
      return;
    }
    if(this.state.selectedStudent.value==="") {
      alert("Niciun elev selectat")
      return;
    }
    if(this.state.markValue===0) {
      alert("Nicio nota selectata")
      return;
    }
    if(this.state.markDate===undefined) {
      alert("Nicio data selectata")
      return;
    }
    axios.post(`https://automations.avramiancuturda.ro/api/Marks.php?cmd=addMark&token=${this.state.token.value}`, {classeId:this.state.selectedClass.value, studentId:this.state.selectedStudent.value, teacherId:1, 
    value:this.state.markValue, date:this.state.markDate})
    .then(res => {
      alert('Nota introdusa!');
      console.log(res.data);
      this.state.marks.push(res.data)
      this.setState({marks: this.state.marks})
      //this.setState({ classes: res.data , marks: res.data});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  eventHandler(event)
  {
    console.log(event)
  }

  render() {

    //let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";
    
    if(this.state.token==null)
      return(
        <div>Loading</div>
      );
    if(this.state.token.tokenUser.type === "1")
    {
      return (
      
        <div>
  
          <div className="bg-contact3" style={{ backgroundImage: `url(${backgrounImage})` }}>
            <div className="container-contact3">
              <div className="wrap-contact3">
                
                  <span className="contact3-form-title">
                    Catalog Scolar
            </span>

  
                  <div className="wrap-input3 validate-input" data-validate="Name is required">
                    <label className="input3" >Elev:</label>
                    {this.state.student.name}
                    <span className="focus-input3"></span>
                  </div>
  
                  <div className="wrap-input3 validate-input" data-validate="Name is required">
                    <label className="input3" >Note:</label>
                    
                    <table className="table table-striped table-dark">
                      <thead className="thead-dark">
                        <tr>
                          <th>Nota</th>
                          <th>Data</th>
                          <th>Materie</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.dataTable()}
                      </tbody>
                    </table>
                    <span className="focus-input3"></span>
                  </div>
              </div>
            </div>
            <div>
  
            </div>
            
  
          
          
  
        </div>
          </div>
      );
    }

    return (
      
      <div>

        <div className="bg-contact3" style={{ backgroundImage: `url(${backgrounImage})` }}>
          <div className="container-contact3">
            <div className="wrap-contact3">
              
                <span className="contact3-form-title">
                  Catalog Scolar
					</span>




                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Clasa:</label>
                  <Select options={this.state.selectOptions} onChange={this.roomClassChanged.bind(this)} />
                  <span className="focus-input3"></span>
                </div>

                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Materie:</label>
                  <Select options={this.state.selectClassOptions} value={this.state.selectedClass} onChange={this.classChanged.bind(this)} />
                  <span className="focus-input3"></span>
                </div>

                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Elev:</label>
                  <Select options={this.state.selectStudentOptions} value={this.state.selectedStudent} onChange={this.studentChanged.bind(this)} />
                  <span className="focus-input3"></span>
                </div>

                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Note:</label>
                  
                  <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                      <tr>
                        <th>Nota</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.dataTable()}
                    </tbody>
                  </table>
                  <span className="focus-input3"></span>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Nota:</label>
                  <Select options={this.state.availableMarks} onChange={this.markChanged.bind(this)} />
                  <span className="focus-input3"></span>
                </div>
                <div className="wrap-input3 validate-input" data-validate="Name is required">
                  <label className="input3" >Data:</label>
                  <DatePicker
                      onChange={this.markDateChanged.bind(this)}
                      selected={this.state.markDisplayedDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  <span className="focus-input3"></span>
                </div>
                  <div className="wrap-input3 validate-input" data-validate="Name is required">
                    
                    <span className="focus-input3"></span>
                  </div>
                  <div className="container-contact3-form-btn">
                  <button className="contact3-form-btn">
                    Submit
						</button>
                </div>
                </form>
                <br/><br/>

                
            </div>
          </div>
          <div>

          </div>
          

        
        

      </div>
        </div>
    );
  }
}
export default Tab;