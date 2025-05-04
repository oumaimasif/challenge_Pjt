import { CalendarDays, CalendarDaysIcon } from "lucide-react";

export const DateString = (date) => {
    const dateFormatee = new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    return dateFormatee;
}



//calculer l'age 
// export const calculerAge = (dateDeNaissance) => {
//     const aujourdhui = new Date();
//     const dateDeNaissance = new Date(dateDeNaissance);
//     let age = aujourdhui.getFullYear() - dateDeNaissance.getFullYear()
//     const mois = aujourdhui.getMonth() - dateDeNaissance.getMonth()
//    if(mois>0 || (mois===0 && aujourdhui.getDate()<dateDeNaissance.getDate())){
//     age--;
//    }
//     return age;
// }

export const TodayDate = () => {
    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
    return (
        <div className="text-sm text-gray-600 flex items-center">
            <CalendarDays className=" size-5 mr-2"/>
            {today.charAt(0).toUpperCase() + today.slice(1)}

        </div>
    )
}