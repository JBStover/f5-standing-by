import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import {  Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

const Chart = () => {
    const gpuResults = useSelector(state => state.gpus); 
    const consoleResults = useSelector(state => state.consoles);    
    let gpuStrToNum = 0;
    let consoleStrToNum = 0;

    useEffect(() => {  
        calculateGPUChart(gpuResults); 
        calculateConsoleChart(consoleResults);
    }, [calculateGPUChart, calculateConsoleChart, gpuResults, consoleResults]);

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
            {
                label: "Console Price Trend",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(184, 185, 210, .3)",
                borderColor: "rgb(35, 26, 136)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(35, 26, 136)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0, 0, 0]
              },                    
          ]
    };    

    function calculateGPUChart (info) {
        const gpuResultsY = [];
        const gpuResultsX = [];        

        if (info.length != 0) {
            for (let i = 0; i < info.length; i++) { 
                gpuResultsX.push(info[i].date);           
                gpuStrToNum = parseFloat(info[i].price.replace(',', ''));           
                if (gpuStrToNum != null) {
                    gpuResultsY.push(gpuStrToNum);                
                };            
            }; 

            chartData.labels = gpuResultsX;
            chartData.datasets[0].data = gpuResultsY;   
        } else {
            chartData.labels = ['PlaceHolder1', 'PlaceHolder2', 'PlaceHolder3']
            chartData.datasets[0].data = [0, 0, 0]; 
        }  

    };

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
    
    return (
    <MDBContainer>
        <h3 className="mt-5">Price Trend</h3>
        <Line data={chartData} options={{ responsive: true }} redraw/>
    </MDBContainer>
    );
}

export default Chart;

