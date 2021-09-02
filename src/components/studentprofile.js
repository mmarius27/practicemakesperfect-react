import { Alert, Button, Container } from "react-bootstrap"
import NameAndSurname from "./nameSurnameModal"
import Contacts from "./contactModal"
import Details from "./detailsModal"
import FacultyInfo from "./facultyModal"
import Experience from "./educationModal"

import StudentService from  '../service/student.service'

import { useState, useEffect } from "react"


const StudentProfile = () =>{

    const [profile, setProfile] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [newProfile, setNewProfile] = useState(null);

    useEffect(() =>{
        StudentService.getCurrentStudent().then(response => {setProfile(response); setNewProfile(response);});
        
    }, []);

    const setExperieceList = (newEducationList) => {
        newProfile.experience = [...newEducationList];
        console.log("PROFILE LIST:");
        console.log(newProfile.experience);
    }

    const setEducationList = (newEducationList) => {
        newProfile.education = [...newEducationList];
        console.log("PROFILE LIST:");
        console.log(newProfile.education);
    }

    const setExtracuricularsList = (newEducationList) => {
        newProfile.extracuriculars = [...newEducationList];
        console.log("PROFILE LIST:");
        console.log(newProfile.extracuriculars);
    }

    const setContactInfo = (newEmail, newPhone)=>{
        newProfile.contactEmail=newEmail;
        newProfile.phoneNumber=newPhone;
    }

    const setFacultyInfo = (newFaculty, newYear)=>{
        newProfile.faculty=newFaculty;
        newProfile.yearOfStudy=newYear;
    }
    
    const setFirstAndLastName = (newFirstName, newLastName)=>{
        newProfile.firstName = newFirstName;
        newProfile.lastName = newLastName;

        console.log("Profile name");
        console.log(newProfile.firstName + " " + newProfile.lastName);
    }

    const setDetailsInfo = (newBirthday, newDescription)=>{
        newProfile.birthday=newBirthday;
        newProfile.description=newDescription;
    }

    const saveProfile = () => {
        StudentService.updateCurrentStudent(newProfile).then(response => {setAlertMessage(response.message)});
        console.log("Profile Saved");
    }

    return(
        profile &&
            <Container className="p-2">
                <Container className="py-0 d-flex">
                    <span className="py-0"><h3 className="m-0 py-0">Profile</h3></span>
                </Container>
                <hr></hr>
                <NameAndSurname firstName={profile.firstName} lastName={profile.lastName} setFirstAndLastName={setFirstAndLastName}/>
                <Contacts email={profile.contactEmail} phone={profile.phoneNumber} setContactInfo={setContactInfo}/>
                <Details birthday={profile.birthday} description={profile.description} setDetailsInfo={setDetailsInfo} />
                <FacultyInfo faculty={profile.faculty} year={profile.yearOfStudy} setFacultyInfo={setFacultyInfo}/>
                <hr></hr>
                <Experience type={"Education"} educationList={profile.education} setEducationList={setEducationList}/>
                <hr></hr>
                <Experience type={"Experience"} educationList={profile.experience} setEducationList={setExperieceList}/>
                <hr></hr>
                <Experience type={"Extracuriculars"} educationList={profile.extracuriculars} setEducationList={setExtracuricularsList}/>
                <hr></hr>
                <Button className="w-100" variant="primary" onClick={saveProfile}>Save Profile</Button>
                {alertMessage && <Alert className=" my-2 p-1 w-25 fade out" variant="warning">{alertMessage}</Alert>}
            </Container> 
    );
}

export default StudentProfile