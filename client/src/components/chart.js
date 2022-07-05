import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import {  Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

const Chart = () => {
    const gpuResults = useSelector(store => store.gpus); 
    const consoleResults = useSelector(store => store.consoles);    
    let strToNum = 0;
    //let consoleStrToNum = 0;

    useEffect(() => {          
        if (gpuResults.length != 0) {
            calculateChart(gpuResults); 
        } else if (consoleResults.length != 0) {
            calculateChart(consoleResults);
        };        
        
    }, [calculateChart, gpuResults, consoleResults]);

    const chartData = {
        labels: ['PlaceHolder1', 'PlaceHolder2', 'PlaceHolder3'],
          datasets: [
            {
              label: "GPU Price Trend",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(225, 204,230, .3)",
              borderColor: "rgb(205, 130, 158)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(205, 130,1 58)",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0, 0, 0)",
              pointHoverBorderColor: "rgba(220, 220, 220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0, 0, 0]
            },                
          ]
    };    

    function calculateChart (info) {
        const resultsY = [];
        const resultsX = [];        

        if (info.length != 0) {
            for (let i = 0; i < info.length; i++) { 
                resultsX.push(info[i].date);           
                strToNum = parseFloat(info[i].price.replace(',', ''));           
                if (strToNum != null) {
                    resultsY.push(strToNum);                
                };            
            }; 

            chartData.labels = resultsX;
            chartData.datasets[0].data = resultsY;   
        } else {
            chartData.labels = ['PlaceHolder1', 'PlaceHolder2', 'PlaceHolder3', 'PlaceHolder4', 'PlaceHolder5']
            chartData.datasets[0].data = [0, 0, 0, 0, 0]; 
        }  

    };

    /*
    function calculateConsoleChart (info) {
        const consoleResultsY = [];
        const consoleResultsX = [];        

        if (info.length != 0) {
        for (let i = 0; i < info.length; i++) { 
            consoleResultsX.push(info[i].date);           
            consoleStrToNum = parseFloat(info[i].price.replace(',', ''));           
            if (consoleStrToNum != null) {
                consoleResultsY.push(consoleStrToNum);                
            };            
        }; 

        chartData.labels = consoleResultsX;
        chartData.datasets[1].data = consoleResultsY;    
        } else {
            chartData.labels = ['PlaceHolder1', 'PlaceHolder2', 'PlaceHolder3']
            chartData.datasets[1].data = [0, 0, 0]; 
        }       
    };
    */
    
    return (
    <MDBContainer>
        <h3 className="mt-5">Price Trend</h3>
        <Line data={chartData} options={{ responsive: true }} redraw/>
    </MDBContainer>
    );
}

export default Chart;

