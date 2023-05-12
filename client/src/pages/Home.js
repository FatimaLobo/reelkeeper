import React, { useEffect } from "react";

import { Button, Container, Row, Col } from 'react-bootstrap';


import styles from "../style/Background.module.css"
import '../style/Home.css';

import { Link } from 'react-router-dom';

// import $ from 'jquery';
// global.jQuery = $;

const Home = () => {
    useEffect(() => {
        document.body.className = styles.dynamicBackground;
        return () => {
            document.body.className = styles.plainBackground;
        }
    }, [])
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <h1 className="titulo">ReelKeeper</h1>
                </Row>
                <Row className="justify-content-md-center m-5">
                    <Link to="movies"><Button className="mr-5" variant="dark">MOVIES</Button></Link>
                    <Link to="login"><Button className="mr-5" variant="dark">LOGIN</Button></Link>
                    <Link to="playground"><Button className="" variant="dark">DB check</Button></Link>
                </Row>

                <Container>
                <Row className="justify-content-md-center m-5 ">
                    <Col className="text-justify bordered mb-5 redhover row">
                        <div className="col-2"><i class="fa-solid fa-eye"></i></div>
                        <div className="col-10">Keep track of your watched films and don't forget about them!</div>
                    </Col>
                    <Col className="text-justify bordered mb-5 yellowhover row">
                    <div className="col-2"><i class="fa-solid fa-chart-pie"></i></div>
                         <div className="col-10"> Find out statistics about the films you've watched. </div>
                    </Col>
                </Row>
                
                <Row className="justify-content-md-center m-5">
                    <Col className="text-justify bordered mb-5 greenhover row">
                         <div className="col-2"><i class="fa-solid fa-star-half-stroke"></i></div>
                         <div className="col-10">Rate the movies you've watched and check your history of movies watched!</div>
                     </Col>
                    <Col className="text-justify bordered mb-5 purplehover row">
                    <div className="col-2"><i class="fa-solid fa-crown"> </i></div>
                        <div className="col-10">   Store your favorites films, make lists to group them by any topic or add them to your watchlist.</div>
                         
                    </Col>
                </Row>
                </Container>
            </Container>
            {/* <Carousel/> */}
        </>
    )
}
export default Home;
