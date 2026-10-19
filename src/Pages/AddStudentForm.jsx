import React, { useState } from 'react'
import API from '../Service/API';
import {useNavigate} from 'react-router-dom';

const AddStudentForm = () => {

    let [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        photo: ""
    })

    let navigate = useNavigate();

    console.log(student);

    function handleChange(e) {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await API.post("/students", student);
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
                        <input type="text" className="form-control" id="inputPassword" placeholder='Enter Name' required name="name" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputPassword" placeholder='Enter Email' required name="email" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Course</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPassword" placeholder='Enter Course' required name="course" onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div class="mb-3">
                    <label for="formFile" class="form-label">Upload Profile Photo</label>
                    <input class="form-control" type="file" accept="image/*" id="formFile" name="photo" onChange={(e) => handlePhotoChange(e)} />
                </div>

                <input type="submit" value="Submit" />

            </form>

        </div>
    )
}

export default AddStudentForm
