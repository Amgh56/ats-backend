import { diskStorage } from 'multer';
import { extname, basename, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// this config is made to make sure the files sent by the user 
// gets saved in folder called '/uploads' inside vs
export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = join(process.cwd(), 'uploads'); 
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      callback(null, uploadPath);
    },

    filename: (req, file, callback) => {
      const uploadPath = join(process.cwd(), 'uploads');
      const originalName = basename(file.originalname, extname(file.originalname));
      const extension = extname(file.originalname);
      let finalName = `${originalName}${extension}`;
      let counter = 1;
      while (existsSync(join(uploadPath, finalName))) {
        finalName = `${originalName}(${counter})${extension}`;
        counter++;
      }

      callback(null, finalName);
    },
  }),
};
