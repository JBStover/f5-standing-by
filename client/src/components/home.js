import {Button, Row, Col, InputGroup, FormControl, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import { clearGPUs, getGPUs } from '../slices/gpuSlice';
import { getConsoles, clearConsoles } from '../slices/consoleSlice';
import { Chart, registerables } from 'chart.js'
import GpuResults from './gpuResults';
import ConsoleResults from './consoleResults';
import { render } from 'react-dom';


Chart.register(...registerables);


const Home = () => {
    const dispatch = useDispatch();        
    const gpuStatus = useSelector(state => state.gpus.status);       
    const consoleStatus = useSelector(state => state.consoles.status);      
    const [searchParam, setSearchParam] = useState("");    
    const [dropdownSelect, setDropdownSelect] = useState(""); 

    useEffect(() => {  
       setDropdownSelect("No selection") 
                                            
    }, [consoleStatus, gpuStatus, dispatch]);

    const handleButtonClick = (data) => {             
        if (dropdownSelect === "GPU") { 
            dispatch(getGPUs(data));
        }
        if (dropdownSelect === "Consoles") {
            dispatch(getConsoles(data));
        }
        if (dropdownSelect === "No selection") {
            alert("Make a selection before searching database");
        };                                       
    };   

    async function handleDropdownSelect (e) {
        setDropdownSelect(e);
    };   

    function renderSearchResults () {
        return (
        <div>
        {gpuStatus === 'succeeded' 
            ? <GpuResults/>
            : <h1>No GPU Results to display.</h1>}  
        <hr />
        {consoleStatus === 'succeeded'
            ? <ConsoleResults/>
            : <h1>No Console Results to display.</h1>}
        </div>
        )      
    }

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


