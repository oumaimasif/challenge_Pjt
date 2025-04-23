const mongoose= require("mongoose");

const connectToDb = async ()=>
{
    try {
        await mongoose.connect(process.env.URI,{});
        console.log("Connecté à MongoDB");
                      
    } catch (err) {
        console.error("Erreur de connexion: ", err)    }
}

module.exports= connectToDb;