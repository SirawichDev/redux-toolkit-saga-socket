import React, { FC } from 'react'

type TransparentProps = {
    transparent: boolean
}
const Loader: FC<TransparentProps> = ({ transparent }) => {
    return (
        <div className={`loader-container ${transparent ? 'transparent' : ''}`}>
            <div className='logo'>
                <div className="loader"/>
            </div>
        </div>
    )
}


export default Loader