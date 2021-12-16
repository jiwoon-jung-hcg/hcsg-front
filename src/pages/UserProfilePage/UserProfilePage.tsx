import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { returntypeof } from 'react-redux-typescript';
import { Navigator } from 'react-router';
import { Dispatch } from 'redux';

import { Avatar, Card, CardHeader, Container, CssBaseline } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import SubNav from '../../components/NavComponent/SubNav';

import { RootState } from '../../modules';

import '../../styles/scss/userProfile.scss';
import {
	logout,
	REFRESH_ALL_CHECK,
	REFRESH_NICKNAME_CHECK,
	REFRESH_PASSWORD_CHECK,
	REFRESH_PICTURE_CHECK,
	updateNicknameAction,
	updatePictureAction,
} from '../../modules/user';
import Loading from '../../components/LoadingComponent/Loading';

import 'react-toastify/dist/ReactToastify.css';
import DefaultImage from '../../images/defaultProfile.png';
import { checkUsingNickname } from '../../apis/user/user';
import clsx from 'clsx';
import { checkPassword } from '../../utils/validation';

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
	user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePictureDispatch: (file: File) => dispatch(updatePictureAction(file)),
	updateNicknameDispatch: (nickname: string) => dispatch(updateNicknameAction(nickname)),
	refreshPictureDispatch: () => dispatch({ type: REFRESH_PICTURE_CHECK }),
	refreshNicknameDispatch: () => dispatch({ type: REFRESH_NICKNAME_CHECK }),
	refreshPasswordDispatch: () => dispatch({ type: REFRESH_PASSWORD_CHECK }),
	refreshAllDispatch: () => dispatch({ type: REFRESH_ALL_CHECK }),
	logoutDispatch: () => dispatch(logout()),
});

// ? 해당 함수가 리턴하는 값에 typeof 연산자를 쓰기위해 해당 값을 객체형식으로 만들어줌
const statePropTypes = returntypeof(mapStateToProps);
const actionPropTypes = returntypeof(mapDispatchToProps);

type Props = typeof statePropTypes & typeof actionPropTypes & Navigator;
type State = {
	isLoading: boolean;
	nickname: string;
	password: string;
	nicknameValidCheck: boolean | null;
	passwordValidCheck: boolean | null;
	isUpdateNicknameClick: boolean;
	isUpdatePasswordClick: boolean;
};

