export default interface ErrorResponse<T> extends Error {
	error: T;
}
