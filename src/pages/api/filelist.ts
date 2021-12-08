export {};
// import fs from 'fs';

// import { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect from 'next-connect';

// import { UPLOAD_FOLDER } from 'src/config/constants';
// import { ApiResponse } from 'src/models/ApiResponse';

// interface NextConnectApiRequest extends NextApiRequest {
//   files: Express.Multer.File[];
// }
// interface DeleteFileRequest extends NextApiRequest {
//   body: {
//     fileName: string;
//   };
// }
// type ResponseData =
//   | ApiResponse<string[], string>
//   | { fileList: string[] }
//   | { status: string | null };

// const apiRoute = nextConnect({
//   onError(error, _: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.get((_, res) => {
//   const fileList = fs.readdirSync(UPLOAD_FOLDER);

//   res.status(200).json({ fileList });
// });
// apiRoute.post(async (req: DeleteFileRequest, res) => {
//   const { fileName } = req.body;
//   let fileList = fs.readdirSync(UPLOAD_FOLDER);
//   if (fileList) {
//     await fs.rm(`${UPLOAD_FOLDER}/${fileName}`, (e) => {
//       if (e) {
//         res.status(300).json({ status: 'ERROR', fileList });
//       } else {
//         fileList = fs.readdirSync(UPLOAD_FOLDER);
//         res.status(200).json({ status: 'SUCCESS', fileList });
//       }
//     });
//   } else {
//     res.status(200).json({ status: 'NOT FOUND', fileList });
//   }
// });

// export default apiRoute;
