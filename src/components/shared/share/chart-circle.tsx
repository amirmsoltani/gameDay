import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,

};




const ChartCircle = ({visitor,capacity}) => {

    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 200).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = `${((visitor/capacity)*100).toFixed(1) || 0}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.5;
            ctx.fillText(text, textX, textY);
            ctx.save();
            var text2 = `${visitor} person`,
            text2X = Math.round((width - ctx.measureText(text2).width) / 2),
            text2Y = height / 2;
            ctx.fillText(text2, text2X, text2Y);
            ctx.save();
        },
    }]

    const data = {
        labels: [],
        datasets: [
            {
                label: '',
                data: [capacity-visitor, visitor],
                backgroundColor: [
                    '#CFB9E3',
                    '#3E205A',
                ],
                borderColor: [
                    '#CFB9E3',
                    '#3E205A',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} options={options} plugins={plugins} />;
}

export default ChartCircle;
