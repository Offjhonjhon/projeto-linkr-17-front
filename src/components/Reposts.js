import { FaRetweet } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";
import StateContext from "../contexts/StateContext";

Modal.setAppElement(".root");

export default function Reposts({ token, postId, Post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    const { URL } = useContext(StateContext)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    async function getAllLikes() {
        const { data } = await axios.get(`${URL}/reposts/${postId}`, config);
        setCount(data.count);
    }

    useEffect(() => getAllLikes(), []);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    async function repost() {
        try {
            await axios.post(`${URL}/reposts`, { publicationId: postId }, config);
            toggleModal();
            getAllLikes();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <FaRetweet onClick={() => toggleModal()} />
            <p>{count} {count === 1 ? 'repost' : 'reposts'}</p>
            <Modal
                isOpen={isOpen} className="_" overlayClassName="_"
                contentElement={(props, children) => (
                    <ModalStyle {...props}>{children}</ModalStyle>
                )}
                overlayElement={(props, contentElement) => (
                    <OverlayStyle {...props}>{contentElement}</OverlayStyle>
                )}
            >
                <div className="dialog-text">Do you want to re-post this link?</div>
                <div className="buttons">
                    <button className="goback" onClick={toggleModal}>No, cancel</button>
                    <button className="deleteit" onClick={repost}>Yes, share!</button>
                </div>
            </Modal>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: 'Lato';
    font-size: 11px;
    line-height: 13px;
    margin-left: 2px;
    margin-top: 12px;
    height: 60px; 

    svg {
        font-size: 23px;
        cursor: pointer;
    }

    p {
        color: #FFFFFF;
        margin-top: 4px;
        cursor: default;
    } 
`;

const ModalStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
    border: none;
    border-radius: 50px;
    width: 597px;
    height: 262px;
    padding: 38px 120px 65px 120px;

    .dialog-text {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
        background-color: #333333;
    }

    .buttons {
        width: 298px;
        display: flex;
        justify-content: space-between;
        background-color: #333333;
        margin-left: 40px;
    }

    button {
        border: none;
        border-radius: 5px;
        width: 134px;
        height: 37px;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        cursor: pointer;
    }

    .goback {
        color: #1877F2;
        background-color: #FFFFFF;
    }

    .deleteit {
        color: #FFFFFF;
        background-color: #1877F2;
    }

    @media (max-width: 700px) {
        width: 400px;
        height: 200px;
        padding: 18px 50px 18px 50px;

        .dialog-text {
            font-size: 24px;
            width: 280px;
        } 
        
        .buttons {
            width: 250px;
            margin: auto;
            justify-content: space-evenly;
        }

        button {
            width: 100px;
            height: 37px;
            font-size: 14px;
        }
    }

    @media (max-width: 500px) {
        width: 320px;
        height: 140px;
        padding: 20px 50px 50px 50px;

        .dialog-text {
            font-size: 14px;
            width: 280px;
            margin-bottom: 20px
        } 
        
        .buttons {
            width: 180px;
            margin: auto;
            justify-content: space-between;
        }

        button {
            width: 85px;
            height: 30px;
            font-size: 12px;
        }
    }


`;

const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);;
`;

const DivLoading = styled.div`
    border: none;
    border-radius: 5px;
    width: 134px;
    height: 37px;
    background-color: #1877F2;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;

    @media (max-width: 700px) {
        width: 100px;
        height: 37px;
    }

    @media (max-width: 500px) {
        width: 85px;
        height: 30px;
    }
`;
