const config = {
	saml: {
		cert: './source/config/saml.pem',
		entryPoint: process.env.SAML_ENTRYPOINT,
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
		secret: process.env.SESSION_SECRET || '',
		saveUninitialized: true
	}
};

export default config;
