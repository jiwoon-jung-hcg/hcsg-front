import React from 'react';
import axios from 'axios';

function authCheck(SpecificComponent: any, option = false) {
	function AuthenticationCheck() {
		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
