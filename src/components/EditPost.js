import styled from "styled-components";
import { useRef, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { CgTrashEmpty } from "react-icons/cg";
 
function EditPost() {
    const [active, setActive] = useState(false);
    const textareaRef = useRef();

    function editPost() {
        textareaRef.current.focus();
        setActive(!active);
        console.log(textareaRef.current.value)
    }

    return (
        <Container>
            <Icons>
                <TiPencil onClick={() => editPost()}/>
                <CgTrashEmpty/>
            </Icons>
            <TextArea active={active} 
                      type="text" 
                      ref={textareaRef}
                      style={{color: active ? '#4C4C4C' : '#FFFFFF'}}></TextArea>
        </Container>
    )
}

export default EditPost;

const Container = styled.div`
    svg {
        color: #FFFFFF;
        cursor: pointer;
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