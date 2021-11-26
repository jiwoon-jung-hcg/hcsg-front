import Cookies from 'universal-cookie';

export const CookieSingleton = {
	cookie: new Cookies(),
	getCookie() {
		return this.cookie;
	},
};
