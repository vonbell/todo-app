import { List } from "./List";
import { useState, useRef } from "react";
import user from "../img/user.svg";
import lock from "../img/lock.svg";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const form = useRef(null);

    const handleEmailChange = (e) => setEmail(e.target.value);   
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const testLogin = [{email: "test@rapptrlabs.com", password: "Test123"}]; // User Login test info
    const errors = {em: "Not a valid email", pass: "Invalid password"}; // Error messages

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.disabled = true; // handleClick
        
        const { email, password } = document.forms[0]; // Input data from page
        const userData = testLogin.find((user) => user.email === email.value); // Find user login info and compare to input

        // Compare user info
        if (userData) {
            if (userData.password != password.value) { // If invalid password
                setErrorMessages({ name: "password", message: errors.pass });
                setPasswordError(true);
            } else {
                setIsSubmitted(true);
                callApi();
            }
        } else { // Email not found
            setErrorMessages({ name: "email", message: errors.em });
            setEmailError(true);
        };
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) => name === errorMessages.name && (
        <div className="error" style={{color: "red"}}>{errorMessages.message}</div>
    );

    // Login Form JSX code
    const renderLoginForm = (
        <div className="form-container">
            <h1 className="login-h1">Rapptr Labs</h1>
            <form ref={form} method="POST" encType="multipart/form-data" className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    className={emailError ? 'login-error' : 'login-input'} 
                    style={{ 
                        backgroundImage: `url(${user})`, 
                        paddingLeft: "30px", 
                        backgroundRepeat: "no-repeat", 
                        backgroundPosition: "left" 
                    }} 
                    value={email} 
                    onChange={handleEmailChange} 
                    type="email" 
                    placeholder="user@rapptrlabs.com" 
                    id="email" 
                    name="email" 
                    required 
                />
                {renderErrorMessage("email")}

                <label htmlFor="password">Password</label>
                <input 
                    className={passwordError ? 'login-error' : 'login-input'} 
                    style={{ 
                        backgroundImage: `url(${lock})`, 
                        paddingLeft: "30px", 
                        backgroundRepeat: "no-repeat", 
                        backgroundPosition: "left" 
                    }} 
                    value={password} 
                    onChange={handlePasswordChange} 
                    type="password" 
                    placeholder="Must be at least 4 characters" 
                    id="password" 
                    name="password" 
                    required 
                />
                {renderErrorMessage("password")}
                
                <button className="login-btn" type="submit">Login</button>
            </form>
        </div>
    );

    const callApi = () => {
        const body = new FormData(form.current);
        const options = { method: 'POST', body: body };
        fetch(`http://dev.rapptrlabs.com/Tests/scripts/user-login.php`, options)
            .then((response) => console.log(response.json()));
    };

    return (
        <div> {isSubmitted ? <List /> : renderLoginForm} </div>
    );
}