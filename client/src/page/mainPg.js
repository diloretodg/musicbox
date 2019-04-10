import React, { Component } from 'react';
import { Container, Row, Col } from "../components/Grid";
import './style.css';
import SynthScale from '../components/instruments/SynthScale'
import Mfvbtn from '../components/instruments/Mfvbtn'
const scale = require('../js/scales')

class MainPg extends Component {
    state={
        scale:scale.CHROMATIC_SCALE,
        ref: 59
    }

    render () {
        return(
            <Container>
                    <Row>
                        <Col size="md-12">
                                <SynthScale range = {2} ref = {this.state.ref || 60} subdevision ='4n'/>
                        </Col>
                        <Col size='md-12'>
                            <Mfvbtn></Mfvbtn>
                        </Col>
                    </Row>
            </Container>
        )
    }
}

export default MainPg;
