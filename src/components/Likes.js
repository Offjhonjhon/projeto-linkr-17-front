import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styled from "styled-components";
import Tippy from '@tippyjs/react/headless';

function Likes() {
    const [icon, setIcon] = useState(false);
    const [totalLikes, settotalLikes] = useState("");
    const [usersAux, setUsersAux] = useState([]);
    let users = [];

    async function getAllLikes() {
        try {
            const {request} = await axios.post("http://localhost:4000/userLikes", { publicationId: 1 });
            const {response} = request;
            const object = JSON.parse(response);

            if (object.allLikes.length > 0) {
                settotalLikes(object.allLikes.length);
            } else {
                settotalLikes("");
            }            
            
            if (object.userName) {
                setIcon(true);
            } else {
                setIcon(false);
            }

            object.allLikes.forEach(item => {
                if (item) {
                    users.push(item);
                }
            });           
        }catch(e) {
            console.log(e);
        }
        
    }
    getAllLikes();  

    async function likePost() {
        try {
            const {request} = await axios.post("http://localhost:4000/likes", { publicationId: 1 });
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

    useEffect(() => {
        setUsersAux([...usersAux, users]);
    }, []);

    function getTooltipBoxLikes() {
        if (totalLikes === 0) {
            return "";
        } 
        
        if (icon) {
            if (totalLikes === 1) {
                return "Você";
            } else if (totalLikes === 2) {
                return `Você e outra pessoa`;
            } else if (totalLikes === 3) {
                return "Você e outras 2 pessoas";
            } else  {
                return `Você, ${usersAux[0][0]} e outras ${usersAux[0].length - 1} pessoas`;
            }
        } else {
            if (totalLikes === 1) {
                return `${usersAux[0][0]}`;
            } else if (totalLikes === 2) {
                return `${usersAux[0][0]} e outra pessoa`;
            } else if (totalLikes === 3) {
                return `${usersAux[0][0]} e outras 2 pessoas`;
            } else  {
                return `${usersAux[0][0]} e outras ${usersAux[0].length - 1} pessoas`;
            }
        }
    }
      
    return (
        <Container style={{background: "#000"}}> 
            {getIcon()}
            <Tippy 
                placement="bottom"
                render={attrs => (
                    <Tooltip {...attrs}>
                      <p>{getTooltipBoxLikes()}</p>
                      <div className="arrow" data-popper-arrow></div>
                    </Tooltip>
                )} >
                <p>{totalLikes}{totalLikes > 1 ? " likes" : totalLikes === 1 ? " like" : ""}</p>
            </Tippy>
        </Container>
    )
}

export default Likes;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    margin-bottom: 100px;
    height: 100px;
    padding: 10px;


    svg {
        width: 20px;
        height: 18px;
        cursor: pointer;
    }

    p {
        color: #FFFFFF;
        margin-top: 4px;
        cursor: default;
    } 
`;

const Tooltip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 169px;
    height: 24px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.9);
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    margin-top: 6px;
    color: #505050;

    .arrow, .arrow::before {
        position: absolute;
        width: 12px;
        height: 12px;
        background: inherit;
    }

    .arrow {
        visibility: hidden;
        top: 2px;
    }

    .arrow::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
    }
`;