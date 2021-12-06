import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logger } from '../../utils/logger';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import Loading from '../LoadingComponent/Loading';
import { headerConfig } from '../../apis/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../modules/auth';
import { RootState } from '../../modules';

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
		// axios(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth_check`, headerConfig())
		// 	.then((response) => {
		// 		const { isAuth, nickname }: { isAuth: boolean; nickname: string } = response.data;
		// 		// 토큰이 정상인증이 되었지만 로그인 안한 유저만 접근이가능할 떄 => 홈페이지로 리다이렉팅
		// 		if (isAuth && option === -1) {
		// 			return navigate('/');
		// 		}
		// 		// 토큰이 정상적이지 않지만 로그인된 유저만 들어가야될때 => 로그인페이지로 리다이렉팅
		// 		else if (!isAuth && option === 1) {
		// 			return navigate('/signin');
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		logger(error);
		// 		console.dir(error);
		// 		navigate('/');
		// 	})
		// 	.finally(() => {
		// 		setIsLoading(false);
		// 	});
	}, [SpecificComponent, user]);

	useEffect(() => {
		if (auth.isAuth && option === -1) {
			return navigate('/');
		}
		// 토큰이 정상적이지 않지만 로그인된 유저만 들어가야될때 => 로그인페이지로 리다이렉팅
		else if (!auth.isAuth && option === 1) {
			return navigate('/signin');
		}
		setIsLoading(false);
	}, [auth]);

	if (isLoading) {
		return <Loading />;
	}

	return <SpecificComponent />;
}
