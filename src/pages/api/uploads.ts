import fs from 'fs';
import path from 'path';

import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextConnect } from 'next-connect';

import { UPLOAD_FOLDER } from 'src/config/constants';
import { ApiResponse } from 'src/models/ApiResponse';
import { STATUS } from 'src/types/enums';

const { exec } = require('child_process');

interface NextConnectApiRequest extends NextApiRequest {
  files: [Express.Multer.File];
}
type ResponseData =
  | ApiResponse<string[], string>
  | { fileNames?: string[]; path: string; name: string }
  | { status: STATUS };

const oneMegabyteInBytes = 1000000;

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 20 },
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
interface TnextConnect
  extends NextConnect<NextConnectApiRequest, NextApiResponse<ResponseData>> {
  pid?: any | undefined;
}

const apiRoute: TnextConnect = nextConnect({
  onError(error, _: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  // onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
  //   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  // },
});
apiRoute.pid = undefined;
apiRoute.use(upload.array('theFiles'));
apiRoute.get(
  async (_: NextApiRequest, res: NextApiResponse<{ status: STATUS }>) => {
    if (typeof apiRoute.pid !== 'undefined' && typeof process !== 'undefined') {
      const killedProcess = process.kill(apiRoute.pid);
      console.log(`PID - ${apiRoute.pid}, processKilled -${killedProcess}`);
      apiRoute.pid = undefined;
      res.status(200).json({ status: STATUS.SUCCESS });
    } else {
      res.status(200).json({ status: STATUS.FAIL });
    }
  },
);
apiRoute.post(
  async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    if (apiRoute.pid) {
      res.status(200).json({ status: STATUS.BUSY });
      return;
    }
    const fileNames = fs.readdirSync(UPLOAD_FOLDER);
    const fileName = req.files[0]?.filename;
    const absPathToFile = path.join(process.cwd(), req.files[0].path);
    const folderPath = path.join(process.cwd(), 'public/transformed');
    const cmykFileName = `CMYK-${fileName}`;
    const pathToCmykFile = path.join(`${folderPath}/${cmykFileName}`);
    console.log('BEFORE EXECUTION');
    const childProcess = await exec(
      `./convert.sh -f ${absPathToFile} -t ${pathToCmykFile}`,
      {},
      // @ts-ignore
      (err, stdout, stderr) => {
        if (err) {
          // some err occurred
          res.status(501).json({ error: 'File failure' });
        } else {
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          res.status(200).json({
            fileNames,
            path: `transformed/${cmykFileName}`,
            name: cmykFileName,
          });
        }
      },
    );
    apiRoute.pid = childProcess.pid;
    console.log('ACTIVE PID', apiRoute.pid);
  },
);
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
