import React, { Component } from "react";
import classes from './Appointment.module.css';
import Tile from './Tile';

class Appointment extends Component {
    state = {
          restructuredAppointments : []
    };

    async componentDidMount() {
        let appointments = [];
        const response = await fetch("https://recruiter-static-content.s3.ap-south-1.amazonaws.com/json_responses_for_tests/test.json");
        appointments = await response.json();
        let restructuredArray = [];
        if(appointments.length!=0)
            restructuredArray.push(new Array(appointments[0]));
        for(let i=1;i<appointments.length;i++){
            let insertedNew = false;
            let istart = parseInt(appointments[i].start);
            let iend = parseInt(appointments[i].end);
            let temp = JSON.parse(JSON.stringify(restructuredArray));
            for(let j=0;j<temp.length;j++){
                    for(let k=0;k<temp[j].length;k++){
                        let jstart = parseInt(temp[j][k].start);
                        let jend = parseInt(temp[j][k].end);
                        if(temp[j][k].title!=appointments[i].title&&(istart>=jstart&&istart<=jend)||(iend>=jstart&&iend<=jend)){
                            if(restructuredArray[j].filter(ele=>ele.title==appointments[i].title).length==0){
                                restructuredArray[j].push(appointments[i]);
                                insertedNew = true;
                            }                     
                        }
                }
            }
            if(!insertedNew){
                restructuredArray.push(new Array(appointments[i]));
            }
        }
        this.setState({
            restructuredAppointments:restructuredArray
        })
    }

    listCompile = () => {
        let result = [];
        let i=9;
        while(i<13){
            result.push(<li key={i+"AM"}>{i} AM</li>);
            i++;
        }
        i=1;
        while(i<8){
            result.push(<li key={i+"PM"}>{i} PM</li>);
            i++;
        }
        result.push(<li key={"8PM"}><p>8 PM</p><p>9 PM</p></li>);
        return result;
    }

    render() {
        const {restructuredAppointments} = this.state;
        return (
            <>
                <ul>
                    {this.listCompile()}
                </ul>
                <div className={classes.AppointmentContainer}>
                    {restructuredAppointments.length!=0&&restructuredAppointments.map((ele,i)=>{
                        return <div className={classes.temp} key={i}>
                            {ele.map(element=>{
                                return <Tile key={element.title} data={element}/>
                            })}
                        </div>
                    })}
                </div>
            </>
        );
    }
}


export default Appointment;
