import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { returntypeof } from 'react-redux-typescript';
import { Navigator } from 'react-router';
import { Dispatch } from 'redux';

import { Avatar, Card, CardHeader, Container, CssBaseline } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import SubNav from '../../components/NavComponent/SubNav';

import { RootState } from '../../modules';

import '../../styles/scss/userProfile.scss';
import { logout, updatePictureAction } from '../../modules/user';
import Loading from '../../components/LoadingComponent/Loading';

import 'react-toastify/dist/ReactToastify.css';
import DefaultImage from '../../images/defaultProfile.png';

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
	user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePictureDispatch: (file: File) => dispatch(updatePictureAction(file)),
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
	}

	handleUpdateNicknameClick = () => {
		this.setState({
			isUpdateNicknameClick: true,
		});
	};

	handleUpdateNicknameCancel = () => {
		this.setState({
			isUpdateNicknameClick: false,
		});
	};

	handleUpdatePasswordClick = () => {
		this.setState({
			isUpdatePasswordClick: true,
		});
	};

	handleUpdatePasswordCancel = () => {
		this.setState({
			isUpdatePasswordClick: false,
		});
	};

	handleChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files && event.currentTarget.files[0];
		if (file && file.size > 20971520) {
			return toast.error('🧐  흠... 첨부하신 사진이 너무 거대 합니다. 🙆🏻‍♂️  크기가 2MB까지 적용 가능해요!', {
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
						<h3>닉네임</h3>
						<div>
							{this.state.isUpdateNicknameClick ? (
								<input type="text" />
							) : (
								<p style={{ textAlign: 'left' }}>{this.props.auth.nickname || '닉네임 없음'}</p>
							)}
						</div>
						<div>
							{this.state.isUpdateNicknameClick ? (
								<>
									<button type="button" className="cancel-button" onClick={this.handleUpdateNicknameCancel}>
										취소
									</button>
									<button type="button" className="update-button">
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
						<h3>비밀번호</h3>
						<div>
							{this.state.isUpdatePasswordClick ? (
								<input type="text" />
							) : (
								<p>
									<FiberManualRecordIcon />
									<FiberManualRecordIcon />
									<FiberManualRecordIcon />
									<FiberManualRecordIcon />
									<FiberManualRecordIcon />
									<FiberManualRecordIcon />
								</p>
							)}
						</div>
						<div>
							{this.state.isUpdatePasswordClick ? (
								<>
									<button type="button" onClick={this.handleUpdatePasswordCancel}>
										취소
									</button>
									<button type="button">변경</button>
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
