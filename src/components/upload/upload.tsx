import { getFullImageUrl } from '@/utils/helper/ui';
import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useState,
    DragEvent,
    useCallback
} from 'react';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import EditIcon from 'src/assets/icons/edit-icon';
import UploadIcon from 'src/assets/icons/upload';
import { useVideoUploader } from 'src/hooks/useMediaUploader';
import { MImage } from '../base/image/MImage';
import { UploadWrapper } from './upload-style';

type PropsType = {
    onSelect?: (fileName: string, duration: number) => void;
    onUpload: (fileName: string, fileUrl: string) => void;
    type: 'image' | 'video';
    size?: 'small' | 'large';
    defaultImage?: string;
};

export type RefType = {
    openSelector: () => void;
};

const UploadComponent = forwardRef<RefType | null, PropsType>(
    ({ onSelect, onUpload, type, size = 'large', defaultImage }, ref) => {
        const fileInput = useRef<HTMLInputElement>(null);
        const [activeDrag, setActiveDrag] = useState<boolean>(false);

        const { uploadOnFile, state } = useVideoUploader((status) => {
            onUpload(status.originalName, getFullImageUrl(status.url));
            fileInput.current.files = undefined;
        });

        const openSelector = () => {
            fileInput.current.click();
        };

        useImperativeHandle(
            ref,
            () => ({
                openSelector
            }),
            [fileInput.current]
        );

        const handleUpload = (file: File) => {
            if (onSelect) {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src);
                    onSelect(file.name, video.duration);
                    video.remove();
                };
                video.src = URL.createObjectURL(file);
            }
            uploadOnFile(file);
        };

        const handleDrag = useCallback(
            (event: DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                event.stopPropagation();
                if (!activeDrag && (event.type === 'dragenter' || event.type === 'dragover')) {
                    setActiveDrag(true);
                } else if (activeDrag && event.type === 'dragleave') {
                    setActiveDrag(false);
                }
            },
            [activeDrag]
        );

        const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();
            setActiveDrag(false);
            if (event.dataTransfer.files && event.dataTransfer.files[0]) {
                const file = event.dataTransfer.files[0];
                if ((file.type.includes(type), file.type)) {
                    handleUpload(file);
                }
            }
        }, []);

        return (
            <UploadWrapper
                className={size}
                onClick={openSelector}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}>
                {!activeDrag ? (
                    <>
                        <input
                            type={'file'}
                            accept={type === 'video' ? 'video/*' : 'image/*'}
                            hidden
                            ref={fileInput}
                            onChange={(event) => {
                                if (event.target.files.length) {
                                    handleUpload(event.target.files[0]);
                                }
                            }}
                        />
                        <div className="upload__main">
                            {(state.items.length || defaultImage) && type === 'image' ? (
                                <>
                                    <EditIcon className="upload__preview-icon" />
                                    <MImage
                                        resources={{
                                            src: state.items.length
                                                ? state.items[state.items.length - 1].localUrl
                                                : defaultImage
                                        }}
                                        className="upload__preview"
                                    />
                                </>
                            ) : (
                                <>
                                    <UploadIcon />
                                    <div className="upload__text">
                                        <span className="text__title">
                                            {type === 'image'
                                                ? 'Upload your illustrator'
                                                : 'Upload your video'}
                                        </span>
                                        <span className="text__description">
                                            Drag and drop or{' '}
                                            <span className="description__browse">browse</span> your
                                            file here
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="upload__drop">
                        <PlusIcon />
                        Drop Here
                    </div>
                )}
            </UploadWrapper>
        );
    }
);

export default UploadComponent;
