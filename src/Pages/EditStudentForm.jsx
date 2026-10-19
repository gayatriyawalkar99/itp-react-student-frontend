import React, { useEffect, useState } from 'react'
import API from '../Service/API';
import {useNavigate, useParams} from 'react-router-dom';

const EditStudentForm = () => {

    let [student, setStudent] = useState({
           name: "",
           email: "",
           course: "",
           photo: ""
       })
    let {id}= useParams();
    async function fetchStudentData() {
        try {
            let response = await API.get(`/students/${id}`);
            setStudent(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchStudentData()
    }, []);

    let navigate = useNavigate();

    console.log(student);

    function handleChange(e) {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await API.put(`/students/${id}`, student);
        } catch (err) {
            console.log(err);
        }
        navigate('/show')
    }

    function handlePhotoChange(e){
        console.log("image file");
        let file = e.target.files[0];
        if (!file) 
            return;
        if(!file.type.startsWith("image/")){
            alert("File is not image");
            e.target.value='';
            return;

        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setStudent({...student,photo:reader.result});
        };
        reader.readAsDataURL(file);
    }



    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPassword" placeholder='Enter Name' required name="name" value={student.name} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputPassword" placeholder='Enter Email' required name="email" value={student.email} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Course</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPassword" placeholder='Enter Course' required name="course" value={student.course} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <img src={student.photo} />

                <div class="mb-3">
                    <label for="formFile" class="form-label">Update Profile Photo</label>
                    <input class="form-control" type="file" accept="image/*" id="formFile" name="photo" onChange={(e) => handlePhotoChange(e)} />
                </div>

                <input type="submit" value="Submit" />

            </form>

        </div>
    )
}

export default EditStudentForm
