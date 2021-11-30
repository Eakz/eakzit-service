import fs from 'fs';
import path from 'path';

import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { UPLOAD_FOLDER } from 'src/config/constants';
import { ApiResponse } from 'src/models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string> | { fileNames: string[] };

const oneMegabyteInBytes = 1000000;

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  storage: multer.diskStorage({
    destination: UPLOAD_FOLDER,
    filename: (_, file, cb) => {
      return cb(
        null,
        `${file.originalname.slice(0, 16)}-${Date.now()}${path.extname(
          file.originalname,
        )}`,
      );
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, _: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  // onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
  //   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  // },
});

apiRoute.use(upload.array('theFiles'));
apiRoute.post(
  (_: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const fileNames = fs.readdirSync(UPLOAD_FOLDER);

    res.status(200).json({ fileNames });
  },
);
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
