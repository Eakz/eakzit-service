import React from 'react';

import { TrashIcon, DownloadIcon } from '@heroicons/react/solid';

import { useFileContext } from 'src/context/fileContext';
import { deleteFileAsync } from 'src/services/file.services';

const FileItem: React.FC<{ fileName: string }> = ({ fileName }) => {
  const { setFileList } = useFileContext();
  return (
    <div className='flex flex-row gap-4 w-full items-center'>
      <div className='m-2 px-4 py-2 rounded-md flex flex-1 flex-row justify-between items-center hover:cursor-pointer bg-gray-600 hover:bg-gray-800 dark:bg-gray-200 dark:hover:bg-gray-500'>
        <p className='text-lg font-bold text-gray-300 dark:text-gray-800'>
          {fileName}
        </p>
        <div className='flex flex-row gap-3 ml-4'>
          <DownloadIcon className='text-green-500 text-sm w-6 hover:bg-yellow-400 rounded' />
        </div>
      </div>
      <TrashIcon
        onClick={async () => {
          const response = await deleteFileAsync(fileName);
          if (response.status === 'SUCCESS') {
            setFileList(response.fileList);
          }
        }}
        className='text-red-500 text-sm w-6 h-6 hover:bg-red-500 hover:text-gray-900 hover:cursor-pointer rounded'
      />
    </div>
  );
};

const FileList: React.FC<{ files: string[] }> = ({ files }) => {
  return (
    <div className='max-w-4xl'>
      {files.map((file) => (
        <FileItem key={file} fileName={file} />
      ))}
    </div>
  );
};

export default FileList;
