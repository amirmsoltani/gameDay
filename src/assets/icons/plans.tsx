import React from 'react';

type Props = {
    active?: boolean;
};
export default function PlansIcon({ active }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            cursor="pointer"
            style={{ marginTop: '0px' }}>
            <g id="Group_27700" data-name="Group 27700" transform="translate(-86 -286)">
                <g id="Group_24077" data-name="Group 24077" transform="translate(86 285.718)">
                    <g id="Group_24010" data-name="Group 24010">
                        <rect
                            id="Rectangle_6186"
                            data-name="Rectangle 6186"
                            width="58"
                            height="58"
                            rx="10"
                            transform="translate(0 0.282)"
                            fill={active ? '#fff' : 'rgba(255,255,255,0.76)'}
                        />
                    </g>
                </g>
                <g id="Group_24078" data-name="Group 24078" transform="translate(91 296.718)">
                    <g id="Group_23967" data-name="Group 23967">
                        <g
                            id="Rectangle_18180"
                            data-name="Rectangle 18180"
                            transform="translate(0 7.282)"
                            fill="none"
                            stroke='currentColor'
                            strokeWidth="1.2">
                            <path
                                d="M4,0h9a4,4,0,0,1,4,4V29a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V4A4,4,0,0,1,4,0Z"
                                stroke="none"
                            />
                            <path
                                d="M4,.6h9A3.4,3.4,0,0,1,16.4,4V28.4a0,0,0,0,1,0,0H.6a0,0,0,0,1,0,0V4A3.4,3.4,0,0,1,4,.6Z"
                                fill="none"
                            />
                        </g>
                        <g
                            id="Rectangle_18181"
                            data-name="Rectangle 18181"
                            transform="translate(16 0.282)"
                            fill="none"
                            stroke='currentColor'
                            strokeWidth="1.2">
                            <path
                                d="M4,0h9a4,4,0,0,1,4,4V36a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V4A4,4,0,0,1,4,0Z"
                                stroke="none"
                            />
                            <path
                                d="M4,.6h9A3.4,3.4,0,0,1,16.4,4V35.4a0,0,0,0,1,0,0H.6a0,0,0,0,1,0,0V4A3.4,3.4,0,0,1,4,.6Z"
                                fill="none"
                            />
                        </g>
                        <g
                            id="Rectangle_18182"
                            data-name="Rectangle 18182"
                            transform="translate(32 18.282)"
                            fill="none"
                            stroke='currentColor'
                            strokeWidth="1.2">
                            <path
                                d="M4,0h8a4,4,0,0,1,4,4V18a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V4A4,4,0,0,1,4,0Z"
                                stroke="none"
                            />
                            <path
                                d="M4,.6h8A3.4,3.4,0,0,1,15.4,4V17.4a0,0,0,0,1,0,0H.6a0,0,0,0,1,0,0V4A3.4,3.4,0,0,1,4,.6Z"
                                fill="none"
                            />
                        </g>
                    </g>
                    <text
                        id="_"
                        data-name="$"
                        transform="translate(19 28.282)"
                        fill='currentColor'
                        fontSize="18"
                        fontFamily="ArialMT, Arial">
                        <tspan x="0" y="0">
                            $
                        </tspan>
                    </text>
                </g>
            </g>
        </svg>
    );
}
