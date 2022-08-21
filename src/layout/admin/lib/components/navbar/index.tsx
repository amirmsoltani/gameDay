import { InputAdornment, Hidden,styled } from '@mui/material'
import * as S from './styles'
import SearchIcon from './search-icon'
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import { useGetUser } from 'src/auth/UserProvider';
import UserProfile from 'src/assets/user-profile';
import { useRef,useState } from 'react';
import { useRouter } from 'next/router';
import { NavbarModalContainerAdmin } from '@/components/navbar/styled.navbar';
import { ModalBody } from './../../../../../components/navbar/components/profile-section';
import { closeModal, newModal } from 'src/redux/actions/actions';


const Navbar = () => {
  const pageData = useSelector(({ pageData }: any) => pageData);
  const dispatch = useDispatch();
  const user = useGetUser();
  const router = useRouter()


  const onClickHandler = () => {
      if (window.innerWidth > 900) {
          dispatch(
              newModal({
                  id: 'dashboard-logout',
                  closeButton: false,
                  Container: NavbarModalContainerAdmin,
                  Body: ModalBody,
              })
          );
      }
  };


  return (
    <S.MainContainer container>
      <S.GridItem item md={4}   >
        <S.BrandPicture src="/images/Subtraction6.png" style={{cursor:'pointer'}} onClick={()=>router.push("/")} />
      </S.GridItem>
      <Hidden mdDown={true}>
        <S.GridItem item md={5} >
          {
            (pageData?.activeTabParent?.id !== "dashboard" && pageData?.activeTabParent?.id !== undefined) &&
            <S.CustomInputSearch
              placeholder={pageData?.activeTabParent?.id === "healers" ? "Search Healer" : pageData?.activeTabParent?.id === "client" ? "Search Client" : pageData?.activeTabParent?.id === "financial" ? "Search Healer/Client" : null}
              id="standard"
              variant="outlined"
              value={pageData?.searchdata}
              onChange={(e) => dispatch(setPageData({ ...pageData, searchdata: e.target.value, activePage: 1 }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  height: '35px',
                  width: '100%'
                }
              }}
            />
          }
        </S.GridItem>
      </Hidden>
      <S.GridItem item md={3}  >
        <S.MainRowReverse onClick={onClickHandler}>
          {user?.imageAddress ? <S.PrictureUser src={String(user?.imageAddress)} /> : <UserProfile style={{marginLeft:'15px'}} />}
          <S.MainColumn>
            <S.TextLarge>{user?.email}</S.TextLarge>
            <S.TextSmall>{user?.name}</S.TextSmall>
          </S.MainColumn>
        </S.MainRowReverse>
      </S.GridItem>
    </S.MainContainer>
  )
}

export default Navbar
