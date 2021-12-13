import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNav from '../../components/NavComponent/MainNav';
import { RootState } from '../../modules';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextEditorComponent from '../../components/TextEditorComponent/TextEditorComponent';
import useStyles from '../../styles/mui/generatePost/styles';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import GridChipComponent from '../../components/GridChipComponent/GridChipComponent';
import { STACK_NAMES } from '../GeneratePostPage/GeneratePostPage';
import { REFRESH_UPDATE_POST_CHECK, updatePost } from '../../modules/post';

// import 코드들은 모두 비슷한 카테고리별로 모아두는게 어떨까요? (global/local/scss...)
// https://github.com/hcgtheplus/ppfront/wiki/Naming-conventions-for-files-and-folders-(writing)#import-code-%EC%88%9C%EC%84%9C-%EA%B7%9C%EC%B9%99
// 이런 문서가 있는데 보셨을진 모르겠네요!

export default function UpdatePostPage() {
	const navigate = useNavigate();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { selectedPost } = useSelector((state: RootState) => state.post);
	const { successfullyUpdated, id } = useSelector((state: RootState) => state.post);
	const [content, setContent] = useState(selectedPost?.content || '');
	const [stacks, setStacks] = useState<string[]>(selectedPost?.stacks || []);
	const formik = useFormik({
		initialValues: {
			title: selectedPost?.title,
		},
		onSubmit: async (values) => {
			if (values.title && content && stacks.length && selectedPost) {
				const { title } = values;
				const { id } = selectedPost;
				const inputPost = { title, content, stacks, postId: id };
				dispatch(updatePost({ ...inputPost }));
			}
		},
	});

	useEffect(() => {
		successfullyUpdated && navigate(`/post/${id}`);
	}, [successfullyUpdated, id]);

	useEffect(() => {
		return () => {
			dispatch({ type: REFRESH_UPDATE_POST_CHECK });
		};
	});

	/** 상태에서 입력받은 스택 찾기 */
	const findStack = (stack: string) => {
		return stacks.find((el) => {
			return el === stack;
		});
	};

	/** 입력받은 스택 상태에 토글 */
	const handleClickStack = useCallback(
		(chipStack: string) => {
			const stack = chipStack.toLowerCase();
			const findTarget = findStack(stack);
			setStacks((prevStacks) => (findTarget ? prevStacks.filter((el) => el !== findTarget) : [...prevStacks, stack]));
		},
		[stacks],
	);
	const handleChangeContent = useCallback((text: string) => setContent(text), []);
	const handleCancelClick = useCallback(() => navigate('/'), []);
	const renderChip = () => {
		return STACK_NAMES.map((stack) => (
			<GridChipComponent key={stack} value={stack} onClick={handleClickStack} stacks={stacks} />
		));
	};
	return (
		<div style={{ background: 'white' }}>
			<CssBaseline />
			<MainNav />
			<Container component="main" maxWidth="md" className={classes.container}>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Button color="inherit" onClick={handleCancelClick} size="large" style={{ fontWeight: 'bold' }}>
								<ArrowBackIcon fontSize="large" />
							</Button>
						</Grid>
						<Grid item>
							<Typography variant="h6" color="secondary">
								{/* {successfullyCreated === false && feedbackMessage} */}
							</Typography>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								color="primary"
								type="submit"
								size="large"
								disabled={!formik.values.title || !stacks.length || !content}
								style={{ fontWeight: 'bold' }}
							>
								수정
							</Button>
						</Grid>
					</Grid>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="title"
						name="title"
						label="제목을 입력해 주세요"
						autoFocus
						onChange={formik.handleChange}
						value={formik.values.title}
					/>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						style={{ border: '1px solid #e3e3e3', padding: '1.5vw .8vw', marginTop: '22px', borderRadius: '5px' }}
					>
						{renderChip()}
					</Grid>
					<TextEditorComponent value={content} onChange={handleChangeContent} />
				</form>
			</Container>
		</div>
	);
}
