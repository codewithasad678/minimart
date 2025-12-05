const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : function (req,file, cb){
       cb(null, path.join(__dirname, "../storage/product_images"));
    },
    filename : function (req,file, cb){
        const uniqueSuffix = Date.now() + '-' +
        Math.round(Math.random() * 1E9) + path.extname(file.originalname);

        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes =  ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    
    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'),false);
    }   
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: fileFilter
});
console.log("Upload middleware configured");

module.exports = upload;