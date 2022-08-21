import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Table from 'src/components/table/table';

const WalletItem = (props) => {
    return (
        <Table
        {...props}
        disbalePaginate={true}
    />
    )
}

export default WalletItem

                            
