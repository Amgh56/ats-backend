import { diskStorage } from 'multer';
import { extname, basename, join } from 'path';
import { existsSync } from 'fs';

export const multerConfig = {
  storage: diskStorage({
    destination: '/Users/abdullamaghrabi/Desktop/uploads',

    filename: (req, file, callback) => {
      const uploadFolder = '/Users/abdullamaghrabi/Desktop/uploads';
      const originalName = basename(file.originalname, extname(file.originalname));
      const extension = extname(file.originalname);
      let finalName = `${originalName}${extension}`;
      let counter = 1;
      while (existsSync(join(uploadFolder, finalName))) {
        finalName = `${originalName}(${counter})${extension}`;
        counter++;
      }

      callback(null, finalName);
    },
  }),
};
