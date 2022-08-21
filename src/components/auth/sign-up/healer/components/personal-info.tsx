import { MInputFormik } from '@/components/base/input/MInput';
import { Spacer } from '@/components/base/spacer';
import { getFullImageUrl } from '@/utils/helper/ui';
import { Box, styled, Typography, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';
import ImageUploadIcon from 'src/assets/icons/auth/image-upload';
import EyeVacation from 'src/assets/icons/eye-vacation';
import UploadFileIcon from 'src/assets/icons/upload-file';
import { useFileUpload } from 'src/hooks/useUploadFile';
import { FilePickerContent as FilePicker, removeItemFromState, UploadedFile } from './../step-two';
import ImageSetting from './../../../../../assets/icons/image-setting';
import { string } from 'yup/lib/locale';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { Genders } from 'src/graphql/generated';
import { FilePickerContent } from '../../client';
import { newModal } from 'src/redux/actions/actions';
import { useDispatch } from 'react-redux';
import { EvaluationModal } from './evaluation-modal';

const PhotoContainer = styled(Box)<{ showVacation?: String }>(({ theme, showVacation }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 99,
    height: 99,
    border: showVacation === 'true' ? 'none' : `1px solid ${theme.palette.secondary.darker}`,
    borderRadius: '50%'
}));

const ProfilePhoto = styled('img')({
    width: 99,
    height: 99,
    objectFit: 'cover',
    borderRadius: 60
});

const CustomParent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0'
});

const CustomDiv = styled('div')({
    borderRadius: 12,
    border: '1px solid black',
    width: 350,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    cursor: 'pointer',
    padding: '0 15px'
});

const UploadProgress = styled('div')<{ progress?: number }>(({ progress }) => ({
    display: 'flex',
    columnGap: 10,
    backgroundColor: '#F5F5F5',
    margin: 5,
    borderRadius: 5,
    padding: '1px 4px',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 170,
    '&:before': {
        display: 'flex',
        alignItems: 'center',
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: `${100 - progress}%`,
        backgroundColor: '#CFB9E3',
        transition: '0.7s'
    }
}));

// export function FilePickerContent({ initialData, onChange, value, showVacation = false }) {
//     const inputRef = useRef(null);
//     const { file, upload, reset, progress } = useFileUpload(initialData, onChange);
//     return (
//         <>
//             <CustomParent>
//                 <PhotoContainer
//                     style={{ border: 'none' }}
//                     onClick={() => inputRef.current.click()}
//                     onDragOver={dragHandler}
//                     onDrop={dropHandler}
//                     onDrag={dragMainHandler}
//                     showVacation={String(showVacation)}>
//                     {(value?.profilePhoto?.url !== '' && value?.profilePhoto?.url !== null ) ?
//                         <ProfilePhoto
//                             src={
//                                 getFullImageUrl(value?.profilePhoto?.url) ||
//                                 getFullImageUrl(value?.profilePhoto?.objectUrl)
//                             }
//                         /> : (progress < 100) ||
//                         (!file ? (
//                             showVacation === true ? (
//                                 <ImageSetting />
//                             ) : (
//                                 <ImageUploadIcon />
//                             )
//                         ) : (
//                             <ProfilePhoto
//                                 src={
//                                     getFullImageUrl(value?.profilePhoto?.url) ||
//                                     getFullImageUrl(value?.profilePhoto?.objectUrl)
//                                 }
//                             />
//                         ))
//                     }
//                 </PhotoContainer>
//                 <input
//                     ref={inputRef}
//                     type="file"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={(e) => readImage(e.target.files[0])}
//                 />
//             </CustomParent>

//             {/* {file && progress !== 100 && (
//                 <UploadedFile file={file} onRemove={reset} progress={progress} />
//             )} */}
//         </>
//     );
//     function resetHandler() {
//         reset();
//     }

//     function dragHandler(e) {
//         e.preventDefault();
//     }

//     function dragMainHandler(e) {
//         e.preventDefault();
//     }

//     function dropHandler(e) {
//         e.preventDefault();

//         readImage(e?.dataTransfer?.files?.[0]);
//     }

//     function readImage(file) {
//         if (!file) return;

//         upload(file);
//     }
// }

const PersonalInfo = ({ formikValue, value, setValue, showVacation = false }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const setProfilePic = (data) =>
        setValue((prevState) => ({
            ...prevState,
            profilePhoto: data
        }));

    const openEvaluation = () =>
        dispatch(
            newModal({
                top: 0,
                id: 'Evaluation',
                closeButton: true,
                Body: EvaluationModal,
                title: 'Document Evaluation',
                variables: {
                    value,
                    setValue
                }
            })
        );

    return (
        <Box style={{ maxWidth: 350 }}>
            <Typography
                style={{
                    fontSize: 24,
                    color: theme.palette.secondary.darker,
                    fontWeight: 'bold'
                }}>
                Personal Info
            </Typography>
            <Spacer space={30} />
            <PhotoContainer>
                <FilePickerContent
                    loading={loading}
                    onChange={setProfilePic}
                    setLoading={setLoading}
                    value={value.profilePhoto}
                    initialData={{ url: value.profilePhoto }}
                />
            </PhotoContainer>
            <Spacer space={20} />
            <MInputFormik name="name" placeholder="Name" fullWidth />
            <MInputFormik
                name="bio"
                placeholder="Type..."
                label="Bio"
                multiline
                rows={6}
                fullWidth
            />
            <MInputFormik name="phone" placeholder="Phone Number" fullWidth />
            <MSelectFormik
                name="gender"
                placeholder="Gender"
                rounded
                label="Gender"
                holder
                options={[
                    { option: 'Male', value: Genders.Male },
                    { option: 'Female', value: Genders.Female },
                    { option: 'Other', value: Genders.Other },
                    { option: 'Prefer not to disclose', value: Genders.Prefer }
                ]}
            />
            <MInputFormik name="address" placeholder="Address" fullWidth />
            {showVacation && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Typography
                            style={{
                                fontSize: 24,
                                color: theme.palette.secondary.darker,
                                fontWeight: 'bold'
                            }}>
                            evaluation
                        </Typography>
                        <span
                            onClick={openEvaluation}
                            style={{ cursor: 'pointer', marginRight: '5px' }}>
                            <EyeVacation />
                        </span>
                    </div>
                </>
            )}
        </Box>
    );
};

export default PersonalInfo;
