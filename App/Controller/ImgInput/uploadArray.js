const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/upload/projects/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)
        },
    }),
    fileFilter: (req, file, cb) => {
        const extensãoImg = ['image/jpg', 'image/jpg', 'image/jpeg', 'image/png'].find(formatoAceito => formatoAceito == file.mimetype);
        if (extensãoImg) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    },
    limits: {
        fileSize: 1000000,
        files: 4
    }
})
)