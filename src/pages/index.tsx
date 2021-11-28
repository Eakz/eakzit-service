import React, { useState } from 'react';

import { DownloadIcon, UploadIcon } from '@heroicons/react/outline';

import { UploadButton } from 'src/components/common/UploadButton';
import { Meta } from 'src/layout/Meta';
import { uploadFileRequest } from 'src/services/upload.services';
import { Main } from 'src/templates/Main';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const onChange = async (formData: FormData) => {
    await uploadFileRequest(formData, (event) => {
      setProgress(Math.round((event.loaded * 100) / event.total));
    });
  };
  return (
    <Main
      meta={
        <Meta
          title='Next.js Boilerplate Presentation'
          description='Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework.'
        />
      }
    >
      <div>
        <div className='bg-white dark:bg-gray-800 rounded-lg w-72 md:shadow block p-4 m-auto'>
          <div>
            <span className='text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white dark:text-gray-800 bg-gray-800 dark:bg-gray-50'>
              Task in progress
            </span>
          </div>
          <div className='w-full h-4 bg-gray-400 rounded-full mt-3 relative'>
            <p className='text-xs self-auto absolute mx-24'>{progress}%</p>
            <div
              className='w-0 h-full text-center text-xs text-white bg-yellow-300 dark:bg-yellow-600 rounded-full'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className='flex flex-col items-center md:flex-row'>
          <button className='transition-all shadow drop-shadow-sm   bg-gray-300 hover:shadow-sm hover:drop-shadow-xl dark:hover:shadow-white hover:bg-gray-400 text-gray-800 hover:text-gray-50 w-32 font-bold m-5 md:m-10 py-2 px-4 rounded inline-flex items-center justify-between'>
            <DownloadIcon width={20} height={20} />
            <span>Download</span>
          </button>

          <UploadButton
            uploadFileName='theFiles'
            acceptedFileTypes='.pdf'
            onChange={onChange}
            className='transition-all shadow drop-shadow-sm bg-green-500 hover:shadow-md hover:drop-shadow-xl dark:hover:shadow-white hover:bg-green-400 text-gray-800 hover:text-gray-50 w-32 font-bold m-5 md:m-10 py-2 px-4 rounded inline-flex items-center justify-between'
          >
            <UploadIcon width={20} height={20} />
            <span>Upload</span>
          </UploadButton>
        </div>
      </div>
    </Main>
  );
};

export default Index;
