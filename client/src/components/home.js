import {Button, Row, Col, InputGroup, FormControl, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import { getGPUs, clearGPUs, getGPUStatus, selectAllGPUResults } from '../slices/gpuSlice';
import { getConsoles, clearConsoles, getConsoleStatus, selectAllConsoleResults } from '../slices/consoleSlice';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);


const Home = () => {
    const dispatch = useDispatch();   
    const gpuResults = useSelector(selectAllGPUResults); 
    const gpuStatus = useSelector(getGPUStatus);    
    const consoleResults = useSelector(selectAllConsoleResults);
    const consoleStatus = useSelector(getConsoleStatus);      
     
    const [searchParam, setSearchParam] = useState("");    
    const [dropdownSelect, setDropdownSelect] = useState(""); 

   
    

    useEffect(() => {  
       setDropdownSelect("No selection") 
       renderSearchResults()                                   
    }, [dispatch, getGPUs, getConsoles,]);

    const handleButtonClick = async (data) => {             
        if (dropdownSelect === "GPU") { 
            //await dispatch(clearConsoles());           
            await dispatch(getGPUs(data)).unwrap(); 
        }
        if (dropdownSelect === "Consoles") {            
            //await dispatch(clearGPUs());
            await dispatch(getConsoles(data)).unwrap();
        }
        if (dropdownSelect === "No selection") {
            console.log("Make a selection before searching database");
        };                                       
    };   

    async function handleDropdownSelect (e) {
        setDropdownSelect(e);
    };

    
    // Render results/tables 
    const renderSearchResults =  () => {
        console.log(consoleStatus);
        console.log(gpuStatus);

        if (gpuStatus === 'Idle' && consoleStatus === 'action successful') {
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
        if (gpuStatus === 'action successful' && consoleStatus === 'Idle') {
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


