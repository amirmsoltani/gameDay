import { Grid, TextareaAutosize } from '@mui/material';
import { stat } from 'fs';
import React, { FC, useRef, useState } from 'react';
import { StarFillIcon } from 'src/assets/common/StarIcon';
import PlayIcon from 'src/assets/icons/play-icon';
import TrashIcon from 'src/assets/icons/trash-icon';
import {
    Comment,
    CommentStatus,
    useDeleteCmmentMutation,
    useUpdateCommentMutation
} from 'src/graphql/generated';
import { MImage } from '../base/image/MImage';
import { PrimarySpinner } from '../base/loader/spinner';

type PropType = {
    comment: Partial<Comment>;
    index: number;
    setPlay: (play: null | string) => void;
    onDelete: (index: number) => void;
};

const CommentCard: FC<PropType> = ({ comment, setPlay, onDelete, index }) => {
    const [replyMode, setReplayMode] = useState(false);
    const status = useRef({ replyText: comment.replyText, status: comment.status });
    const updateComment = useUpdateCommentMutation({
        onSuccess: (_, variable) => {
            status.current = { replyText: variable.input.replyText, status: variable.input.status };
            setReplayMode(false);
        }
    });
    const deleteComment = useDeleteCmmentMutation({
        onSuccess: () => {
            onDelete(index);
        }
    });

    return (
        <Grid className="comment-card" container key={comment.id}>
            <Grid item md={7.5}>
                <div className="comment__user">
                    <MImage
                        className="comment__avatar"
                        resources={{
                            src: comment.user.pictureUrl
                        }}
                    />
                    <span>{comment.user.firstName + ' ' + comment.user.lastName}</span>
                </div>
                <div className="commnet__text">{comment.text}</div>
                <div className="comment__status">
                    <span
                        className={`comment__replay-btn ${status.current.replyText ? 'hide' : ''}`}
                        onClick={() => setReplayMode(true)}>
                        REPLY
                    </span>
                    <div>
                        {[...new Array(5)].map((_, index) => (
                            <StarFillIcon
                                className={`comment-card__star-icon ${
                                    comment.rate > index ? 'active' : ''
                                }`}
                                key={index}
                            />
                        ))}
                    </div>

                    {deleteComment.isLoading ? (
                        <div className="comment__trash">
                            <PrimarySpinner />
                        </div>
                    ) : (
                        <TrashIcon
                            className="comment__trash"
                            onClick={() => deleteComment.mutate({ id: comment.id })}
                        />
                    )}
                    {updateComment.isLoading ? (
                        <div className="comment__trash">
                            <PrimarySpinner />
                        </div>
                    ) : (
                        <span
                            className={`comment__check ${
                                status.current.status === CommentStatus.Accepted ? 'active' : ''
                            }`}
                            onClick={() => {
                                updateComment.mutate({
                                    id: comment.id,
                                    input: { status: CommentStatus.Accepted }
                                });
                            }}>
                            &#10003;
                        </span>
                    )}
                </div>
                {status.current.replyText ? (
                    <div className="comment__replay-text">{status.current.replyText}</div>
                ) : null}
                {replyMode ? (
                    <div className="comment__replay-box">
                        <TextareaAutosize
                            placeholder="Add replay"
                            maxRows={5}
                            className="comment__replay-input"
                            onBlur={(event) => {
                                status.current = {
                                    status: status.current.status,
                                    replyText: event.target.value
                                };
                            }}
                        />
                        {updateComment.isLoading ? (
                            <div className="replay__actions">
                                <PrimarySpinner />
                            </div>
                        ) : (
                            <div>
                                <span
                                    className="replay__cancel-btn"
                                    onClick={() => {
                                        status.current = {
                                            status: status.current.status,
                                            replyText: undefined
                                        };
                                        setReplayMode(false);
                                    }}>
                                    Cancel
                                </span>
                                <span
                                    className="replay__add-btn"
                                    onClick={() => {
                                        updateComment.mutate({
                                            id: comment.id,
                                            input: {
                                                status: CommentStatus.Accepted,
                                                replyText: status.current.replyText
                                            }
                                        });
                                    }}>
                                    Add
                                </span>
                            </div>
                        )}
                    </div>
                ) : null}
            </Grid>
            <Grid item md={4.5}>
                {comment.lesson.topics.map((topic) => {
                    const fileName = topic.description?.split('~')[0];
                    return (
                        <button
                            className="catalog-learn__card-lesson"
                            key={topic.title}
                            onClick={() => {
                                setPlay(topic.fileUrl);
                            }}>
                            <div className="card-lesson__box-left">
                                <PlayIcon />
                                <div className="box-left__text-box">
                                    <span className="text-box__skill">
                                        {comment.skillCategory.title.slice(0, 15)}
                                        {comment.skillCategory.title.length > 15 ? '...' : ''}
                                    </span>
                                    <span className="text-box__name">
                                        {fileName.slice(0, 15)}
                                        {fileName.length > 15 ? '...' : ''}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default CommentCard;
