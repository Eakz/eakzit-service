import React, { useState } from 'react';

import {
  // DownloadIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';

import { UploadButton } from 'src/components/common/UploadButton';
import { UPLOAD_API } from 'src/config/constants';
import { classNames } from 'src/helpers';
import { Meta } from 'src/layout/Meta';
import {
  stopFileProcessing,
  uploadFileRequest,
} from 'src/services/file.services';
import { Main } from 'src/templates/Main';
import { STATUS } from 'src/types/enums';

type Tdata = {
  path: string;
  name: string;
};

const checkStatus = (
  progress: number,
  data: null | { path: string; name: string },
): string => {
  if (data?.name) {
    return 'Please use link to download the file';
  }
  if (progress === 100) {
    return 'Converting to CMYK';
  }
  if (progress) {
    return 'File is uploading';
  }
  return '';
};
const getOrSetInitalData = (data?: Tdata): Tdata | null => {
  if (typeof window !== 'undefined') {
    if (data) {
      return JSON.parse(window.localStorage.getItem('data') || '') || null;
    }
    window.localStorage.setItem('data', JSON.stringify(data || {}));
  }
  return data || null;
};

const generateRandomProcessID = () => {
  return Math.random().toString().replace('.', '');
};

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<null | Tdata>(getOrSetInitalData());
  const [randomPID, setRandomPID] = useState<string | null>();
  const [cancelTokenSourceS, setCancelTokenSourceS] =
    useState<CancelTokenSource | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onCancel = async () => {
    if (cancelTokenSourceS) {
      cancelTokenSourceS.cancel();
      stopFileProcessing(randomPID || '');
    }
  };
  const onChange = async (formData: FormData) => {
    setLoading(true);
    setProgress(0);
    setData(null);
    const cancelToken = axios.CancelToken.source();
    setCancelTokenSourceS(cancelToken);
    const PID = generateRandomProcessID();
    setRandomPID(PID);
    try {
      const response = await uploadFileRequest(
        formData,
        PID,
        cancelToken,
        (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      );

      if (response?.status === STATUS.BUSY || !response) {
        setProgress(0);
        return;
      }
      const responseData = { name: response.name, path: response.path };
      setData(responseData);
      getOrSetInitalData(responseData);
    } catch (e) {
      setProgress(0);
      toast('File transforming script is currently busy', {
        type: 'error',
        position: 'top-center',
        theme: 'colored',
        className: 'custom-toast',
      });
    } finally {
      setCancelTokenSourceS(null);
      setLoading(false);
    }
  };
  return (
    <Main
      meta={
        <Meta
          title='Eakzit Site service.'
          description='Pdf Convertation service for advanced users'
        />
      }
    >
      <div className='flex flex-col items-center'>
        <div className='bg-white dark:bg-gray-800 rounded-lg w-72 md:shadow block p-4 m-auto'>
          <div>
            <span>
              <span className='text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white dark:text-gray-800 bg-gray-800 dark:bg-gray-50'>
                Task in progress:
              </span>
              <span
                className={classNames(
                  'py-2 px-1 text-xs',
                  progress && 'animate-pulse',
                )}
              >
                {checkStatus(progress, data)}
              </span>
            </span>
            {!progress && (
              <p className='py-2 px-1'>Click upload to get your file link</p>
            )}
          </div>
          {!!progress && !data?.name && (
            <div className='w-full h-4 bg-gray-400 rounded-full mt-3 relative'>
              <p className='text-xs self-auto absolute mx-24'>{progress}%</p>
              <div
                className='w-0 h-full text-center text-xs text-white bg-yellow-300 dark:bg-yellow-600 rounded-full'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          {loading && progress === 100 && (
            <div className='flex flex-col my-4 items-center justify-center w-full'>
              <div className='w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin flex justify-center items-end'>
                <div className='relative w-20 h-20 border-t-2 border-b-2 border-green-600 rounded-full animate-pulse animate-bounce flex justify-center items-center -my-4'>
                  <div className='absolute left-auto right-auto w-15 h-10 border-r-2 border-l-2 border-green-600 rounded-full animate-pulse animate-spin flex justify-center items-center'>
                    <div className='w-5 h-5 border-b-2 border-t-2 border-green-300 rounded-full animate-pulse flex justify-center animate-spin items-center'>
                      <p>+</p>
                    </div>
                  </div>
                  <div className='w-20 h-20 border-4 border-red-600 rounded-full animate-pulse animate-spin  animate-ping flex justify-center items-center'>
                    <div className='w-5 h-5 border-2 border-red-600 rounded-full animate-pulse  animate-ping flex justify-center items-center'></div>
                  </div>
                </div>
              </div>
              <p className='text-xs self-auto my-5 text-center'>
                Converting RGB pdf to CMYK - that might take a minute
              </p>
            </div>
          )}
          {!loading && data?.path && (
            <div className='flex flex-row justify-center items-center m-3 p-2 max-w-full'>
              <a
                href={`${UPLOAD_API}/${data?.path}`}
                className='max-w-full overflow-ellipsis'
                download
              >
                {data.name}
              </a>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center md:flex-row'>
          {/* <button
            onClick={getList}
            className='transition-all shadow drop-shadow-sm   bg-gray-300 hover:shadow-sm hover:drop-shadow-xl dark:hover:shadow-white hover:bg-gray-400 text-gray-800 hover:text-gray-50 w-32 font-bold m-5 md:m-10 py-2 px-4 rounded inline-flex items-center justify-between'
          >
            <DownloadIcon width={20} height={20} />
            <span>Download</span>
          </button> */}

          {!loading && (
            <UploadButton
              uploadFileName='rgbPdf'
              acceptedFileTypes='.pdf'
              onChange={onChange}
              className='transition-all shadow drop-shadow-sm bg-green-500 hover:shadow-md hover:drop-shadow-xl dark:hover:shadow-white hover:bg-green-400 text-gray-800 hover:text-gray-50 w-32 font-bold m-5 md:m-10 py-2 px-4 rounded inline-flex items-center justify-between'
            >
              <UploadIcon width={20} height={20} />
              <span>{`Upload ${data?.name ? ' More' : ''}`}</span>
            </UploadButton>
          )}
          {loading && (
            <button
              className='transition-all shadow drop-shadow-sm bg-red-500 hover:shadow-md hover:drop-shadow-xl dark:hover:shadow-white hover:bg-red-400 text-gray-800 hover:text-gray-50 w-32 font-bold m-5 md:m-10 py-2 px-4 rounded inline-flex items-center justify-between'
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>

        {/* {!!fileList?.length && <FileList files={fileList} />} */}
      </div>
    </Main>
  );
};

export default Index;
