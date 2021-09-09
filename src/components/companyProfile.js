import { Alert, Button, Container } from "react-bootstrap"
import { useState, useEffect } from "react"
import companyService from "../service/company.service";
import CompanyDetails from "./companyDetails";
import ContactName from "./companyContactModal";
import Contacts from "./contactModal";

const CompanyProfile = ()  => {

    const [profile, setProfile] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [newProfile, setNewProfile] = useState(null);

    useEffect(() =>{
        companyService.getCurrentCompany().then(response => {setProfile(response); setNewProfile(response);});
    }, []);

    const setCompanyDetails = (newCompanyName, newCompanyDescription) => {
        newProfile.companyName = newCompanyName;
        newProfile.description = newCompanyDescription;
    }

    const setContactName = (newName, newSurname) => {
        newProfile.contactFirstName = newName;
        newProfile.contactSurname = newSurname;
    }

    const setContactInfo = (newEmail, newPhone) => {
        newProfile.contactEmail = newEmail;
        newProfile.contactPhoneNumber = newPhone;
    }

    const saveProfile = () => {
        companyService.updateCurrentCompany(newProfile).then(response => {setAlertMessage(response.message)});
        console.log("Profile Saved");
    }

    return(profile &&
        <Container className="p-2">
            <Container className="py-0 d-flex">
                    <span className="py-0"><h3 className="m-0 py-0">Profile</h3></span>
            </Container>
            <hr></hr>
            <CompanyDetails companyName={profile.companyName} companyDescription={profile.description} setCompanyDetails={setCompanyDetails}/>
            <hr></hr>
            <ContactName contactFirstName={profile.contactFirstName} contactSurname={profile.contactSurname} setContactName={setContactName}/>
            <hr></hr>
            <Contacts email={profile.contactEmail} phone={profile.contactPhoneNumber} setContactInfo={setContactInfo}/>
            <hr></hr>
            <Button className="w-100" variant="primary" onClick={saveProfile}>Save Profile</Button>
            {alertMessage && <Alert className=" my-2 p-1 w-25 fade out" variant="warning">{alertMessage}</Alert>}
        </Container>
    );
}

export default CompanyProfile