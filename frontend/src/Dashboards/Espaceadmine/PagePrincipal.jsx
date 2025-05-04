import React, { useState } from 'react'
import SideBar from '../SideBar'
import Nav from '../Nav'
// import AdminBenevoles from './AdminBenevoles';




export default function PagePrincipal() {
    const [isOpenSide, setIsOpenSide] = useState(false);
    return (
        <div className=' h-screen '>

            <div className='flex-shrink-0'>
                <SideBar isOpenSide={isOpenSide}  setIsOpenSide={setIsOpenSide}/>
            </div>

            <div className='fixed  top-0 ml-[280px]'>
                <Nav isOpenSide={isOpenSide} />
            </div>
            <div className='  bg-gray-100' >
                               {/* le contenu  */}
            </div>


        </div>
    )
}
