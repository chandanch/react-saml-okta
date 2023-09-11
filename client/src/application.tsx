import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import logging from './config/logging';

export interface IApplicationProps {}

interface UserInfo {
    issuer: string;
    nameIDFormat: string;
    sessionIndex: string;
}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo>({ issuer: '', nameIDFormat: '', sessionIndex: '' });

    const fetchUserInfo = useCallback(async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/userinfo',
                withCredentials: true
            });
            if (response.data.user.nameID) {
                setEmail(response.data.user.nameID);
                setUserInfo(response.data.user);
                setLoading(false);
            } else {
                RedirectToLogin();
            }
        } catch (error) {
            logging.error(error, 'SAML');
            RedirectToLogin();
        }
    }, []);

    useEffect(() => {
        logging.info('Initiating SAML check.', 'SAML');
        (async () => {
            logging.info('Fetching user data');
            await fetchUserInfo();
        })();

        return () => {
            setUserInfo({ issuer: '', nameIDFormat: '', sessionIndex: '' });
        };
    }, [fetchUserInfo]);

    const RedirectToLogin = () => {
        window.location.replace('http://localhost:8000/login');
    };

    if (loading) return <p>loading ...</p>;

    return (
        <div>
            <h2 style={{ color: 'green' }}>SAML 2.0 Login with Okta IDP Successful!</h2>
            <h4>User Details</h4>
            <hr />
            <p>
                {' '}
                User: <b>{email}</b>{' '}
            </p>
            <p>
                {' '}
                Issuer: <b>{userInfo.issuer}</b>{' '}
            </p>
            <p>
                Name ID Format: <b>{userInfo.nameIDFormat}</b>
            </p>
        </div>
    );
};

export default Application;
