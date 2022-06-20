import axios from "axios";
import { useEffect  } from "react";
import { TiPencil } from "react-icons/ti";
import styled from "styled-components";

function EditIcon({active, setActive, enableTextArea,setEnableTextArea, textareaRef, setPublicationId, postId}) {
    function getTextArea() {
        setActive(!active);
        setPublicationId(postId)
    }

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);
    }, [])

    const detectKeyDown = (e) => {
        if (e.key === "Escape") {
            setActive(false);
        }
    }

    useEffect(() => {
        if (active) {
          textareaRef.current.focus();
          console.log(textareaRef.current.value);
        }
    }, [active]);

    return (
        <Container>
             <TiPencil onClick={() => getTextArea()}/>
        </Container>
    )
}

export default EditIcon;

const Container = styled.div`
    svg {
        color: #FFFFFF;
        cursor: pointer;
    }
    background-color: #171717;
    width: 16px;
    height: 16px;
`;