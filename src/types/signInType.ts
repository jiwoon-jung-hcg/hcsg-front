// validation
export type isCheckAfterValid = (text: boolean) => void;
export type feedbackAfterValid = (text: string) => void;

// login Info
export type loginInfo = { email: string; password: string };
export type logInResponse = { success: boolean; keyword: string; message?: string; error?: string };
