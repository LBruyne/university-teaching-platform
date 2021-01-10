import React from 'react';
import StuCourse from "./stu-course";
import TchCourse from "./tch-course";
import TaCourse from "./ta-course";

class CoursePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            utype: 'stu',
        }
    }

    render(){

        return (
            <div>
                {this.state.utype == 'stu' && <StuCourse />}
                {this.state.utype == 'tch' && <TchCourse />}
                {this.state.utype == 'ta'  && <TaCourse />}
            </div>
        )
    }
}

export default CoursePage;