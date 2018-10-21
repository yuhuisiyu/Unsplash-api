import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {

    //constructor
    constructor(props,context){
        super(props,context);
        this.handleChange = this.handleChange.bind(this);
        this.searchPhoto = this.searchPhoto.bind(this);
        this.state = {
            imgs:[],
            error: null,
            value:''
        };
    }

    //overwrite componentDidMount
    componentDidMount() {
        this.loadPhoto();
    }

    //loading the photos
    loadPhoto(){
        axios.get('http://localhost:3002/')
            .then(response => {
                console.log(response.data);
                this.setState({ imgs:response.data, error:null});
            })
            .catch(error => {
                this.setState({imgs:[],error:error.response.data.errors});
            })
    }

    //search photo
    searchPhoto(){
        axios.get('http://localhost:3002/search',{
            params: {
                query: this.state.value,
            }
        })
            .then(response => {
                this.setState({ imgs:response.data.results, error:null, value:""});
            })
            .catch(error => {
                this.setState({imgs:[],error:error.response.data.errors});
            })
    }

    //handle the change inpout in search bar
    handleChange(e) {
        this.setState({value: e.target.value});
    }

    //render function
  render() {
        if(this.state.error !== null) {
            return(
                <div>
                    {this.state.error}
                </div>)
        }else {
            return (
                <div className="App">
                    <div className="header">
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Navbar.Form pullLeft>
                                    <FormGroup>
                                        <FormControl value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search Your Photo" />
                                    </FormGroup>{' '}
                                    <Button type="submit" onClick={this.searchPhoto}>Submit</Button>
                                </Navbar.Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="content">
                        <Grid>
                            <Row>
                                {this.state.imgs.map((image) => (
                                    <Col xs={6} md={4} key={image.id}>
                                        <Thumbnail src={image.urls.small} alt="242x200">
                                            <h3>Photo By:</h3>
                                            <a href={image.user.links.html}>{image.user.name}</a>
                                        </Thumbnail>
                                    </Col>
                                ))}
                            </Row>
                        </Grid>
                    </div>
                </div>);
        }
  }
}

export default App;
