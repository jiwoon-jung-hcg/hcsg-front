// validation
export type IsCheckAfterValid = (text: boolean) => void;
export type FeedbackAfterValid = (text: string) => void;

export interface LogInSuccessResponse {
	success: boolean;
}
export type SignUpSuccessResponse = LogInSuccessResponse; // 오.. SignUpSuccessResponse 값은 곧 LogInSuccessResponse 인가요? 그러면 SignUpSuccessResponse 값은 왜 따로 존재하나요?
