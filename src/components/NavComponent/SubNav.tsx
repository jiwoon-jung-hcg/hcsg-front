import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/scss/subNav.scss';

export default function SubNav() {
	return (
		<section className="subnav__container">
			<Link to="/" className="subnav__home-button">
				홈으로
			</Link>
			<ul className="subnav__list">
				<li className="subnav__item active__item">회원 정보</li>
				<li className="subnav__item">작성 포스트</li>
				<li className="subnav__item">찜 포스트</li>
				<li className="subnav__item">문의하기</li>
			</ul>
		</section>
	);
}
