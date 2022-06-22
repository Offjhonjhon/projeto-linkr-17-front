import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function FollowButton({ userId }) {
    const data = localStorage.getItem("dados");
    console.log(data)
    const loggedUser = JSON.parse(data).userId;
    const token = JSON.parse(data).token;
    console.log(loggedUser)

    const [followed, setFollowed] = useState(false);

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
       } 
   }

   async function followUser() {
        try {
            const response = await axios.post("http://localhost:4000/user/follow", { userPageId: userId }, config);
            console.log(response.data)

            if (response.data === "followed") {
                setFollowed(!followed);                
            }

            if (response.data === "unfollowed") {
                setFollowed(!followed);
            }  
        }catch (e) {
        console.log(e);
        } 
   }

    console.log('state', followed)

    return (
        <>
            {parseInt(userId) !== loggedUser ? 
                <Button background={followed ? "#FFFFFF" : "#1877F2"}
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
    position: relative;
    top: 90px;
    left: 610px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
`;