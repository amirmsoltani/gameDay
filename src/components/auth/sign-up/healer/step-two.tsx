import { MuiButton } from '@/components/base/Button';
import { MInputFormik } from '@/components/base/input/MInput';
import { Spacer } from '@/components/base/spacer';
import { Box, CircularProgress, Grid, styled, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CloseItem from 'src/assets/icons/close-item';
import DownloadIcon from 'src/assets/icons/download';
import UploadFileIcon from 'src/assets/icons/upload-file';
import { useFileUpload } from 'src/hooks/useUploadFile';

const SubmitButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    width: 350,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

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

export function FilePickerContent({
    initialData,
    onChange,
    text,
    disableTextUpload = false,
    setLoading,
    loading
}) {
    const inputRef = useRef(null);
    const { file, upload, reset, progress } = useFileUpload(initialData, onChange);

    const theme = useTheme();

    // useEffect(() => {
    //     if (file === undefined) setLoading({ ...loading, [text]: false });
    //     else setLoading({ ...loading, [text]: true });
    //     if (file && progress !== 100) setLoading({ ...loading, [text]: true });
    // }, [file, progress]);


    return (
        <>
            <CustomParent>
                <CustomDiv
                    onClick={() => inputRef?.current?.click()}
                    onDragOver={dragHandler}
                    onDrop={dropHandler}
                    onDrag={dragMainHandler}>
                    {loading ? (
                        <CircularProgress
                            size="small"
                            sx={{ color: theme.palette.primary.main, width: '1rem' }}
                        />
                    ) : (
                        <Typography style={{ fontSize: 18 }}>
                            {!disableTextUpload && 'upload'} {text}
                        </Typography>
                    )}

                    <UploadFileIcon />
                </CustomDiv>
                {loading && (
                    <input
                        ref={inputRef}
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => readImage(e.target.files[0])}
                    />
                )}
            </CustomParent>

            {file && progress !== 100 && (
                <UploadedFile
                    loading={loading}
                    setLoading={setLoading}
                    file={file}
                    onRemove={reset}
                    progress={progress}
                    text={text}
                />
            )}
        </>
    );
    function resetHandler() {
        reset();
    }

    function dragHandler(e) {
        e.preventDefault();
    }

    function dragMainHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e) {
        e.preventDefault();

        readImage(e?.dataTransfer?.files?.[0]);
    }

    function readImage(file) {
        if (!file) {
            setLoading({ ...loading, [text]: false });
            return;
        }
        setLoading({ ...loading, [text]: true });

        upload(file);
    }
}

export function UploadedFile({
    onRemove,
    file,
    progress = 0,
    setLoading,
    text,
    loading
}: {
    file: File;
    onRemove?: () => void;
    progress?: number;
    setLoading: any;
    text: string;
    loading: object;
}) {
    useEffect(()=>{
        if (progress === 100) setLoading({ ...loading, [text]: false });
        console.log(file, progress, loading, text, 'thid')
    },[progress])

    return (
        <UploadProgress progress={progress}>
            <div style={{ textAlign: 'left', zIndex: 1 }}>
                <Typography fontSize={11}>
                    {file.name.length > 20 ? file.name.substring(0, 20) + ' ...' : file.name}
                </Typography>
            </div>
            {progress === 100 && (
                <Box
                    style={{ marginLeft: 'auto', cursor: 'pointer', zIndex: 1, marginRight: '5px' }}
                    onClick={onRemove}>
                    <CloseItem />
                </Box>
            )}
        </UploadProgress>
    );
}

