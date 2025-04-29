
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