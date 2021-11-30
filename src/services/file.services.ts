import axios, { AxiosRequestConfig } from 'axios';

export const uploadFileRequest = async (
  formData: FormData,
  progressCallback?: (progressEvent: ProgressEvent) => void,
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
  };
  try {
    const response = await axios.post('/api/uploads', formData, config);
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
