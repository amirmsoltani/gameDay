import { useTheme } from "@mui/material";

const SettingIcon = ({activeTab}) => {
    const theme = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28.756"
            height="30.897"
            viewBox="0 0 28.756 30.897">
            <g
                id="Iconly_Light-Outline_Setting"
                data-name="Iconly/Light-Outline/Setting"
                transform="translate(-2 -2.001)">
                <g id="Setting" transform="translate(2 2)">
                    <path
                        id="Combined-Shape"
                        d="M15.309,1A3.965,3.965,0,0,1,19.28,5.085a1.593,1.593,0,0,0,.225.76,1.719,1.719,0,0,0,2.36.619,3.983,3.983,0,0,1,5.428,1.457l.929,1.609a1.268,1.268,0,0,1,.063.128,3.986,3.986,0,0,1-1.506,5.286,1.7,1.7,0,0,0-.632.628,1.75,1.75,0,0,0-.179,1.317,1.7,1.7,0,0,0,.805,1.048,3.958,3.958,0,0,1,1.446,5.423l-.99,1.649a3.973,3.973,0,0,1-5.408,1.43,1.775,1.775,0,0,0-.832-.231H20.98a1.725,1.725,0,0,0-1.2.5,1.7,1.7,0,0,0-.5,1.224A3.981,3.981,0,0,1,15.309,31.9H13.441a3.975,3.975,0,0,1-3.972-3.971,1.605,1.605,0,0,0-.225-.793,1.707,1.707,0,0,0-2.35-.643,3.971,3.971,0,0,1-5.432-1.528L.53,23.356a3.963,3.963,0,0,1,1.446-5.405,1.734,1.734,0,0,0,0-3A3.979,3.979,0,0,1,.528,9.53L1.539,7.87a3.968,3.968,0,0,1,5.4-1.44,1.632,1.632,0,0,0,.823.234A1.739,1.739,0,0,0,9.484,4.955,3.953,3.953,0,0,1,13.441,1Zm0,2.237H13.441A1.716,1.716,0,0,0,11.72,4.965,3.992,3.992,0,0,1,7.75,8.9a3.847,3.847,0,0,1-1.937-.54,1.737,1.737,0,0,0-2.35.65L2.453,10.67A1.731,1.731,0,0,0,3.1,13.011a3.971,3.971,0,0,1,0,6.877,1.723,1.723,0,0,0-.628,2.348l.941,1.622a1.739,1.739,0,0,0,2.377.692,3.954,3.954,0,0,1,2.99-.4,3.979,3.979,0,0,1,2.4,1.85,3.822,3.822,0,0,1,.529,1.909,1.739,1.739,0,0,0,1.736,1.746h1.868a1.737,1.737,0,0,0,1.736-1.725,3.956,3.956,0,0,1,3.977-3.965,4.061,4.061,0,0,1,1.912.528,1.745,1.745,0,0,0,2.371-.628l.99-1.651a1.723,1.723,0,0,0-.635-2.344,3.932,3.932,0,0,1-1.852-2.413,3.982,3.982,0,0,1,.4-3.011,3.935,3.935,0,0,1,1.448-1.445,1.738,1.738,0,0,0,.622-2.353.832.832,0,0,1-.052-.1l-.874-1.515A1.737,1.737,0,0,0,22.99,8.4a3.956,3.956,0,0,1-5.41-1.417,3.808,3.808,0,0,1-.535-1.918,1.779,1.779,0,0,0-.491-1.3A1.741,1.741,0,0,0,15.309,3.237ZM14.382,11.4a5.049,5.049,0,1,1-5.049,5.05A5.056,5.056,0,0,1,14.382,11.4Zm0,2.237a2.812,2.812,0,1,0,2.812,2.814A2.817,2.817,0,0,0,14.382,13.636Z"
                        transform="translate(0 -1.001)"
                        fill={activeTab === 'setting' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                        fillRule="evenodd"
                    />
                </g>
            </g>
        </svg>
    );
};

export default SettingIcon;
