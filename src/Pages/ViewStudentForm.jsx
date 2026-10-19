import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import API from '../Service/API';

const ViewStudentForm = () => {
    let [stud, setStud] = useState({});
    let {id} = useParams();
    async function fetchStudentData() {
        try {
            let response = await API.get(`/students/${id}`);
            setStud(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchStudentData()
    }, []);
    return (
        <div>

            <div class="card col-12 col-md-6 col-xl-3">
                <img src={stud.photo} class="card-img-top w-5" alt="..." />
                <div class="card-body">
                    <h4 class="card-title">Name:{stud.name}</h4>
                    <h5 class="card-title">Email:{stud.email}</h5>
                    <h5 class="card-title">Course:{stud.course}</h5>
                    <Link to='/show'> <button class="btn btn-success">Return to All Student</button> </Link> 

                </div>
            </div>

        </div>
    )
}

export default ViewStudentForm
