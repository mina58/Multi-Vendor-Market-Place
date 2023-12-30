import React, { useState } from "react";
import axios from "axios";
import '../Login_Signup/Login_Signup.css'
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEnvelope, faKey, faEye, faEyeSlash, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';
import Login from '../Login_Signup/Login';
import Navbar from '../../Components/Navbar/Navbar';


const Signup = () => {

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassword1Visible, setIsPassword1Visible] = useState(false);
    const [isPassword2Visible, setIsPassword2Visible] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();

        // Check if both names are greater than 3 characters
        if (firstname.length <= 3 || lastname.length <= 3) {
            alert('Both first name and last name must be atleast 3 characters.');
            return;
        }

        // Check if phone number is in the right format
        var phonenumberRegex = /^\+20\d{10}$/;
        if (!phonenumberRegex.test(phonenumber)) {
            alert('Phone number must start with +20 and contain 10 digits');
            return;
        }

        // Password validation function
        // Check if password is at least 8 characters long
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        // Check if password includes at least one number
        var numberRegex = /\d/;
        if (!numberRegex.test(password)) {
            alert('Password must include at least one number.');
            return;
        }

        // Check if password includes at least one capital letter
        var uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            alert('Password must include at least one capital letter.');
            return;
        }

        // Check if password includes at least one special character
        var specialCharacterRegex = /[!@#$%^&*]/;
        if (!specialCharacterRegex.test(password)) {
            alert('Password must include at least one special character.');
            return;
        }

        // Password = confirmation password
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Actual signup
        try {
            const response = await axios.post('/endpoint', {
                username: username,
                password: password,
                email: email,
                firstname: firstname,
                lastname: lastname,
                phonenumber: phonenumber
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Navbar/>
        <div className="login_signup">
            <div className="login_signup_container">
                <div className="button_container">
                    <NavLink to="/Login" className="LoginButtonSP">Log in</NavLink>
                    <NavLink to="/Signup" className="SignupButtonSP">Create Account</NavLink>
                </div>
                <div>
                    <h1>Create your account</h1>
                    <form onSubmit={handleSignup}>
                        <div className="login_signup_fields">
                            <div className="input-container">
                                <FontAwesomeIcon icon={faUser} className="input-icon"/>
                                <input type="text" placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)} required></input>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faUser} className="input-icon"/>
                                <input type="text" placeholder="Last Name" value={lastname} onChange={e => setLastname(e.target.value)} required></input>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faUser} className="input-icon"/>
                                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required></input>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                                <input type="email" placeholder="E-mail Address" value={email} onChange={e => setEmail(e.target.value)} required></input>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faPhone} className="input-icon"/>
                                <input type="tel" placeholder="Enter Phone Number" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} required/>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faKey} className="input-icon"/>
                                <input type={isPassword1Visible ? "text" : "password"} placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} required></input>
                                <FontAwesomeIcon icon={isPassword1Visible ? faEye : faEyeSlash} className="eye-icon" onClick={() => setIsPassword1Visible(!isPassword1Visible)}/>
                            </div>
                            <div className="input-container">
                                <FontAwesomeIcon icon={faKey} className="input-icon"/>
                                <input type={isPassword2Visible ? "text" : "password"} placeholder="Confirm Your Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required></input>
                                <FontAwesomeIcon icon={isPassword2Visible ? faEye : faEyeSlash} className="eye-icon" onClick={() => setIsPassword2Visible(!isPassword2Visible)}/>
                            </div>
                        </div>

                        <div className="login_signup_CB">
                            <input type="checkbox" name="checkbox-agreetoterms" id="login_signup_checkbox" required/>
                            <p>I agree to all <Link to={TermsAndConditions}>Terms & Conditions</Link></p>
                        </div>

                        <NavLink className="submit-form"><button type="submit" className="CreatAccountMainButton">Create Account</button></NavLink>

                        <div className="login_signup_alternative">
                            <hr/>
                            <p> or Sign up with </p>
                            <hr/>
                        </div>

                        <div className="login_signup_social">
                            <Link className="social_icon">
                                <FontAwesomeIcon icon={faGoogle}/><span>Google</span>
                            </Link>
                            <Link className="social_icon">
                                <FontAwesomeIcon icon={faFacebook}/><span>Facebook</span>
                            </Link>
                        </div>
                        <p className="login_signup_login">Already have an account? <Link to={Login}>Log in here</Link></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup
