const multer = require("multer");
const path = require("path");
const fs = require('fs')

//dossiers de destination selon le type d'utilisateur 
const getDestination = (req)=>{
  let folder ="uploads/uploadsBenevole";//par defaut pr les benevoles
  if (req.baseUrl.includes("associations"))
  {
    folder ="uploads/uploadsAssociation";
  }else if (req.baseUrl.includes("particuliers"))
  {
    folder ="uploads/uploadsParticulier"
  }else if (req.baseUrl.includes("annonces"))
  {
    folder = "uploads/uploadsAnnonce"
  }

  return folder;
}


//definir ou en va stocker les fichiers
const stockage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "uploads/"); // dossier ou les fichiers seront sauvgardés
    cb(null, getDestination(req));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //nom unique pr chaque fichier   }
  },
});

//filtrer les types de fichiers (seulement images)
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
const fileFilter =(req,file,cb)=>{
if (allowedTypes.includes(file.mimetype)) {
  cb(null, true);
} else {
    cb(new Error("Seuls les fichiers JPEG, JPG et PNG sont autorisés"),false);
}
};
//initialisation de multer en limitant la taille
const upload = multer({
  storage: stockage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //5mo max
});

module.exports= upload;

/* 
// Configuration de Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite : 5 Mo
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Types de fichiers autorisés
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extname && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Seuls les fichiers JPEG, JPG et PNG sont autorisés"));
        }
    },
});

module.exports = upload;
 */
