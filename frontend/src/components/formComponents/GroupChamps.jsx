import React from 'react'

export default function GroupChamps({children}) {
  return (
    <div className='grid md:grid-cols-2 md:gap-6'>
        {children}
    </div>
  )
}
