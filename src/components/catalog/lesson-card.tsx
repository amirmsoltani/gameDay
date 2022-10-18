import { Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import UploadComponent, { RefType } from '../upload/upload';
import * as Yup from 'yup';
import { LessonWrapper } from './lesson-card-style';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import TrashIcon from 'src/assets/icons/trash-icon';
import PlayIcon from 'src/assets/icons/play-icon';
import { PrimarySpinner } from '../base/loader/spinner';
import SaveIcon from 'src/assets/icons/save-icon';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export type LessonType = {
    id?: number;
    time?: string;
    title?: string;
    description?: string;
    categoryId: number;
};

type PropsType = {
    lesson: LessonType;
    index: number;
    onDelete: (index: number) => void;
    onPlay: (url: string) => void;
};

const schema = Yup.object().shape({
    title: Yup.string().required('please Enter Title'),
    description: Yup.string().required('please Enter description')
});

const LessonCard: FC<PropsType> = ({ lesson, index, onPlay, onDelete }) => {
    const uploader = useRef<RefType>();
    const [files, setFiles] = useState<
        Array<{
            name: string;
            url?: string;
            duration: number;
        }>
    >([]);
    return (
        <Formik initialValues={lesson} validationSchema={schema} onSubmit={() => {}}>
            <LessonWrapper>
                <div className="lesson__header">
                    <span className="header__index">{index + 1}</span>
                    <button
                        className="lesson__btn"
                        onClick={() => {
                            onDelete(index);
                        }}>
                        <TrashIcon />
                    </button>
                </div>

                {files.map((file) => (
                    <div key={file.name} className={`lesson__video ${file.url ? '' : 'disabled'}`}>
                        <div className="video__left">
                            {file.url ? (
                                <PlayIcon
                                    className="video__play"
                                    onClick={() => onPlay(file.url)}
                                />
                            ) : (
                                <div className="video__loading">
                                    <PrimarySpinner />
                                </div>
                            )}
                            {file.name}
                        </div>
                        <div className="video__right">
                            <span className="video__duration">
                                {dayjs.duration(Math.floor(file.duration * 1000)).format('mm:ss')}
                            </span>
                            <button className="lesson__btn primary">
                                <SaveIcon />
                            </button>
                            <button className="lesson__btn">
                                <TrashIcon />
                            </button>
                        </div>
                    </div>
                ))}

                <Grid container>
                    <Grid item md={4}>
                        <UploadComponent
                            onSelect={(name, duration) => {
                                setFiles([...files, { name, duration }]);
                            }}
                            onUpload={(name, url) => {
                                setFiles((files) => {
                                    const newFiles = [...files];
                                    const index = newFiles.findIndex((file) => file.name === name);
                                    newFiles[index] = { ...newFiles[index], url };
                                    return newFiles;
                                });
                            }}
                            type={'video'}
                            ref={uploader}
                        />
                    </Grid>
                    <Grid item md={5.5} className="lesson__description">
                        <label htmlFor={index + 'description'} className="lesson__label__input">
                            description
                        </label>
                        <Field
                            placeholder="description"
                            as="textarea"
                            name="description"
                            aria-hidden
                            className="description__input"
                            id={index + 'description'}
                        />
                    </Grid>
                    <Grid item md={2.5} className="lesson__title">
                        <div>
                            <label htmlFor={index + 'title'} className="lesson__label__input">
                                Title
                            </label>
                            <Field
                                name="title"
                                id={index + 'title'}
                                className="title__input"
                                placeholder="ex. Doe"
                            />
                        </div>
                        <button
                            className="lesson__add-video"
                            onClick={() => {
                                uploader.current?.openSelector();
                            }}>
                            <PlusIcon /> Add new Video
                        </button>
                    </Grid>
                </Grid>
            </LessonWrapper>
        </Formik>
    );
};

export default LessonCard;
