import fs from 'fs';

import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { ApiResponse } from '../../../models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (_, file, cb) => {
      return cb(null, file.originalname);
    },
  }),
  // fileFilter: (req, file, cb) => {
  //   const acceptFile: boolean = ['.pdf'].includes(file.mimetype);
  //   console.log('ac', acceptFile);
  //   cb(null, acceptFile);
  // },
});

const apiRoute = nextConnect({
  onError(error, _: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post(
  (_: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const filenames = fs.readdirSync(outputFolderName);
    const images = filenames.map((name) => name);

    res.status(200).json({ data: images });
  },
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
