import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {Button, Row, Col, InputGroup, FormControl, Card, Dropdown, DropdownButton } from 'react-bootstrap';

const ConsoleResults = () => {
    const searchedResults = useSelector(state => state.consoles.searchedConsoles);

    return (
        <div>
            <h3>Most Recent Console Results</h3>
        <FullContainer>
        <Row className = 'mb-5 mt-5' md={5}>            
            {searchedResults.slice(0, 5).map((results) =>              
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

export default ConsoleResults;

const FullContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 100%;
`