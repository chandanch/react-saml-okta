const config = {
	saml: {
		cert: './source/config/saml.pem',
		entryPoint: 'https://dev-21220433.okta.com/app/dev-21220433_reactsamlic_1/exkb71in9zqKNHpXm5d7/sso/saml',
		issuer: 'http://localhost:8000',
		options: {
			failureRedirect: '/login',
			failureFlash: true
		}
	},
	server: {
		port: 8000
	},
	session: {
		resave: false,
		secret: 'tyh@qweb00n11',
		saveUninitialized: true
	}
};

export default config;
