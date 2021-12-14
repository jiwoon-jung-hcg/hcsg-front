import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Avatar, Card, CardHeader, Container, CssBaseline } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import SubNav from '../../components/NavComponent/SubNav';

import { RootState } from '../../modules';

import '../../styles/scss/userProfile.scss';
import { updatePictureAction } from '../../modules/user';
import Loading from '../../components/LoadingComponent/Loading';

import DefaultImage from '../../images/defaultProfile.png';

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
	user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePictureDispatch: (file: File) => dispatch(updatePictureAction(file)),
});

class UserProfilePage extends Component<any, any> {
	state = {
		auth: this.props.auth,
		user: this.props.user,
		image: null,
		nickname: '',
		password: '',
		isLoading: true,
	};

	componentDidMount() {
		this.setState({
			isLoading: false,
		});
	}

	handleChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget?.files && this.props.updatePictureDispatch(event.currentTarget.files[0]);
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
							<img src={this.state.image ? DefaultImage : DefaultImage} alt="my-profile" />
							<input id="profile-picture" type="file" accept=".png, .jpg, .jpeg" onChange={this.handleChangePicture} />
							<label htmlFor="profile-picture">변 경</label>
						</div>
						<div>
							<h2>누구누구님 반갑습니다.</h2>
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
						<button className="logout-button">로그아웃</button>
					</section>
					<section className="profile__section profile__info">
						<h3>닉네임</h3>
						<div>
							<p>개똥벌레</p>
							<input type="text" className="hidden__item" />
						</div>
						<div>
							<button type="button">수정</button>
							<button type="button" className="hidden__item">
								변경
							</button>
						</div>
					</section>
					<section className="profile__section profile__info">
						<h3>비밀번호</h3>
						<div>
							<p>
								<FiberManualRecordIcon />
								<FiberManualRecordIcon />
								<FiberManualRecordIcon />
								<FiberManualRecordIcon />
								<FiberManualRecordIcon />
								<FiberManualRecordIcon />
							</p>
							<input type="text" className="hidden__item" />
						</div>
						<div>
							<button type="button">수정</button>
							<button type="button" className="hidden__item"></button>
						</div>
					</section>
					<section className="profile__button-container">
						<button>회원탈퇴</button>
					</section>
				</main>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
