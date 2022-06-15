import axios from "axios";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styled from "styled-components";

function Likes() {
    const [icon, setIcon] = useState(false);

    async function getUserLikes() {
        try {
            const {request} = await axios.post("http://localhost:8000/userLikes", { publicationId: 1 });
            const {response} = request;
            const object = JSON.parse(response);
    
            if (object.isLiked) {
                setIcon(true);
            } else {
                setIcon(false);
            }
        }catch(e) {
            console.log(e);
        }
    }
    getUserLikes();

    async function likePost() {
        try {
            const {request} = await axios.post("http://localhost:8000/likes", { publicationId: 1 });
            const {response} = request;

            console.log(response)

            if (response === "likeSuccess") {
                setIcon(!icon);                
            }

            if (response === "deslikeSuccess") {
                setIcon(!icon);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function getIcon() {
        return icon ? (
            <FaHeart style={{fill: "#AC0000"}} onClick={likePost}/>
        )
        :
        (
            <FaRegHeart style={{fill: "#FFFFFF"}} onClick={likePost}/>
        )
    }
    return (
        <Container style={{background: "#000"}} >         
            {getIcon()}
        </Container>
    )
}

export default Likes;

const Container = styled.div`
    margin-left: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg {
        width: 20px;
        height: 18px;
    }

    p {
        color: #fff;
    }
`;