const HealerStepTwo = ({ value, setValue, formikValue, isLoading }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState({
        diplomas: false,
        licenses: false,
        certificates: false,
        'drivers license': false,
        refrences: false
    });

    return (
        <>
            <Typography
                style={{
                    fontSize: 24,
                    color: theme.palette.secondary.darker,
                    fontWeight: 'bold'
                }}>
                Document Evaluation
            </Typography>
            <Spacer space={30} />
            <Grid container style={{ marginTop: 50 }}>
                <Grid item xs={12} md={6}>
                    <Box style={{ maxWidth: 350 }}>
                        <FilePickerContent
                            setLoading={setLoading}
                            loading={loading}
                            text="diplomas"
                            initialData={formikValue.diplomas}
                            onChange={(data) =>
                                setValue((prevState) => ({
                                    ...prevState,
                                    files: {
                                        ...prevState.files,
                                        diplomas: [...prevState.files.diplomas, data]
                                    }
                                }))
                            }
                        />
                        <Grid container>
                            {value.files.diplomas.map((item, index) => (
                                <UploadedFile
                                    loading={loading}
                                    setLoading={setLoading}
                                    key={index}
                                    file={item.file}
                                    text="diplomas"
                                    onRemove={() => {
                                        removeItemFromState(index, 'diplomas', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                        </Grid>
                    </Box>
                    <Box style={{ maxWidth: 350 }}>
                        <FilePickerContent
                            setLoading={setLoading}
                            loading={loading}
                            text="licenses"
                            initialData={formikValue.licenses}
                            onChange={(data) =>
                                setValue((prevState) => ({
                                    ...prevState,
                                    files: {
                                        ...prevState.files,
                                        licenses: [...prevState.files.licenses, data]
                                    }
                                }))
                            }
                        />
                        <Grid container>
                            {value.files.licenses.map((item, index) => (
                                <UploadedFile
                                    loading={loading}
                                    text="licenses"
                                    setLoading={setLoading}
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(index, 'licenses', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                        </Grid>
                    </Box>
                    <Box style={{ maxWidth: 350 }}>
                        <FilePickerContent
                            setLoading={setLoading}
                            loading={loading}
                            text="certificates"
                            initialData={formikValue.certificates}
                            onChange={(data) =>
                                setValue((prevState) => ({
                                    ...prevState,
                                    files: {
                                        ...prevState.files,
                                        certificates: [...prevState.files.certificates, data]
                                    }
                                }))
                            }
                        />
                        <Grid container>
                            {value.files.certificates.map((item, index) => (
                                <UploadedFile
                                    loading={loading}
                                    text="certificates"
                                    setLoading={setLoading}
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(index, 'certificates', value, setValue);
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                        </Grid>
                    </Box>
                    <Box style={{ maxWidth: 350 }}>
                        <FilePickerContent
                            setLoading={setLoading}
                            loading={loading}
                            text="drivers license"
                            initialData={formikValue.driversLicense}
                            onChange={(data) =>
                                setValue((prevState) => ({
                                    ...prevState,
                                    files: {
                                        ...prevState.files,
                                        driversLicense: [...prevState.files.driversLicense, data]
                                    }
                                }))
                            }
                        />
                        <Grid container>
                            {value.files.driversLicense.map((item, index) => (
                                <UploadedFile
                                    loading={loading}
                                    text="drivers license"
                                    setLoading={setLoading}
                                    key={index}
                                    file={item.file}
                                    onRemove={() => {
                                        removeItemFromState(
                                            index,
                                            'driversLicense',
                                            value,
                                            setValue
                                        );
                                    }}
                                    progress={item.progress}
                                />
                            ))}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box style={{ maxWidth: 350 }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography
                                style={{
                                    fontSize: 24,
                                    color: theme.palette.secondary.darker,
                                    fontWeight: 'bold'
                                }}>
                                Download reference file
                            </Typography>
                            <DownloadIcon />
                        </Box>
                        <Box style={{ maxWidth: 350 }}>
                            <FilePickerContent
                                setLoading={setLoading}
                                loading={loading}
                                text="refrences"
                                initialData={formikValue.refrences}
                                onChange={(data) =>
                                    setValue((prevState) => ({
                                        ...prevState,
                                        files: {
                                            ...prevState.files,
                                            // refrences: [...prevState.files.refrences, data]
                                            // just one file should be uploaded
                                            refrences: [data]
                                        }
                                    }))
                                }
                            />
                            <Grid container>
                                {value.files.refrences.map((item, index) => (
                                    <UploadedFile
                                        loading={loading}
                                        text="refrences"
                                        setLoading={setLoading}
                                        key={index}
                                        file={item.file}
                                        onRemove={() => {
                                            removeItemFromState(
                                                index,
                                                'refrences',
                                                value,
                                                setValue
                                            );
                                        }}
                                        progress={item.progress}
                                    />
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SubmitButton type="submit" loading={isLoading}>
                    Confirm
                </SubmitButton>
            </Box>
        </>
    );
};

export function removeItemFromState(index, category, value, setValue) {
    let state = [];
    if (category === 'diplomas') state = value.files.diplomas;
    else if (category === 'licenses') state = value.files.licenses;
    else if (category === 'certificates') state = value.files.certificates;
    else if (category === 'driversLicense') state = value.files.driversLicense;

    let newArray = state.filter((item, i) => i !== index);

    if (category === 'diplomas')
        setValue((prevSate) => ({
            ...prevSate,
            files: { ...prevSate.files, diplomas: newArray }
        }));
    else if (category === 'licenses')
        setValue((prevSate) => ({
            ...prevSate,
            files: { ...prevSate.files, licenses: newArray }
        }));
    else if (category === 'certificates')
        setValue((prevSate) => ({
            ...prevSate,
            files: { ...prevSate.files, certificates: newArray }
        }));
    else if (category === 'driversLicense')
        setValue((prevSate) => ({
            ...prevSate,
            files: { ...prevSate.files, driversLicense: newArray }
        }));
}

export default HealerStepTwo;
