import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

//Login Component
function LoginComponent() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth()

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`)
    }
    else {

      setShowErrorMessage(true);
    }
  }

  return (
    <MDBContainer>

      <MDBCard>
        <MDBRow className='g-0'>

          {/* Here Below syntax is a most important, beacuse if first argument is true than second will print. 
        //      if showSuccessMessage is true than only 'Authentication Successfull' message will be print. same in error message also.*/}
          {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials.</div>}
          <MDBCol md='3'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='9'>
            <MDBCardBody className='d-flex flex-column'>


              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-3' label='Username' id='formControlLg' type='email' size="lg" onChange={handleUsernameChange} />
              <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} />

              <MDBBtn className="mb-4" color='dark' size='lg' style={{ width: "100%" }} onClick={handleSubmit}>Login</MDBBtn>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  )
}

export default LoginComponent