// validation
export type IsCheckAfterValid = (text: boolean) => void;
export type FeedbackAfterValid = (text: string) => void;

export interface LogInSuccessResponse {
	success: boolean;
}
export type SignUpSuccessResponse = LogInSuccessResponse;
