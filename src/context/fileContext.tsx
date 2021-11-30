import { createContext, ReactNode, useContext, useState } from 'react';

type FileContextType = {
  fileList: string[];
  loading: boolean;
  setLoading: (v: boolean) => void;
  setFileList: (v: string[]) => void;
};
type ProviderProps = {
  children: ReactNode;
};

const fileContext: FileContextType = {
  fileList: [],
  loading: false,
  setLoading: () => {},
  setFileList: () => {},
};

const FileContext = createContext<FileContextType>(fileContext);

export const FileContextProvider = ({ children }: ProviderProps) => {
  const [fileList, setFileList] = useState(fileContext.fileList);
  const [loading, setLoading] = useState(fileContext.loading);
  const value: FileContextType = {
    fileList,
    setFileList,
    loading,
    setLoading,
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
