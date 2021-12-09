import { Button } from '@material-ui/core';
import React from 'react';

interface Iprops {
	variant: 'contained' | 'outlined' | 'text';
	color: 'default' | 'inherit' | 'primary' | 'secondary';
	content: string;
	disabled?: boolean;
	onClick?: () => void;
}

export default function ButtonComponent(props: Iprops) {
	const { variant, color, content, disabled, onClick } = props;
	return (
		<Button variant={variant} color={color} onClick={onClick} disabled={disabled !== undefined ? disabled : false}>
			{content}
		</Button>
	);
}
