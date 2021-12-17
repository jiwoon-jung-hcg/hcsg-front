export type FormDataEntity = [string, string | Blob];
export type FormDataParams = FormDataEntity[];

export default function getFormData(data: FormDataParams) {
	const formData = new FormData();
	data.forEach((element) => {
		formData.append(element[0], element[1]);
	});
	return formData;
}
