import React from 'react';
import { useFormik } from 'formik';
import { Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import useStyles from '../../stylesheets/generatePost/styles';

const animatedComponents = makeAnimated();

export default function GeneratePostPage() {
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			title: '',
			stacks: [],
			contnet: '',
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});
	const colourOptions = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	return (
		<>
			<CssBaseline />
			<Container component="main" maxWidth="md" className={classes.container}>
				<form className={classes.form} onSubmit={formik.handleSubmit}>
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
					<div style={{ marginTop: '16px' }}>
						<Typography variant="h5" component="span" color="textPrimary">
							사용 언어
						</Typography>
						<Select
							id="selectStack"
							name="selectStack"
							closeMenuOnSelect={false}
							components={animatedComponents}
							isMulti
							options={colourOptions}
							className={classes.select}
						/>
					</div>
				</form>
			</Container>
		</>
	);
}
