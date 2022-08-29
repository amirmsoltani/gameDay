import React, { FC } from 'react';

type PropsType = { color0: string; color1: string };

export const BarChart: FC<PropsType> = ({ color0, color1 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="135"
            height="48"
            viewBox="0 0 135 48">
            <defs>
                <linearGradient
                    id={`linear-gradient-${color0}`}
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits={'objectBoundingBox'}>
                    <stop offset="0" stopColor={color0} />
                    <stop offset="1" stopColor={color1} stopOpacity="0.502" />
                </linearGradient>
            </defs>
            <path
                id="Bar_Chart"
                data-name="Bar Chart"
                d="M127.768,48V26.4H135V48Zm-10.848,0V12h9.643V48Zm-10.848,0V24h9.643V48ZM95.223,48V32.4h9.643V48ZM84.375,48V18h9.643V48ZM73.527,48V6H83.17V48ZM62.679,48V18h9.643V48ZM51.83,48V24h9.643V48ZM40.982,48V0h9.643V48ZM30.134,48V12h9.643V48ZM21.7,48V26.4h7.232V48ZM10.848,48V12h9.643V48ZM0,48V24H9.643V48Z"
                fill={`url(#linear-gradient-${color0})`}
            />
        </svg>
    );
};
