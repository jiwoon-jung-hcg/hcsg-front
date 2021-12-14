import { Avatar, Card, CardHeader, Container, CssBaseline } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SubNav from '../../components/NavComponent/SubNav';
import { RootState } from '../../modules';
import '../../styles/scss/userProfile.scss';

const mapStateToProps = (state: RootState) => ({
	auth: state.auth,
	post: state.post,
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface State {
	image: File;
	nickname: string;
	password: string;
}

class UserProfilePage extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		image: '',
	// 	};
	// }

	render() {
		return (
			<div className="profile__container">
				<CssBaseline />
				<SubNav />
				<main className="profile__main">
					<section className="profile__section profile__picture">
						<div>
							<img src="#" alt="my-profile" />
							<input id="profile-picture" type="file" accept=".png, .jpg, .jpeg" />
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
