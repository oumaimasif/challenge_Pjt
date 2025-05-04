import React from 'react'


function NoorWays() {
  return (
    <>
    <section className='bg-orange-100 mx-12 rounded-2xl  py-8 mb-3'>
    <div className='max-w-fullm mt-32 mx-44  min-h-svh  space-y-2 '>
      <h1 className='text-4xl mb-8 font-semibold text-zinc-800 text-start w-[78%]'>Vous etes dans <span className=' text-5xl font-rounded text-purple-800 '>NoorWays</span> qui connecte ceux qui veulent aider et ceux qui en ont besoin !</h1>
      <p className='text-[#252525] text-2xl'> NoorWays connecte les associations, les bénévoles et les particuliers pour une entraide plus accessible et efficace. Rejoignez la communauté et passez à l'action dès aujourd'hui 
      Notre objectif : rendre l'entraide plus accessible et plus efficace grâce à un espace dédié où chacun peut agir à son niveau.</p>
      <div className='p-8 grid grid-flow-col mr-8 gap-8 grid-cols-1 lg:grid-cols-3 '>
      <div className=' bg-white p-5 space-y-4  ' >
          <h1 className='text-zinc-600 font-rounded font-semibold'>Associations </h1>
          <ul className=' space-y-2 list-disc ml-6 '>
            <li>Trouvez facilement des bénévoles qualifiés pour vos missions.</li>
            <li>Gérez vos annonces et vos interactions avec un tableau de bord dédié </li>
            <li> Augmentez votre visibilité grâce à des publications et témoignages engageants.</li>
          </ul>
          <button className='bg-purple-800 text-white p-2 rounded-lg'>Trouver des Bénévoles</button>
        </div>
         <div className=' bg-white p-5 space-y-4 ' >
          <h1 className='text-zinc-600 font-rounded font-semibold'>Bénévoles </h1>
          <ul className=' space-y-2 list-disc ml-6 '>
            <li>Accédez à des missions adaptées à vos compétences et disponibilités</li>
            <li>Échangez directement avec les associations et les particuliers. </li>
            <li>Valorisez votre engagement avec un profil enrichi et des recommandations.</li>
          </ul>
          <button className='bg-purple-800 text-white p-2 rounded-lg'>Rejoindre une mission</button>
        </div>
          <div className=' bg-white p-5 space-y-4 ' >
          <h1 className='text-zinc-600 font-rounded font-semibold'>Particuliers </h1>
          <ul className=' space-y-2 list-disc ml-6 '>
            <li>Demandez de l'aide pour des services spécifiques (éducation, soutien, etc.).</li>
            <li>Trouvez des bénévoles prêts à vous aider rapidement.</li>
            <li>Participez à des actions solidaires et créez des liens avec la communauté.</li>
          </ul>
          <button className='bg-purple-800 text-white p-2 rounded-lg'>Commencer maintenant
          </button>
        </div>
      </div>
    </div>
      </section>
     
    </>
  )
}

export default NoorWays