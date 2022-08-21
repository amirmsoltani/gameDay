import { Grid, styled,TextField,Typography } from '@mui/material'
import Link from 'next/link'


export const MainContainer = styled(Grid)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 86,
  borderBottom: '1px solid #A587C2',
  paddingRight: 100,
  paddingLeft: 67,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const BrandPicture = styled('img')({
  width: 71.5,
  height: 67,
  borderRadius: '50%',
  objectFit: 'cover',
})

export const GridItem = styled(Grid)({
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const NavbarLink = styled(Link)({
  color: 'black',
  textDecoration: 'none',
  background: 'red',
})

export const CustomInputSearch = styled(TextField)({
  width:'80%',
  "& .MuiOutlinedInput-root":{
    "& .MuiInputBase-input":{
      marginTop:'5px',
      color:'#213950'
    },
      "& fieldset": { 
          borderColor: "#213950",
      },
      "&.Mui-focused fieldset": {
          borderColor: "#213950",
      }
  }
})

export const MainRowReverse = styled('div')({
  display:'flex',
  flexDirection:'row-reverse',
  alignItems: 'center'
})

export const MainColumn = styled('div')({
  display:'flex',
  flexDirection:'column'
})

export const TextLarge = styled(Typography)({
  margin:0,
  color:'#35094F',
  fontSize:'20px'
})

export const TextSmall = styled(Typography)({
  margin:0,
  color:'#35094F',
  fontSize:'15px',
  marginLeft:'auto'
})

export const PrictureUser = styled('img')({
  width: 65,
  height: 65,
  borderRadius: '50%',
  objectFit: 'cover',
  border:'1px solid #35094F',
  marginLeft:'30px'
})