const mongoose= require("mongoose");
const uri = "mongodb+srv://Omaima134:Omaima134@cluster0.paelt.mongodb.net/dbnoorways?retryWrites=true&w=majority&appName=Cluster0";

const connectToDb = async ()=>
{
    try {
        await mongoose.connect(uri,{});
        console.log("Connecté à MongoDB");
                      
    } catch (err) {
        console.error("Erreur de connexion: ", err)    }
}

module.exports= connectToDb;