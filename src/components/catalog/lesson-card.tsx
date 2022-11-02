import { Grid } from '@mui/material';
import { Field, Formik, FormikProps } from 'formik';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
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
import {
    Topic,
    useCreateLessonMutation,
    useCreateTopicMutation,
    useDeleteLessonMutation,
    useDeleteTopicMutation,
    useUpdateLessonMutation,
    useUpdateTopicMutation
} from 'src/graphql/generated';

dayjs.extend(duration);

export type LessonType = {
    id?: number;
    time?: number;
    title?: string;
    description?: string;
    categoryId: number;
    topics: Array<{
        title?: string;
        fileUrl?: string;
        id?: number;
        description?: string;
        __typename?: string;
    }>;
};

type PropsType = {
    lesson: LessonType;
    index: number;
    onDelete: (index: number) => void;
    onPlay: (url: string) => void;
};

const schema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string()
});

const mapTopic = (topic: Topic) => {
    const [name, duration] = topic.description?.split('~') || ['default', 0];

    return { id: topic.id, name: name as string, duration: +(duration || 0), url: topic.fileUrl };
};

const filterTopic = (topic: Topic) => topic.isDeleted === false;

const LessonCard: FC<PropsType> = ({ lesson: propLesson, index, onPlay, ...props }) => {
    const uploader = useRef<RefType>();
    const timeOut = useRef<NodeJS.Timeout>(null);
    const formRef = useRef<FormikProps<typeof propLesson>>(null);
    const videoUpdate = useRef<number>(null);
    const lesson = useRef<typeof propLesson>(propLesson);

    const [files, setFiles] = useState<
        Array<{
            name: string;
            url?: string;
            id?: number;
            duration: number;
        }>
    >(lesson.current.topics.filter(filterTopic).map(mapTopic));

    const createLesson = useCreateLessonMutation({
        onSuccess: (data) => {
            lesson.current = { ...lesson.current, id: data.lesson_addLesson.result.id };
        }
    });
    const updateLesson = useUpdateLessonMutation({
        onSuccess: (_, input) => {
            lesson.current = {
                ...lesson.current,
                title: input.input.title,
                description: input.input.description
            };
        }
    });

    const deleteLesson = useDeleteLessonMutation({
        onSuccess: () => {
            props.onDelete(index);
        }
    });

    const createTopic = useCreateTopicMutation({
        onSuccess: (data, input) => {
            setFiles((files) => {
                const id = data.topic_addTopic.result.id;
                const index = files.findIndex((file) => file.url === input.input.fileUrl);
                const newFiles = [...files];
                newFiles[index] = { ...newFiles[index], id };
                formRef.current.submitForm();
                return files;
            });
        }
    });

    const updateTopic = useUpdateTopicMutation({
        onSuccess: () => {
            formRef.current.submitForm();
        }
    });

    const deleteTopic = useDeleteTopicMutation({
        onSuccess: (_, { id }) => {
            const index = files.findIndex((file) => file.id === id);
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
            formRef.current.submitForm();
        }
    });

    useEffect(() => {
        if (!lesson.current.id) {
            createLesson.mutate({
                input: {
                    skillCategoryId: lesson.current.categoryId,
                    time: 0,
                    title: '',
                    description: ''
                }
            });
        }
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (timeOut.current) {
            clearTimeout(timeOut.current);
        }
        timeOut.current = setTimeout(() => {
            formRef.current.submitForm();
        }, 3000);
        formRef.current?.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <Formik
            initialValues={lesson.current}
            innerRef={formRef}
            validationSchema={schema}
            onSubmit={(values) => {
                let time = 0;
                files.forEach((file) => {
                    time += file.duration;
                });

                updateLesson.mutate({
                    id: lesson.current.id,
                    input: {
                        time: Math.floor(time),
                        skillCategoryId: lesson.current.categoryId,
                        description: values.description,
                        title: values.title
                    }
                });
            }}>
            <LessonWrapper>
                <div className="lesson__header">
                    <span className="header__index">{index + 1}</span>
                    <button
                        disabled={deleteLesson.isLoading || !lesson.current.id}
                        className="lesson__btn"
                        onClick={() => {
                            deleteLesson.mutate({ id: lesson.current.id });
                        }}
                        type="button">
                        {deleteLesson.isLoading ? <PrimarySpinner /> : <TrashIcon />}
                    </button>
                </div>

                {files.map((file, index) => (
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
                            <button
                                disabled={!file.url || updateTopic.isLoading}
                                className="lesson__btn primary"
                                type="button"
                                onClick={() => {
                                    videoUpdate.current = index;
                                    uploader.current.openSelector();
                                }}>
                                <SaveIcon />
                            </button>
                            <button
                                className="lesson__btn"
                                type="button"
                                disabled={!file.url || deleteTopic.isLoading}
                                onClick={() => {
                                    deleteTopic.mutate({ id: file.id });
                                }}>
                                {deleteTopic.isLoading && deleteTopic.variables.id === file.id ? (
                                    <PrimarySpinner />
                                ) : (
                                    <TrashIcon />
                                )}
                            </button>
                        </div>
                    </div>
                ))}

                <Grid container>
                    <Grid item md={4}>
                        <UploadComponent
                            onSelect={(name, duration) => {
                                const index = videoUpdate.current;
                                if (typeof index === 'number') {
                                    const newFiles = [...files];
                                    newFiles[index] = {
                                        id: newFiles[index].id,
                                        name,
                                        duration,
                                        url: undefined
                                    };
                                    setFiles(newFiles);
                                } else {
                                    setFiles([...files, { name, duration }]);
                                }
                            }}
                            onUpload={(name, url) => {
                                setFiles((files) => {
                                    const newFiles = [...files];
                                    const index =
                                        typeof videoUpdate.current === 'number'
                                            ? videoUpdate.current
                                            : newFiles.findIndex((file) => file.name === name);
                                    newFiles[index] = { ...newFiles[index], url };
                                    const input = {
                                        lessonId: lesson.current.id,
                                        isMain: index === 0,
                                        title: newFiles[index].name,
                                        description:
                                            newFiles[index].name + '~' + newFiles[index].duration,
                                        fileUrl: newFiles[index].url
                                    };
                                    if (typeof videoUpdate.current === 'number') {
                                        updateTopic.mutate({
                                            id: newFiles[index].id,
                                            input
                                        });
                                        videoUpdate.current = null;
                                    } else {
                                        createTopic.mutate({
                                            input
                                        });
                                    }
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
                            className="description__input"
                            id={index + 'description'}
                            onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>
                        <button
                            className="lesson__add-video"
                            onClick={() => {
                                uploader.current?.openSelector();
                            }}
                            type="button">
                            <PlusIcon /> Add new Video
                        </button>
                    </Grid>
                </Grid>
            </LessonWrapper>
        </Formik>
    );
};

export default LessonCard;
