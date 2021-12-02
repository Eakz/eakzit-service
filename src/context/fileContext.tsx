import { createContext, ReactNode, useContext, useState } from 'react';

type FileContextType = {
  fileList: string[];
  cancelToken: any | null;
  loading: boolean;
  setLoading: (v: boolean) => void;
  setCancelToken: (v: any) => void;
  setFileList: (v: string[]) => void;
};
type ProviderProps = {
  children: ReactNode;
};

const fileContext: FileContextType = {
  fileList: [],
  cancelToken: null,
  loading: false,
  setLoading: () => {},
  setCancelToken: () => {},
  setFileList: () => {},
};

const FileContext = createContext<FileContextType>(fileContext);

export const FileContextProvider = ({ children }: ProviderProps) => {
  const [fileList, setFileList] = useState(fileContext.fileList);
  const [loading, setLoading] = useState(fileContext.loading);
  const [cancelToken, setCancelToken] = useState(fileContext.cancelToken);
  const value: FileContextType = {
    fileList,
    setFileList,
    loading,
    setLoading,
    cancelToken,
    setCancelToken,
  };
  return (
    <>
      <FileContext.Provider value={value}>{children}</FileContext.Provider>
    </>
  );
};

export function useFileContext() {
  return useContext(FileContext);
}
