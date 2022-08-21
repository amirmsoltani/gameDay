import Typography from '@mui/material/Typography';
import { Button,Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {useState} from 'react'
import { useSession_AddRateMutation } from 'src/graphql/generated';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import {  useQueryClient } from 'react-query';


const RatingComponent = ({variables}) => {
    const {sessionid} = variables;
    const [sessionrate, setSessionRate] = useState(0);
    const [healerrate, setHealerRate] = useState(0);
    const {mutate,isLoading} = useSession_AddRateMutation();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();

    const handleSubmitRate = ()=>{
        mutate({
            sessionId :Number(sessionid),
            rateInput:{
                sessionRate:sessionrate,
                healerRate:healerrate
            }
        }, {
            onSuccess: () => { enqueueSnackbar('Operation was successful!', { variant: 'success' }),dispatch(closeModal('1')) },
            onError: () => { enqueueSnackbar('Operation Failed!', { variant: 'error' }) }
        })
    }

    const handleCancel = ()=>{
        console.log('javad')
        dispatch(closeModal('1'))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '110px' }}>
            <div style={{ width: '500px',marginTop:'20px' }}>
                <div style={{ width: '300px', margin: '0 auto', }}>
                    <Typography sx={{ color: '#213950' }}>Rate your session</Typography>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'30px'}}>
                    <Rating
                        name="simple-controlled"
                        value={sessionrate}
                        onChange={(event, newValue) => {
                            setSessionRate(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ width: '300px', margin: '0 auto',marginTop:'10px' }}>
                    <Typography sx={{ color: '#213950' }}>Rate your healer</Typography>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'30px'}}>
                        <Rating
                            name="simple-controlled"
                            value={healerrate}
                            onChange={(event, newValue) => {
                                setHealerRate(newValue);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <LoadingButton variant="contained" onClick={handleSubmitRate} loading={isLoading} sx={{ textTransform: 'none', width: '200px', height: '35px', marginRight: '28px', backgroundColor: '#A587C2', borderRadius: '18px', color: '#fff', ':hover': { backgroundColor: '#A587C2' } }} ><Typography sx={{ fontSize: '18px',color:'#fff' }} >Accept</Typography></LoadingButton>
                <Button sx={{ textTransform: 'none', width: '200px', height: '35px', backgroundColor: '#fff', borderRadius: '18px', color: '#A587C2', border: '1px solid #3E205A', ':hover': { backgroundColor: '#fff' } }} onClick={handleCancel}><Typography sx={{ fontSize: '18px',color:'#3E205A' }}>Reject</Typography></Button>
            </div>
        </div>
    )
}

export default RatingComponent