import styled from "styled-components";
import { useRef, useState, useEffect  } from "react";
import { TiPencil } from "react-icons/ti";
import { CgTrashEmpty } from "react-icons/cg";
 
function EditPost() {
    const [active, setActive] = useState(false);
    const textareaRef = useRef("");
    
    function editPost() {
        setActive(!active);
    }

    useEffect(() => {
        if (active) {
          textareaRef.current.focus();
          console.log(textareaRef.current.value);
        }
      }, [active]);

    function getDescription() {
        return <p>my description</p>
    }

    function getTextArea() {
        return <TextArea active={active} 
                    type="text" 
                    ref={textareaRef}
                    style={{color: '#4C4C4C'}}>
            </TextArea> 
    }

    return (
        <Container>
            <Icons>
                <TiPencil onClick={() => editPost()}/>
                <CgTrashEmpty/>
            </Icons>

            {active ? getTextArea() : getDescription()}
            
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