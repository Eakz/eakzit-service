import axios, { AxiosRequestConfig } from 'axios';

import { ApiResponse } from 'src/models/ApiResponse';

export const uploadFileRequest = async (
  formData: FormData,
  progressCallback?: (progressEvent: ProgressEvent) => void,
): Promise<ApiResponse<string[]> | null> => {
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
