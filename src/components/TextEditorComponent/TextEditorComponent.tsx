import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface Iprops {
	value: string;
	onChange: (text: string) => void;
}

class EditorComponent extends Component<Iprops> {
	constructor(props: Iprops) {
		super(props);
	}

	modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['link', 'image'],
			[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
			['clean'],
		],
	};

	formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'align',
		'color',
		'background',
	];

	render() {
		const { value, onChange } = this.props;
		return (
			<ReactQuill
				id="content"
				style={{ height: '50vw' }}
				// theme=""
				modules={this.modules}
				formats={this.formats}
				value={value || ''}
				onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
			/>
		);
	}
}
export default EditorComponent;
