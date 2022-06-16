import axios from "axios";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styled from "styled-components";
import Tippy from '@tippyjs/react/headless';


function Likes() {
    const [icon, setIcon] = useState(false);
    const [totalLikes, settotalLikes] = useState("");
    let users = [""];

    async function getAllLikes() {
        try {
            const {request} = await axios.post("http://localhost:12000/userLikes", { publicationId: 1 });
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
            const {request} = await axios.post("http://localhost:12000/likes", { publicationId: 1 });
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
                return `Você, ${users[1]} e outras ${users.length - 2} pessoas`;
            }
        } else {
            if (totalLikes === 1) {
                return `${users[1]}`;
            } else if (totalLikes === 2) {
                return `${users[1]} e outra pessoa`;
            } else if (totalLikes === 3) {
                return `${users[1]} e outras 2 pessoas`;
            } else  {
                return `${users[1]} e outras ${users.length - 2} pessoas`;
            }
        }
    }
      
    return (
        <Container style={{background: "#000"}}> 
            {getIcon()}
            <Tippy 
                render={attrs => (
                    <Tooltip className="p" {...attrs}>
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

    svg {
        width: 20px;
        height: 18px;
        cursor: pointer;
    }

    p {
        color: #FFFFFF;
        margin-top: 4px;
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