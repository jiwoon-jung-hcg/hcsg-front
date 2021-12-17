import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../modules/auth';
import { RootState } from '../../modules';
import { LoadableClassComponent, LoadableComponent } from '@loadable/component';

/** Autorization 체크 */
/** 1. 로그인 유지 */
/** 2. 유효한 토큰 확인 */
/** 3. 로그인 유무예따른 페이지 접근 처리 */
/**
 * SpecificComponent -> 도달하고자하는 컴포넌트
 * option: 도달하고자 하는 컴포넌트에 로그인유무에 따른 필터 조건
 *      -> 1 : 로그인된유저만 갈 수 있는 페이지
 *      -> everyone : 모든 유저가 갈 수 있는 페이지
 *      -> -1 : 로그인된 유저는 갈 수없는 페이지
 * */
export const USER = 'USER';
export const GUEST = 'GUEST';
export const EVERY_ONE = 'EVERY_ONE';

interface iProps {
	SpecificComponent: LoadableComponent<any> | LoadableClassComponent<any>;
	option: 'USER' | 'GUEST' | 'EVERY_ONE';
}

export default function AuthCheck(props: iProps) {
	const { SpecificComponent, option } = props;
	const navigate = useNavigate();
	const { auth, user } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	useLayoutEffect(() => {
		setIsLoading(true);
		dispatch(getAuth());
	}, [SpecificComponent]);

	useEffect(() => {
		if (auth.is_auth && option === GUEST) {
			return navigate('/');
		} else if (!auth.is_auth && option === USER) {
			return navigate('/user/signin');
		}
		setIsLoading(false);
	}, [SpecificComponent, auth, option]);

	if (isLoading) {
		return <Loading />;
		// return <h1>asv</h1>;
	}

	return <SpecificComponent />;
}
