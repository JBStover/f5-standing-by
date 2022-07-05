import {Button, Row, Col, InputGroup, FormControl, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import { getGPUs, clearGPUs } from '../slices/gpuSlice';
import { getConsoles, clearConsoles } from '../slices/consoleSlice';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

//import * as tf from '@tensorflow/tfjs';
//script start //"react-scripts start", 



const Home = () => {

    const gpuResults = useSelector(state => state.gpus);     
    const consoleResults = useSelector(state => state.consoles);      
     
    const [searchParam, setSearchParam] = useState("");    
    const [dropdownSelect, setDropdownSelect] = useState("");
    const dispatch = useDispatch();    

    useEffect(() => {  
        setDropdownSelect("No selection")                                       
    }, [getGPUs, dispatch, searchParam]);

    async function handleButtonClick (data) {     
        console.log(dropdownSelect);
        if (dropdownSelect === "GPU") { 
            await dispatch(clearConsoles());           
            await dispatch(getGPUs(data)); 
        }
        if (dropdownSelect === "Consoles") {
            console.log("You searched for consoles");
            await dispatch(clearGPUs());
            await dispatch(getConsoles(data));
        }
        if (dropdownSelect === "No selection") {
            console.log("Make a selection before searching database");
        };                                       
    };   

    async function handleDropdownSelect (e) {
        setDropdownSelect(e);
    };

    
    // Render results/tables 
    function renderSearchResults() {
        
        if (!_.isEmpty(gpuResults) && !_.isEmpty(consoleResults)) {
            return (
                <div>
                <h3>GPU Results</h3>
                <FullContainer>
                <Row className = 'mb-5 mt-5' md={5}>            
                    {gpuResults.slice(0, 5).map((results) =>              
                    <Col>
                    <Card style={{ width: '18rem' }}>                        
                        <Card.Body>
                            <Card.Title>{results.title}</Card.Title>
                            <Card.Subtitle>Price: ${results.price}</Card.Subtitle>
                            <Card.Text>Date: {results.date}</Card.Text>                            
                        </Card.Body>
                        <Card.Img variant="top" src={results.imageURL} />
                    </Card>  
                    </Col>         
                  
                     )}                             
                </Row>
                </FullContainer>
                <h3>Console Results</h3>
                <FullContainer>
                <Row className = 'mb-5 mt-5' md={5}>            
                    {consoleResults.slice(0, 5).map((results) =>              
                    <Col>
                    <Card style={{ width: '18rem' }}>                        
                        <Card.Body>
                            <Card.Title>{results.title}</Card.Title>
                            <Card.Subtitle>Price: ${results.price}</Card.Subtitle>
                            <Card.Text>Date: {results.date}</Card.Text>                            
                        </Card.Body>
                        <Card.Img variant="top" src={results.imageURL} />
                    </Card>  
                    </Col>         
                  
                     )}                             
                </Row>
                </FullContainer>                
                </div>
                )   
        };
        
        if (_.isEmpty(gpuResults) && !_.isEmpty(consoleResults)) {
            return (
                <div>
                    <h3>Console Results</h3>
                <FullContainer>
                <Row className = 'mb-5 mt-5' md={5}>            
                    {consoleResults.slice(0, 5).map((results) =>              
                    <Col>
                    <Card style={{ width: '18rem' }}>                        
                        <Card.Body>
                            <Card.Title>{results.title}</Card.Title>
                            <Card.Subtitle>Price: ${results.price}</Card.Subtitle>
                            <Card.Text>Date: {results.date}</Card.Text>                            
                        </Card.Body>
                        <Card.Img variant="top" src={results.imageURL} />
                    </Card>  
                    </Col>         
                  
                     )}                             
                </Row>
                </FullContainer> 
                </div>
            )
        } 
        if (_.isEmpty(consoleResults) && !_.isEmpty(gpuResults)) {
            return (
                <div>
                <h3>GPU Results</h3>
                <FullContainer>
                <Row className = 'mb-5 mt-5' md={5}>            
                    {gpuResults.slice(0, 5).map((results) =>              
                    <Col>
                    <Card style={{ width: '18rem' }}>                        
                        <Card.Body>
                            <Card.Title>{results.title}</Card.Title>
                            <Card.Subtitle>Price: ${results.price}</Card.Subtitle>
                            <Card.Text>Date: {results.date}</Card.Text>                            
                        </Card.Body>
                        <Card.Img variant="top" src={results.imageURL} />
                    </Card>  
                    </Col>         
                  
                     )}                             
                </Row>
                </FullContainer>
                </div>
            )
        } else {
            return <div>No Search Entered</div> 
        }        
    };     

    return (
    <div>
    <QuartContainer>        
        <InputGroup onChange={event => setSearchParam(event.target.value)}
        className="mb-3">
            <FormControl
            placeholder="What are ya buyin?"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
            <DropdownButton
                alignRight
                title={dropdownSelect}
                id="Dropdown-search-menu"
                onSelect={handleDropdownSelect}>
                    <Dropdown.Item eventKey="GPU">GPUs</Dropdown.Item>
                    <Dropdown.Item eventKey="Consoles">Consoles</Dropdown.Item>
            </DropdownButton>
            <Button variant="outline-secondary" id="button-addon2"
            onClick={() => handleButtonClick(searchParam)} >
            Search
            </Button>
        </InputGroup>
        
    </QuartContainer>
    <hr />
    {renderSearchResults()}    
    </div>
    
    )
};

export default Home;

const QuartContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 25%;
`

const FullContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 100%;
`


