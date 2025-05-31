import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    },
});

const fileFilter = (_, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
