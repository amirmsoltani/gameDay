import React from 'react'
import { PrimarySpinner } from '../base/loader/spinner';
import { Content } from './loading-style';



const Loading = () => {
  return (
      <Content display={'flex'} justifyContent="center" alignItems="center">
          <PrimarySpinner />
      </Content>
  );
}

export default Loading