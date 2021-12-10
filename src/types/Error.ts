export default interface ErrorReponse<T> extends Error {
	error: T;
}
