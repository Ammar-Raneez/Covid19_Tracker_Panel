import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import './Line.css';


//sort of a config for chartjs
const options = {
    legend: {display: false},
    elements: {
        point: {radius: 0}
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: toolTipItem => numeral(toolTipItem.value).format("+0,0")
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    toolTipFormat: "ll",
                }
            }
        ],
        yAxes: [
            {
                gridlines: {
                    display: false
                },
                ticks: {
                    callback: value => numeral(value).format("0a")
                }
            }
        ]
    }
}


//default to cases if theres no cases type
function LineGraph({casesType='cases', ...props}) {
    const [data, setData] = useState({});
    const [graphColorBorder, setGraphColorBorder] = useState('#cc1034');
    const [graphColorBg, setGraphColorBg] = useState('rgba(204, 16, 52, 0.5)');


    //use effect to set graphColor
    useEffect(() => {
        switch(casesType) {
            case 'deaths':
                setGraphColorBorder('#333');
                setGraphColorBg('rgba(0, 0, 0, 0.5)');
                break;
            case 'recovered':
                setGraphColorBorder('greenyellow');
                setGraphColorBg('rgba(173, 255, 47, 0.5)');
                break;
            default:
                setGraphColorBorder('#cc1034');
                setGraphColorBg('rgba(204, 16, 52, 0.5)');
        }
    }, [casesType])


    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;

        //we're trying to get the new cases for each date, not total for each date
        for(let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint  //that is why we subtract the current and previous data
                }
                chartData.push(newDataPoint)
            }   //pushing data onto our array and updating previous data point, as we move end an iteration
            lastDataPoint = data[casesType][date]
        }
        return chartData;
    }


    useEffect(() => {
        //whenever you use a fetch() inside an useEffect, include the asycn and await
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then(response => response.json())
                .then(data => {
                    const chartData = buildChartData(data, casesType);
                    setData(chartData);
                })
        }   //displays data for past 120 days
        fetchData()
    }, [casesType])
        //we pass this cuz a change in casesType must re run the fetch


    return (
        <div className={`${props.className} ${props.theme}`}>   {/*necessary for chartjs, data key: our state data, border and bgColor defined as well*/}
            {data?.length > 0 && <Line data={{datasets: [{data: data, borderColor: graphColorBorder, backgroundColor: graphColorBg}]}} options={options}/>}
        </div>
    )       //optional chaining - initially checks whether data actually exists (in the data there's a time where there's no data), then checks whether the length of it is greater than 0
}

export default LineGraph
