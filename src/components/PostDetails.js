// import axios from "axios";
// import { useState, useRef } from "react";
// import EditIcon from "./EditIcon.js";
// import styled from "styled-components";
// import DeleteIcon from "./DeleteIcon.js";
// import Likes from "./Likes.js";


// function PostDetails() {
//     const [active, setActive] = useState(false);
//     const [enableTextArea, setEnableTextArea] = useState(false);
//     const textareaRef = useRef("lili");
//     const [defaultText, setDefaultText] = useState("default value");

//     const data = localStorage.getItem("dados");
//     const userData = JSON.parse(data);

//     const config = {
//         headers: {
//             Authorization: `Bearer ${userData.token}`
//         }
//     }

//     const handleUserKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             sendUpdate();
//         }
//     };

//     async function sendUpdate() {
//         setEnableTextArea(true);

//         try {
//             await axios.post("http://localhost:4000/post-details/edit", {
//                 publicationId: ,
//                 description: textareaRef.current.value
//             }, config);

//             console.log(textareaRef.current.value);
//             setActive(false);
//         } catch (e) {
//             alert("Não foi possível salvar as alterações!");
//             setEnableTextArea(false);
//         }
//     }

//     return (
//         <Container>
//             <Icons>
//                 <EditIcon active={active}
//                     setActive={setActive}
//                     enableTextArea={enableTextArea}
//                     setEnableTextArea={setEnableTextArea}
//                     textareaRef={textareaRef} />
//                 <DeleteIcon config={config} />
//             </Icons>
//             <Likes />
//             {active ? 
//                     <TextArea active={active} 
//                               readOnly={enableTextArea}
//                               type="text" 
//                               ref={textareaRef}
//                               onKeyPress={handleUserKeyPress}
//                               style={{color: '#4C4C4C'}}
//                               defaultValue={defaultText}>                                 
//                     </TextArea> 
//             : 
//             <p>my description</p>}
//         </Container> 
//     )
// }

// export default PostDetails;

// const Container = styled.div`
//     z-index: 3500;
//     svg {
//         color: #FFFFFF;
//         cursor: pointer;
//     }

//     p {
//         font-family: 'Lato';
//         font-weight: 400;
//         font-size: 17px;
//         line-height: 20px;
//         color: #B7B7B7;
//     }

//     background-color: #171717;
//     margin-top: 200px;
//     width: 300px;
//     height: 200px;
// `;

// const TextArea = styled.textarea`
//     width: 503px;
//     height: 44px;
//     border: none;
//     border-radius: 7px;
//     background-color: ${(props) => (props.active ? '#FFFFFF' : '#171717')}
// `;

// const Icons = styled.div`
//     width: 50px;
//     height: 16px;
//     display: flex;
//     justify-content: space-evenly;
//     /* position: fixed;
//     top: 22px;
//     right: 23px; */
// `;