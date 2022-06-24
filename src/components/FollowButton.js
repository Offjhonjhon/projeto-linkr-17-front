import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function FollowButton({ userId, followed, setFollowed }) {
    const data = localStorage.getItem("data");
    console.log(data)
    const loggedUser = JSON.parse(data).userId;
    const token = JSON.parse(data).token;
    console.log(loggedUser)

    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
       } 
   }

   async function followUser() {
       setActive(true);

        try {
            if (!token) {
                navigate("/sign-in");
            } else {
                const response = await axios.post("http://localhost:4000/user/follow", { userPageId: userId }, config);
                console.log(response.data)
    
                if (response.data === "followed") {
                    setFollowed(!followed);                
                }
    
                if (response.data === "unfollowed") {
                    setFollowed(!followed);
                }  
    
                setActive(false);
            }

        }catch (e) {
            console.log(e);
            alert("Não foi possível executar a operação!");
        } 
   }

    console.log('state', followed)

    return (
        <>
            {parseInt(userId) !== loggedUser ? 
                <Button disabled={active}
                        background={followed ? "#FFFFFF" : "#1877F2"}
                        fontColor={followed ?  "#1877F2" : "#FFFFFF"}  
                        onClick={followUser}>{followed ? "Unfollow" : "Follow"}</Button>
            : ""}
        </>
    )
}

export default FollowButton;

const Button = styled.button`
    width: 112px;
    height: 31px;
    background-color: ${(props) => props.background};
    color: ${(props) => props.fontColor};
    border: none;
    border-radius: 5px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;

    margin-right: calc(10px - (100%/2));
    margin-left: 60px;

    @media (max-width: 900px){
        margin-right: calc(50px - (65%/2));
    }

    @media (max-width: 750px) {
        margin-right: 10px;
    }
`;