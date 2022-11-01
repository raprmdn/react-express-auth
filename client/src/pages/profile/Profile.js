import React, { useState, useEffect } from 'react';
import { profileAPI } from "../../services/api";
import {useSelector} from "react-redux";
import {selectCurrentAccessToken} from "../../features/authSlice";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const Profile = () => {
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const token = useSelector(selectCurrentAccessToken);

    useEffect(() => {
        fetchUser();
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await profileAPI();
            setUser(response.data.data.user);
            setLoading(false);
        } catch (e) {
            if (e.response?.status === 401) toast.error(e.response.data.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5">
                        <div className="card-body">
                            { loading ? (
                                <Spinner animation={"border"} className="text-primary d-flex justify-content-center m-auto" />
                                )
                                : (
                                    <>
                                        <h5 className="card-title">{ user.name }</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{ user.email }</h6>
                                        <p className="card-text">{ user.provider }</p>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
