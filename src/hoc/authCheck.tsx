import React, { useEffect } from 'react';
import axios from 'axios';

function authCheck(SpecificComponent: any, option = false) {
	function AuthenticationCheck() {
		useEffect(() => {
			console.log('dd');
		}, []);
		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
