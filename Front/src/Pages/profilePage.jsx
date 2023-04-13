import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import { getAuthorByUsername } from "../Service";

function Profile() {
    let navigate = useNavigate();
    const { setIsAuthenticated } = useAuthContext();

    const logout = () => {
        //call api
        localStorage.setItem("token", "");
        setIsAuthenticated(false);
        navigate("/login")
    }
    const username = localStorage.getItem('token');
    const [author, setAuthor] = useState([]);
    const fetchAuthor = () => {
        getAuthorByUsername(username)
            .then(res => {
                setAuthor(res.data)
            })
    };
    useEffect((username) => {
        fetchAuthor()
    }, [username]);

    return <div style={{ width: '80%', margin: 'auto' }}>
        <button onClick={logout}>Logout</button>
        <div style={{ width: '50%' }}>
            <p style={{ paddingTop: '10px' }}>Username</p>
            <Input
                value={author.username}
            />
            <p style={{ paddingTop: '10px' }}>FirstName</p>
            <Input
                value={author.firstName}
            />
            <p style={{ paddingTop: '10px' }}>LastName</p>
            <Input
                value={author.lastName}
            />
            <p style={{ paddingTop: '10px' }}>Email</p>
            <Input
                value={author.email}
            />
        </div>
    </div>


}

export default Profile;