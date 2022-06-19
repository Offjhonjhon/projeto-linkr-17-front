import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import { CgTrashEmpty } from "react-icons/cg";

Modal.setAppElement(".root");

function DeleteIcon() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
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
                    <button className="goback" >No, go back</button>
                    <button className="deleteit" >Yes, delete it</button>    
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
    /* margin-top: 100px;
    margin-bottom: 200px; */
`;

const ModalStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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