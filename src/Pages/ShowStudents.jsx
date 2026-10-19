import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../Service/API';

const ShowStudents = () => {
    let [studentArray, setStudentArray] = useState([]);
    async function fetchStudentData() {
        try {
            let response = await API.get('/students');
            setStudentArray(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchStudentData()
    }, []);

    async function deleteStudent(id) {
        let confirmMsg = window.confirm("Confirm delete");
        if (confirmMsg) {
            try {
                await API.delete(`/students/${id}`);
                setStudentArray(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchStudentData();
    }

    async function updateCoursePatch(id) {
        try {
           await API.patch(`/students/${id}`, { course: "New Course" });
           alert("Course Updated");   
            fetchStudentData();       
        } catch (err) {
            console.log(err);
        }
       
    }


    return (
        <div className='row'>
            {
                studentArray.length == 0 ? (<h1>Student Not Found</h1>) :
                    (

                        studentArray.map((stud) => (
                            <div class="card col-12 col-md-6 col-xl-3">
                                {/* <img src={stud.photo} class="card-img-top w-5" alt="..." /> */}
                                <div class="card-body">
                                    <h4 class="card-title">Name:{stud.name}</h4>
                                    <h5 class="card-title">Email:{stud.email}</h5>
                                    <h5 class="card-title">Course:{stud.course}</h5>
                                    <button class="btn btn-success" onClick={() => updateCoursePatch(stud.id)}>EditCourse-Patch</button>
                                    <Link to={`/edit/${stud.id}`}> <button class="btn btn-success">Edit-Put</button> </Link>
                                    <button class="btn btn-danger" onClick={() => deleteStudent(stud.id)}>Delete</button>
                                    <Link to={`/view/${stud.id}`}> <button class="btn btn-primary">View</button> </Link>
                                </div>
                            </div>
                        ))

                    )
            }
        </div>
    )
}

export default ShowStudents
