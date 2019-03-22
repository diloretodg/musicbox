import React, { Component } from 'react';
import { Container, Row, Col } from "../components/Grid";
import './style.css';
import SynthScale from '../components/instruments/SynthScale'
import Mfvbtn from '../components/instruments/Mfvbtn'

var scale = ["C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5"]

class MainPg extends Component {
    state={
        scale:scale
    }

    render () {
        return(
            <Container>
                    <Row>
                        <Col size="md-12">
                                <SynthScale scale = {this.state.scale || "C4"} subdevision ='4n'/>
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
