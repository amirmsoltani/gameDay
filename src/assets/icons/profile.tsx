import React from 'react';

type Props = {
    active?: boolean;
};
export default function ProfileIcon({ active }: Props) {
    return (
        <svg
            id="Group_27699"
            data-name="Group 27699"
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            cursor="pointer"
            viewBox="0 0 58 58">
            <rect
                id="Rectangle_6186"
                data-name="Rectangle 6186"
                width="58"
                height="58"
                rx="10"
                fill={active ? '' : 'rgba(255,255,255,0.76)'}
            />
            <g id="Group_24075" data-name="Group 24075" transform="translate(11.48 7.211)">
                <path
                    id="Path_43452"
                    data-name="Path 43452"
                    d="M266.5,83.982a10.3,10.3,0,1,0-7.277-3.015,10.3,10.3,0,0,0,7.277,3.015Zm0-19.357a9.073,9.073,0,1,1-6.41,2.657,9.067,9.067,0,0,1,6.41-2.657Z"
                    transform="translate(-248.977 -63.389)"
                    fill='currentColor'
                />
                <path
                    id="Path_43453"
                    data-name="Path 43453"
                    d="M194.035,318.978H221.7a3.688,3.688,0,0,0,3.688-3.688v-1.125a17.526,17.526,0,0,0-35.04,0v1.125a3.688,3.688,0,0,0,3.689,3.688Zm-2.459-4.813h0a16.3,16.3,0,0,1,32.581,0v1.125a2.459,2.459,0,0,1-2.459,2.459H194.035a2.459,2.459,0,0,1-2.459-2.459Z"
                    transform="translate(-190.346 -275.399)"
                    fill='currentColor'
                />
            </g>
        </svg>
    );
}
