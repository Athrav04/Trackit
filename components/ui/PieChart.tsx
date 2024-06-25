"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import React from 'react'

const AccountCharts = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets: [{
            label:"Banks",
            data: [1203 ,2342,2342],
            backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
        }],
        labels: ['HDFC','ICICI','SBI']
    }
  return (
     <Doughnut data={data} options={
      {
        cutout:'60%',
        plugins:{
          legend:{
            display:false
          }
        }
      }
    }/>
  )
}

export default AccountCharts