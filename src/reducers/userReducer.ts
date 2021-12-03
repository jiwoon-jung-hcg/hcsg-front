import {
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	LOG_OUT_REQUEST,
	LoginRequestAction,
	LoginSuccessAction,
	LoginFailureAction,
	LogOutAction,
} from '../actions/userAction';

export interface UserState {
	isAuth: boolean;
	loginSuccess: false;
	data?: { nickname: string };
}

const initialState = {
	isAuth: false,
	loginSuccess: false,
	data: null,
};

type UserReducerActions = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogOutAction;

const userReducer = (prevState = initialState, action: UserReducerActions) => {
	switch (action.type) {
		case LOG_IN_REQUEST:
		case LOG_IN_SUCCESS:
		case LOG_IN_FAILURE:
		case LOG_OUT_REQUEST:
			return {
				...prevState,
				data: null,
			};
		default:
			return prevState;
	}
};

export default userReducer;
