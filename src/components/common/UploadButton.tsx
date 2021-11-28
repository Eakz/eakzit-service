import { FC, useRef } from 'react';

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
  className?: string;
}

export const UploadButton: FC<IProps> = ({
  children,
  acceptedFileTypes,
  onChange,
  uploadFileName,
  allowMultipleFiles,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <button type='button' onClick={onClickHandler} className={className}>
        {children}
      </button>
      <input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type='file'
      />
    </form>
  );
};

UploadButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};
