import React, { Component } from 'react';
import { Container, Row, Col } from "../components/Grid";
import './style.css';
import SynthScale from '../components/instruments/SynthScale'
import Mfvbtn from '../components/button/song/Mfvbtn'
import SongPost from '../components/button/song/songPost'
import BankPlay from '../components/button/song/BankPlay'
import DBPlay from '../components/button/song/DBPlay'
import SongList from '../components/songs/SongList'

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
                                <SynthScale range = {2} pitchRef = {this.state.ref || 60} subdevision ='4n'/>
                        </Col>
                        <Col size='md-12'>
                            <Mfvbtn></Mfvbtn>
                        </Col>
                        <Col size='md-12'>
                            <SongPost></SongPost>
                        </Col>
                        <Col size='md-12'>
                            <BankPlay></BankPlay>
                        </Col>
                        <Col size='md-12'>
                            <DBPlay></DBPlay>
                        </Col>
                        <Col size='md-12'>
                            <SongPost></SongPost>
                        </Col>
                    </Row>
                    <SongList></SongList>
            </Container>
        )
    }
}

export default MainPg;
