import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../modules/auth';
import { RootState } from '../../modules';
import HomePage from '../../pages/HomePage/HomePage';
import { refreshList } from '../../utils/refreshList';

/** Autorization 체크 */
/** 1. 로그인 유지 */
/** 2. 유효한 토큰 확인 */
/** 3. 로그인 유무예따른 페이지 접근 처리 */
/**
 * SpecificComponent -> 도달하고자하는 컴포넌트
 * option: 도달하고자 하는 컴포넌트에 로그인유무에 따른 필터 조건
 *      -> 1 : 로그인된유저만 갈 수 있는 페이지
 *      -> 0 : 모든 유저가 갈 수 있는 페이지
 *      -> -1 : 로그인된 유저는 갈 수없는 페이지
 * */
interface iProps {
	SpecificComponent: any;
	option: 1 | 0 | -1;
}

export default function AuthCheck(props: iProps) {
	const { SpecificComponent, option } = props;
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		dispatch(getAuth());
	}, [SpecificComponent, user]);

	useEffect(() => {
		if (auth.is_atuh && option === -1) {
			return navigate('/');
		}
		// 토큰이 정상적이지 않지만 로그인된 유저만 들어가야될때 => 로그인페이지로 리다이렉팅
		else if (!auth.is_atuh && option === 1) {
			return navigate('/signin');
		}
		setIsLoading(false);
	}, [auth, option]);

	if (isLoading) {
		return <Loading />;
	}

	return <SpecificComponent />;
}
