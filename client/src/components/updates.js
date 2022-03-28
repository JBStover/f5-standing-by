import React from 'react';
import styled from 'styled-components';

function Updates() {
    return (
    <div>
        <h1>Week of 21Mar22: F5 is LIVE!!</h1>
        <h2>Patch 1.1 (In development) 
        <ul>TensorFlow Machine Learning to help you predict when to make a purchase.</ul>
        <ul>Clear Button for chart/store data</ul>
        <ul>Add to the database yourself with the new user scraping option</ul>
        </h2>
        <h3></h3>
    </div>
    );
};

export default Updates;

const FullContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 100%;
`