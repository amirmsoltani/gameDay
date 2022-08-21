import { MImage } from '@/components/base/image/MImage'
import React from 'react'

const ImageTable = ({value}) => {
    return (
        <MImage
            key="0"
            resources={{ src: value,fallback:'/images/empty_profile.png' }}
            style={{ borderRadius: '50%', width: '30px', height: '30px', }}
        />
    )
}

export default ImageTable