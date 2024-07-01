import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { setUserProfile } from "../../redux/actions";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const userProfile = useSelector((state) => state.user.userProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {

            try {
                const response = await axios.post('https://ebookspalace.onrender.com/userverify', {
                    name: user.name,
                    email: user.email,
                    profilePicture: user.picture,
                });

                if (response.status === 400) {
                    console.log("Faltan datos al momento de la creación");
                } else if (response.status === 200) {
                    dispatch(setUserProfile(response.data.existingUser));
                    localStorage.setItem('userProfile', JSON.stringify(response.data.existingUser));
                } else if (response.status === 201) {
                    dispatch(setUserProfile(response.data.newUser));
                    localStorage.setItem('userProfile', JSON.stringify(response.data.newUser));
                }
            } catch (error) {
                console.error("Error al verificar/crear usuario:", error.response ? error.response.data : error.message);
            }
        };
        const handleUserChange = () => {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                try {
                    const parsedProfile = JSON.parse(storedProfile);
                    if (parsedProfile !== user.email) {
                        localStorage.removeItem('userProfile');
                        fetchUserProfile();
                    } else {
                        dispatch(setUserProfile(parsedProfile));
                    }
                } catch (error) {
                    console.error("Error parsing userProfile from localStorage:", error.message);
                    localStorage.removeItem('userProfile');
                }
            } else {
                fetchUserProfile();
            }
        };
        if (!isLoading && isAuthenticated && user) {
            handleUserChange();
        }
    }, [isLoading, isAuthenticated, user, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return <div>No user data available.</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <img src={userProfile.profilePicture} alt={userProfile.name} />
                <h2>{userProfile.name}</h2>
                <p>Email: {userProfile.email}</p>
            </div>
        )
    );
};