class UserProfilePage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isLoading: true,
			nickname: '',
			password: '',
			nicknameValidCheck: null,
			passwordValidCheck: null,
			isUpdateNicknameClick: false,
			isUpdatePasswordClick: false,
		};
	}

	componentDidMount() {
		this.setState({
			isLoading: false,
		});
	}

	componentDidUpdate() {
		if (this.props.user.logoutSuccess) {
			window.location.href = 'http://localhost:3000';
		}
		if (this.props.user.updateNicknameSuccess) {
			this.setState({
				isUpdateNicknameClick: false,
			});
			this.props.refreshNicknameDispatch();
		}
	}

	componentWillUnmount() {
		this.props.refreshAllDispatch();
	}

	handleUpdateNicknameClick = () => {
		this.setState({
			isUpdateNicknameClick: true,
		});
	};

	handleUpdateNicknameCancel = () => {
		this.setState({
			nicknameValidCheck: null,
			isUpdateNicknameClick: false,
		});
	};

	handleUpdateNicknameRequest = () => {
		this.props.updateNicknameDispatch(this.state.nickname);
	};

	handleUpdatePasswordClick = () => {
		this.setState({
			isUpdatePasswordClick: true,
		});
	};

	handleUpdatePasswordCancel = () => {
		this.setState({
			passwordValidCheck: null,
			isUpdatePasswordClick: false,
		});
	};

	handleBlurNickname = async () => {
		const response = await checkUsingNickname(this.state.nickname);
		!response &&
			toast.error('🥸 이미 존재하는 닉네임 입니다', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		this.setState({
			nicknameValidCheck: response,
		});
	};

	handleBlurPassword = () => {
		const response = checkPassword(this.state.password);
		!response.success &&
			toast.error(`${response.message} 🥲`, {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		this.setState({
			passwordValidCheck: response.success,
		});
	};

	handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			nickname: event.currentTarget.value,
		});
	};

	handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			password: event.currentTarget.value,
		});
	};

	handleChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files && event.currentTarget.files[0];
		if (file && file.size > 2097152) {
			return toast.error('🧐  흠... 첨부하신 사진이 너무 거대 합니다. 크기가 2MB까지 적용 가능해요 🙆🏻‍♂️', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		event.currentTarget?.files && this.props.updatePictureDispatch(event.currentTarget.files[0]);
	};

	handleLogoutButton = () => {
		this.props.logoutDispatch();
	};

	render() {
		if (this.state.isLoading) {
			return <Loading />;
		}

		return (
			<div className="profile__container">
				<CssBaseline />
				<SubNav />
				<main className="profile__main">
					<section className="profile__section profile__picture">
						<div>
							<img src={this.props.user.user.avatar || this.props.auth.avatar || DefaultImage} alt="my-profile" />
							<input id="profile-picture" type="file" accept=".png, .jpg, .jpeg" onChange={this.handleChangePicture} />
							<label htmlFor="profile-picture">변 경</label>
						</div>
						<div>
							<h2>{this.props.auth.nickname || '닉네임없음'}님 반갑습니다.</h2>
							<ul>
								<li>
									<span>작성글</span>
									<span>0</span>
								</li>
								<li>
									<span>찜 글</span>
									<span>0</span>
								</li>
							</ul>
						</div>
						<button className="logout-button" onClick={this.handleLogoutButton}>
							로그아웃
						</button>
					</section>
					<section className="profile__section profile__info">
						<div>
							<h3>닉네임</h3>
							<div>
								{this.state.isUpdateNicknameClick ? (
									<input
										type="text"
										value={this.state.nickname}
										className={clsx(
											'profile__section__input',
											'slideIn',
											this.state.nicknameValidCheck === false && 'valid_fail',
										)}
										onChange={this.handleChangeNickname}
										onBlur={this.handleBlurNickname}
									/>
								) : (
									<p className="slideIn">{this.state.nickname || this.props.auth.nickname}</p>
								)}
							</div>
						</div>
						<div>
							{this.state.isUpdateNicknameClick ? (
								<>
									<button type="button" className="cancel-button" onClick={this.handleUpdateNicknameCancel}>
										취소
									</button>
									<button type="button" className="update-button" onClick={this.handleUpdateNicknameRequest}>
										변경
									</button>
								</>
							) : (
								<button type="button" onClick={this.handleUpdateNicknameClick}>
									수정
								</button>
							)}
						</div>
					</section>
					<section className="profile__section profile__info">
						<div>
							<h3>비밀번호</h3>
							<div>
								{this.state.isUpdatePasswordClick ? (
									<input
										type="password"
										value={this.state.password}
										className={clsx(
											'profile__section__input',
											'slideIn',
											this.state.passwordValidCheck === false && 'valid_fail',
										)}
										onChange={this.handleChangePassword}
										onBlur={this.handleBlurPassword}
									/>
								) : (
									<p className="slideIn">
										<FiberManualRecordIcon />
										<FiberManualRecordIcon />
										<FiberManualRecordIcon />
										<FiberManualRecordIcon />
										<FiberManualRecordIcon />
										<FiberManualRecordIcon />
									</p>
								)}
							</div>
						</div>
						<div>
							{this.state.isUpdatePasswordClick ? (
								<>
									<button type="button" className="cancel-button" onClick={this.handleUpdatePasswordCancel}>
										취소
									</button>
									<button type="button" className="update-button">
										변경
									</button>
								</>
							) : (
								<button type="button" onClick={this.handleUpdatePasswordClick}>
									수정
								</button>
							)}
						</div>
					</section>
					<section className="profile__button-container">
						<button>회원탈퇴</button>
					</section>
				</main>
				<ToastContainer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
