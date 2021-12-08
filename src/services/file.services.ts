import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

import { UPLOAD_API } from 'src/config/constants';

export const uploadFileRequest = async (
  formData: FormData,
  cancelTokenSource: CancelTokenSource,
  progressCallback?: (progressEvent: ProgressEvent) => void,
): Promise<any> => {
  // const cancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
    cancelToken: cancelTokenSource.token,
  };
  try {
    const response = await axios.post(UPLOAD_API, formData, config);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const stopFileProcessing = async (): Promise<any> => {
  try {
    const response = await axios.get(UPLOAD_API);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getFileList = async () => {
  const config: AxiosRequestConfig = {
    // headers: { 'content-type': 'multipart/form-data' },
    validateStatus: () => true,
  };
  try {
    const response = await axios.get('/api/filelist/', config);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const deleteFileAsync = async (fileName: string) => {
  const config: AxiosRequestConfig = {
    validateStatus: () => true,
  };
  try {
    const response = await axios.post('/api/filelist/', { fileName }, config);
    return response.data;
  } catch (error) {
    return null;
  }
};
