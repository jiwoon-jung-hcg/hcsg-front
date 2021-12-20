import React from 'react';
import '../../styles/scss/loading.scss';

function Loading() {
	return (
		<div className="container">
			<div className="wrapper">
				<div className="circle" />
				<div className="circle" />
				<div className="circle" />
				<div className="shadow" />
				<div className="shadow" />
				<div className="shadow" />
				<span>Loading</span>
			</div>
		</div>
	);
}

export default Loading;
