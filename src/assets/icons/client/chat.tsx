import { useTheme } from "@mui/material";

const ChatIcon = ({activeTab}) => {
    const theme = useTheme();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29.005"
            height="29.006"
            viewBox="0 0 29.005 29.006">
            <g
                id="Iconly_Light-Outline_Chat"
                data-name="Iconly/Light-Outline/Chat"
                transform="translate(-1 -1)">
                <g id="Chat" transform="translate(1 1)">
                    <path
                        id="Combined-Shape"
                        d="M14.5,0A14.5,14.5,0,0,1,24.762,24.763,14.569,14.569,0,0,1,8.393,27.671,4.83,4.83,0,0,0,6.9,27.226a5.848,5.848,0,0,0-1.613.406c-1.179.4-2.648.91-3.734-.173s-.583-2.548-.181-3.726a5.806,5.806,0,0,0,.4-1.633,4.74,4.74,0,0,0-.455-1.532A14.552,14.552,0,0,1,4.249,4.247,14.4,14.4,0,0,1,14.5,0Zm0,2.024A12.4,12.4,0,0,0,5.679,5.679a12.541,12.541,0,0,0-2.5,14.088A6.372,6.372,0,0,1,3.8,22.1a7.3,7.3,0,0,1-.51,2.286c-.2.578-.5,1.449-.3,1.641s1.065-.112,1.644-.31A7.368,7.368,0,0,1,6.894,25.2a6.27,6.27,0,0,1,2.3.611A12.489,12.489,0,0,0,23.332,5.678,12.4,12.4,0,0,0,14.506,2.025Zm5.326,11.69a1.349,1.349,0,1,1-.012,0Zm-5.41,0a1.349,1.349,0,1,1-.012,0Zm-5.41,0a1.349,1.349,0,1,1-.012,0Z"
                        transform="translate(0 0)"
                        fill={activeTab === 'chat' ? theme.palette.primary.dark : theme.palette.secondary.darker}
                        fillRule="evenodd"
                    />
                </g>
            </g>
        </svg>
    );
};

export default ChatIcon;
