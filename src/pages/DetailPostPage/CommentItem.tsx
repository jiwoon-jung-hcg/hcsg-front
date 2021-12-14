import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ButtonComponent from '../../components/Button/ButtonComponent';
import profile from '../../images/defaultProfile.png';
import { RootState } from '../../modules';
import { deleteCommentAction, updateCommentAction } from '../../modules/comment';
import useStyles from '../../styles/mui/detailPost/styles';
import { Comment } from '../../types/Comment';
interface Iprops {
	comment: Comment;
}

export default function CommentItem(props: Iprops) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const state = useSelector((state: RootState) => state);
	const [isUpdateClick, setIsUpdateClick] = useState(false);
	const [content, setContent] = useState('');
	const { auth, post } = state;
	const { comment } = props;

	/** handle function */
	const handleChangeCommentValue = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setContent(event.currentTarget.value);
		},
		[isUpdateClick],
	);
	const handleUpdateButtonClick = useCallback(() => {
		setIsUpdateClick(true);
	}, []);
	const handleUpdateButtonClickCancel = useCallback(() => {
		setIsUpdateClick(false);
	}, []);
	const handleUpdateSendClick = useCallback(() => {
		post.selectedPost &&
			dispatch(updateCommentAction({ commentId: comment.id, postId: post.selectedPost.id, content }));
		setIsUpdateClick(false);
		setContent('');
	}, [content]);
	const handleDeleteClick = useCallback(() => {
		post.selectedPost && dispatch(deleteCommentAction({ commentId: comment.id, postId: post.selectedPost.id }));
	}, [post.selectedPost?.id, comment.id]);

	/** render function */
	const renderButton = useCallback(() => {
		return (
			comment.commenterId === auth.userId && (
				<>
					{isUpdateClick ? (
						<>
							<ButtonComponent
								variant="text"
								color="primary"
								content="작성"
								disabled={!content.length}
								onClick={handleUpdateSendClick}
							/>
							<ButtonComponent
								variant="text"
								color="secondary"
								content="취소"
								onClick={handleUpdateButtonClickCancel}
							/>
						</>
					) : (
						<>
							<ButtonComponent variant="text" color="default" content="수정" onClick={handleUpdateButtonClick} />
							<ButtonComponent variant="text" color="secondary" content="삭제" onClick={handleDeleteClick} />
						</>
					)}
				</>
			)
		);
	}, [comment.commenterId, auth.userId, isUpdateClick, content]);
	const renderContent = useCallback(() => {
		return isUpdateClick ? (
			<TextField
				variant="outlined"
				multiline
				minRows={3}
				maxRows={3}
				fullWidth
				value={content}
				onChange={handleChangeCommentValue}
			/>
		) : (
			<Typography className={classes.commentContent} variant="body1">
				{comment.content}
			</Typography>
		);
	}, [isUpdateClick, content, comment, post]);

	return (
		<Grid key={comment.id} item className={classes.commentContainer}>
			<div className={classes.headerContainer}>
				<div className={classes.commentHeader}>
					<Avatar alt="author profile" src={profile} />
					<div>
						<Typography variant="h5">{comment.commenterNickname}</Typography>
						<div style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
							<Typography
								variant="h6"
								color="textPrimary"
								style={{ fontWeight: 'bold', color: '#4c4c4c', marginRight: '3px' }}
							>
								{comment.createdAt}
							</Typography>
							<Typography variant="h6" color="textSecondary" style={{ fontSize: '.8em' }}>
								{comment.updatedAt && ` ${comment.updatedAt} 수정됨`}
							</Typography>
						</div>
					</div>
				</div>
				<div>{renderButton()}</div>
			</div>
			{renderContent()}
		</Grid>
	);
}
