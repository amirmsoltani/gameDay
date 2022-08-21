import { MImage } from '@/components/base/image/MImage'
import React from 'react'

const ImageClose = ({value}) => {
    return (
        <MImage
            key="0"
            resources={{ src: value,fallback:'/images/empty_profile.png' }}
            style={{ borderRadius: '50%', width: '42px', height: '42px', }}
        />
    )
}

export default ImageClose