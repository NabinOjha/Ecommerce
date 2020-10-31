const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.split('/')[0];

    if (type === 'image') {
      cb(null, path.join(__dirname, '../public', 'image'));
    } else {
      cb(null, path.join(__dirname, '../public', 'else'));
    }
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.split('.')[0] + '-' + Date.now();
    const ext = file.originalname.split('.')[
      file.originalname.split('.').length - 1
    ];
    fileName = `${fileName}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  if (type === 'image') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({ storage, fileFilter });

module.exports = uploads;
