const multer = require('multer');
const Path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const [name, ext] = file.originalname.split('.');
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

const limits = {
    fieldNameSize: 300,
    fileSize: 1048576, // 1 Mb allowed 
}

const fileFilter = (req, file, cb) => {
    const acceptableExtensions = ['.png', '.jpg', '.gif'];
    if (!(acceptableExtensions.includes(Path.extname(file.originalname)))) {
      return cb(new Error('Bad file type'));
    }

    // added this
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1048576) {
      return cb(new Error('Exceeded file size'));
    };
    cb(null, true);
};

const imageUpload = multer({ storage, limits, fileFilter });      // returns three different middlewares for FormData with files/data, only data, multiple files

module.exports = imageUpload;