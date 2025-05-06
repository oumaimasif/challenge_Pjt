import React, { useState } from 'react'
import SideBar from './SideBar'
import Nav from './Nav'
// import AdminBenevoles from './AdminBenevoles';



//admin Layout 
export default function PagePrincipal({children}) {
    const [isOpenSide, setIsOpenSide] = useState(false);
    return (
        <div className=' flex overflow-hidden bg-gray-100 h-screen '>

            {/* <div className='flex-shrink-0'> */}
                <SideBar isOpenSide={isOpenSide}  setIsOpenSide={setIsOpenSide}/>
            {/* </div> */}

            <div className={`flex flex-1 flex-col transition-all duration-300 ${isOpenSide ? 'ml-64':'ml-20'}`}>
                <Nav isOpenSide={isOpenSide} />
      

            <main className='overflow-y-auto p-6' >
                {children}
            </main>
            </div>


        </div>
    )
}
