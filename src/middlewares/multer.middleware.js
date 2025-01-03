// import multer from "multer";

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,"./public/temp")
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })

// export const upload=multer({storage:storage});
import multer from "multer";
import fs from "fs";
import path from "path";

// Define the upload directory path
const uploadDir = path.join(process.cwd(), "./public/temp");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`✅ Directory created: ${uploadDir}`);
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                return cb(err, null);
            }
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames with timestamp
    }
});

// Export the multer upload instance
export const upload = multer({ storage });
