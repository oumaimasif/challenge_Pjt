import { Bell, Building2, CheckSquare, LayoutDashboard, LucideArrowLeftToLine, MessageCircleQuestion, User2, Users } from 'lucide-react'
import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import GoHome from '../components/formComponents/GoHome'

export default function SideBar({ isOpenSide, setIsOpenSide }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNAvClick = () => {
    if (window.innerWidth < 768)
    {
      setIsOpenSide(false);
    }
   }

  return (
    <div className={` fixed h-screen ${isOpenSide ? ' w-64' : 'w-20'} bg-purple-800 text-white flex flex-col justify-between transition-all duration-300`}>

      <div>
        <div className='py-4 px-7   items-center flex justify-between '>
          {isOpenSide && <h1 className='font-bold text-2xl'>NoorAdmin</h1>}
          <button onClick={() => setIsOpenSide(!isOpenSide)} aria-label={`${isOpenSide} ? 'Fermer menu' : 'Ouvrir menu'`}>

            {isOpenSide ?
              (
                <>
                  <MdClose className="text-white size-6" />
                </>) :
              (<MdMenu className="text-white  size-6" />)
            }
          </button>
        </div>

        <div className=' border-b border-gray-400'></div>

        <nav className='space-y-1 mt-4 px-2'>
          <Link to="/adminDashboard" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/adminDashboard" ?
            ' bg-zinc-600 ' : 'hover: bg-zinc-400 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                < LayoutDashboard className='size-6 mr-3' />
                Tableau de bord
              </div>
            ) : (<LayoutDashboard className='size-6 mx-auto' />)
            }
          </Link>

          <Link to="/admin/benevoles" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/benevoles" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <Users className='size-6 mr-3' />
                Bénévoles
              </div>
            ) : (<Users className='size-6 mx-auto' />)
            }
          </Link>


          <Link to="/admin/associations" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/associations" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <Building2 className='size-6 mr-3' />
                Associations
              </div>
            ) : (<Building2 className='size-6 mx-auto' />)
            }
          </Link>
          <Link to="/admin/particuliers" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/particuliers" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <User2 className='size-6 mr-3' />
                Particuliers
              </div>
            ) : (<User2 className='size-6 mx-auto' />)
            }
          </Link>


          <Link to="/admin/annonces" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/annonces" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <Bell className='size-6 mr-3' />
                Annonces
              </div>
            ) : (<Bell className='size-6 mx-auto' />)
            }
          </Link>

          <Link to="/admin/demandesaide" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/demandesaide" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <MessageCircleQuestion className='size-6 mr-3' />
                Demandes d'aide
              </div>
            ) : (<MessageCircleQuestion className='size-6 mx-auto' />)
            }
          </Link>

          <Link to="/admin/approbations" className={`flex items-center text-white px-4 py-3 rounded-md ${location.pathname === "/admin/approbations" ?
            ' bg-zinc-600 ' : 'hover:bg-gray-500 text-white'} `} onClick={handleNAvClick}>
            {isOpenSide ? (
              <div className='flex items-center'>
                <CheckSquare className='size-6 mr-3' />
                Approbations
              </div>
            ) : (<CheckSquare className='size-6 mx-auto ' />)
            }
          </Link>

        </nav>

      </div>



      <div className=' '>
        <div className=' border-t my-4 border-gray-400'></div>

        <button onClick={() => navigate("/")}
          className='  fixed bottom-4   left-2 text-white p-3 rounded-full  transition-all duration-300 flex items-centre justify-center  '
          aria-label='Retour au site'>
          {isOpenSide ? (
            <div className='flex  items-center'>
              <LucideArrowLeftToLine className='size-6 mr-3' /> Retour au site

            </div>
          ) : (<LucideArrowLeftToLine className='size-6 ' />)
          }
        </button>
      </div>

    </div>
  )
}
