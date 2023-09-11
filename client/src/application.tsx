import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logging from './config/logging';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        logging.info('Initiating SAML check.', 'SAML');

        axios({
            method: 'GET',
            url: 'http://localhost:8000/whoami',
            withCredentials: true
        })
            .then((response) => {
                logging.info(response, 'SAML');

                if (response.data.user.nameID) {
                    setEmail(response.data.user.nameID);
                    setLoading(false);
                } else {
                    RedirectToLogin();
                }
            })
            .catch((error) => {
                logging.error(error, 'SAML');
                RedirectToLogin();
            });
    }, []);

    const RedirectToLogin = () => {
        window.location.replace('http://localhost:8000/login');
    };

    if (loading) return <p>loading ...</p>;

    return (
        <p>
            Login Successful! Hello I am <b>{email}!</b>
        </p>
    );
};

export default Application;
