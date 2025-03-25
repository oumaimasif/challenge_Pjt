const multer = require("multer");
const path = require("path");

//definir ou en va stocker les fichiers
const stockage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier ou les fichiers seront sauvgardés
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
//initialisation de multer av des limites des taille
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
