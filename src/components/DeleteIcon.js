import axios from "axios";
import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import { CgTrashEmpty } from "react-icons/cg";
import { ThreeDots } from "react-loader-spinner";

Modal.setAppElement(".root");

function DeleteIcon({ postId, refreshTimeline, token}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
       } 
   }

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    async function deletePost() {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/post/delete/${postId}`, config);
            setLoading(false);
            toggleModal();
            refreshTimeline();
        } catch (e) {
            console.log(e);
            toggleModal();
            alert("Não foi possível excluir o post!");
            setLoading(false);
        }
    }

    return  (
        <Container>
            <CgTrashEmpty onClick={() => toggleModal()} />
            <Modal
                isOpen={isOpen}
                className="_"
                overlayClassName="_"
                contentElement={(props, children) => (
                    <ModalStyle {...props}>{children}</ModalStyle>
                )}
                overlayElement={(props, contentElement) => (
                    <OverlayStyle {...props}>{contentElement}</OverlayStyle>
                )}
             >
               <div className="dialog-text">
                    Are you sure you want to delete this post?
                </div>
                <div className="buttons">
                    <button className="goback" onClick={toggleModal} disabled={loading}>No, go back</button>
                    {loading ? 
                    <DivLoading>
                        <ThreeDots color="#FFFFFF" width={50} />
                    </DivLoading>
                    :
                    <button className="deleteit" onClick={deletePost}>Yes, delete it</button>
                    }
                    
                </div>
            </Modal>
        </Container>    
    )
}

export default DeleteIcon;

const Container = styled.div`
    svg {
        color: #FFFFFF;
        cursor: pointer;
    }

    width: 14px;
    height: 14px;
    background-color: #171717;
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
        font-size: 34px;
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