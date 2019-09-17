import React, { Component } from 'react';
import { Container, Row, Col } from "../Grid/index"
import SynthScale from '../instruments/SynthScale'
import Mfvbtn from '../button/song/Mfvbtn'
import SongPost from '../button/song/songPost'
import BankPlay from '../button/song/BankPlay'
import DBPlay from '../button/song/DBPlay'
import Tone from "tone";
import API from '../../utils/API';
class SongList extends Component {
    state = {
        songBook: []
    }

    componentDidMount(){
        this.loadSongBook()
    }

    loadSongBook(){
        API.getAllSongs()
        .then(res => this.setState({
            songBook: res.data
        }))
        .catch(err => console.log(err));
    }

    render(){
        return (
            <Row>
                <Col size='md-12'>
                    {this.state.songBook.length ? 
                    (
                        <ul>
                            {this.state.songBook.map((song, index) => {
                                return(
                                    <li>
                                        <DBPlay id= {index} song = {song}/>
                                        <p>{song.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                    :
                    (
                        <p>Loading Songs from DB...</p>    
                    )}
                </Col>
            </Row>
        )
    }
}
export default SongList