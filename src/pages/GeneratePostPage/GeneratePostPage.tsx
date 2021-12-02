import React, { useCallback, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import useStyles from '../../stylesheets/generatePost/styles';

import TextEditorComponent from '../../components/TextEditorComponent/TextEditorComponent';
import { useNavigate } from 'react-router';
import GridChipComponent from '../../components/GridChipComponent/GridChipComponent';
import axios from 'axios';
import { CookieSingleton } from '../../utils/cookie';
import ErrorPage from '../../components/ErrorComponent/ErrorPage';
/** API 호출로 리팩토링 */
export const STACK_NAMES = [
	'C',
	'Java',
	'JavaScript',
	'TypeScript',
	'Node',
	'React',
	'Vue',
	'Python',
	'Django',
	'Docker',
	'Swagger',
	'Go',
	'Ruby',
	'AWS',
];

export default function GeneratePostPage() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [isError, setIsError] = useState(false);
	const [content, setContent] = useState('');
	const [stacks, setStacks] = useState<string[]>([]);
	const formik = useFormik({
		initialValues: {
			title: '',
		},
		onSubmit: async (values) => {
			const { title } = values;
			const inputPost = { title, content, stacks };
			try {
				const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`, inputPost, {
					headers: {
						token: CookieSingleton.getCookie().get('refresh_token'),
					},
				});
				navigate('/');
			} catch (error) {
				console.dir(error);
				setIsError(true);
			}
		},
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

	if (isError) return <ErrorPage />;

	return (
		<>
			<CssBaseline />
			<Container component="main" maxWidth="md" className={classes.container}>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<Grid container justifyContent="flex-end" spacing={2}>
						<Grid item>
							<Button color="primary" type="submit">
								작성
							</Button>
						</Grid>
						<Grid item>
							<Button color="secondary" onClick={handleCancelClick}>
								취소
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
		</>
	);
}
