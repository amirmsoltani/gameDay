import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { MImage } from '@/components/base/image/MImage';

export const Container = styled(Box)`
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
`;

export const Sidebar = styled(Box)`
    ${({ theme }) => `
    background-color:${theme.palette.primary.dark};
    color:${theme.palette.common.white};
  `};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    padding-left: 5px;

    .sidebar-header {
        margin-top: 32px;
        padding-left: 32px;
    }

    .sidebar-body {
    }

    .sidebar-footer {
        margin-bottom: 114px;
    }

    .sidebar-header,
    .sidebar-body,
    .sidebar-footer {
        display: flex;
        flex-direction: column;
    }
`;
export const Header = styled(Box)`
    background-color: ${({ theme }) => theme.palette.grey.main};
`;

export const Content = styled(Box)`
    background-color: #f8f8f8;
    max-height: 100vh;
    position: relative;

`;

export const Body = styled(Box)`
    overflow-y: scroll;
`;

export const SidebarItem = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 12px 0;

    ::before {
        content: '';
        width: 4px;
        height: 16px;
        border-radius: 3px;
        display: inline-block;
        margin-left: 2px;
    }

    ${({ theme }) => `
    svg{
      fill:${theme.palette.common.white};
      width:24px
      height:24px;
      margin: 0 20px;
    }
    &.active , &:hover {
      background-color:#F4F5F5;
      color:${theme.palette.primary.main};
      
      ::before {
        background-color: ${theme.palette.primary.main};
      }
      
      svg{
        fill:${theme.palette.primary.main};
      }
  }
  `}
`;

export const LogoBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`;

export const Logo = styled(MImage)`
    max-width: 45px;
    max-height: 45px;
`;

export const TextLogo = styled(MImage)`
    max-width: 120px;
    max-height: 25px;
    margin-left: 12px;
`;
