import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Card, Container, Form, Button, Row } from 'react-bootstrap';
import styles from "../style/Background.module.css"
import '../style/Login.css';

import useAuth from "../hooks/useAuth";
import { LOGIN_URL } from "../utils/Constants";
import axios from "../api/axios";


const Login = () => {
    useEffect(() => {
        document.body.className = styles.dynamicBackground;
        return () => {
            document.body.className = styles.plainBackground;
        }
    }, [])

    const { auth, setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password })
            );
            const accessToken = response?.data?.accessToken;
            const foundUser = response?.data?.foundUser;
            localStorage.setItem('foundUser', JSON.stringify(foundUser));

            setAuth({ username, password, accessToken });
            setUsername('');
            setPassword('');
            navigate('/movies', { state: { from: location }, replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('No user found with that name');
            } else {
                setErrMsg('Login Failed');
            }
            errorRef.current?.focus();
        }
    };

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const loginContent =
        (<>
            <Card className="col-5 mx-auto shadow p-3 mb-5 bg-white rounded min-width">
                <Card.Body>
                    <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Card.Title>Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" ref={userRef} value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </Form.Group>
                        {/* <Link className='btn-pass'>Forgot your password?</Link> */}

                        <Button variant="dark" type="submit" className="mx-auto mt-3 mb-3" style={{ width: "100%" }}>Login</Button>
                        <div className="persistCheck">
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">Trust This Device</label>
                        </div>

                        <Link to="/signup" className='btn-pass text-center'>Don't have an account? Sign up!</Link>
                    </Form>
                </Card.Body>
            </Card>
        </>)

    const loginSuccessContent =
        (<>
            <Card className="col-5 mx-auto shadow p-3 mb-5 bg-white rounded min-width">
                <Card.Body>
                    <section>
                        <Card.Title>You're logged in!</Card.Title>
                        <p>
                            <Link to="/movies" className='btn-pass text-center'>Go to Home</Link>
                        </p>
                    </section>
                </Card.Body>
            </Card>
        </>)

    return (
        <>
            <Container className="h-100 mt-5 ">
                <Row className="align-items-center h-100">
                    {auth.accessToken != null ? loginSuccessContent : loginContent}
                </Row>
            </Container>
        </>
    )
}
export default Login;
