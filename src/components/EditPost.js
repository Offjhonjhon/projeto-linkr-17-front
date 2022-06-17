import axios from "axios";
import styled from "styled-components";
import { useRef, useState, useEffect  } from "react";
import { TiPencil } from "react-icons/ti";
import { CgTrashEmpty } from "react-icons/cg";
 
function EditPost() {
    const [active, setActive] = useState(false);
    const textareaRef = useRef("");
    
    function getTextArea() {
        setActive(!active);
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

    const handleUserKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendUpdate(); 
        }
    };

    function sendUpdate() {
        console.log("send update")
        console.log(textareaRef.current.value)

        const promise = axios.post("http://localhost:4000/edit-post", {
            publicationId: 1,
            description: textareaRef.current.value
        });
        promise.then(() => {
            setActive(false);
        });
        promise.catch(() => {
            alert("Não foi possível salvar as alterações!")
        })
    }

    return (
        <Container>
            <Icons>
                <TiPencil onClick={() => getTextArea()}/>
                <CgTrashEmpty/>
            </Icons>

            {active ? 
                    <TextArea active={active} 
                              type="text" 
                              ref={textareaRef}
                              onKeyPress={handleUserKeyPress}
                              style={{color: '#4C4C4C'}}>
                    </TextArea> 
            : 
            <p>my description</p>}
            
        </Container>
    )
}

export default EditPost;

const Container = styled.div`
    svg {
        color: #FFFFFF;
        cursor: pointer;
    }

    p {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }

    background-color: #171717;
`;

const TextArea = styled.textarea`
    width: 503px;
    height: 44px;
    border: none;
    border-radius: 7px;
    background-color: ${(props) => (props.active ? '#FFFFFF' : '#171717')}
`;

const Icons = styled.div`
    display: flex;
`;