const multer = require('multer');


const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        console.log(file);
        cb(null, 'uploads/');
    },

    filename: (req, file, cb)=> {
        const fileName = Date.now()+ '-' + file.originalname;
        cb(null,fileName)
    }
})

const upload = multer({storage: storage})

module.exports = upload;