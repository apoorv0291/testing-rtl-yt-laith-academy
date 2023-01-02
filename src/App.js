import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import validator from 'validator';

function App() {
    const [userSiginInput, setUserSiginInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const handleInput = (e) => {
        // console.log('e emaik', e.target.value);
        setUserSiginInput({
            ...userSiginInput,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validator.isEmail(userSiginInput.email)) {
            setError('Email is invalid');
        } else if (userSiginInput.password.length < 5) {
            setError('Password is less than 5 characters');
        } else if (userSiginInput.confirmPassword !== userSiginInput.password) {
            setError('Password dont match, try again');
        }
    };
    return (
        <div className="container my-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={userSiginInput.email}
                        onChange={handleInput}
                    />
                    <div className="mb-3">
                        <label htmlFor="password-field" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password-field"
                            className="form-control"
                            value={userSiginInput.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="confrim-password-field"
                            className="form-label"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confrim-password-field"
                            className="form-control"
                            value={userSiginInput.confirmPassword}
                            onChange={handleInput}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
