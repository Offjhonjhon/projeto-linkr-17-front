import { FiSend } from "react-icons/fi";
import { useContext, useState } from "react";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";


export default function CommentsPostBar({ avatar }) {
    const { URL } = useContext(StateContext);
    const [text, setText] = useState('');

    function handleCommentSubmit() {

    }

    return (
        <PublishCommentContainer >
            <PublishCommentBar onSubmit={handleCommentSubmit}>
                <UserIcon src={avatar} />
                <TextArea
                    placeholder="write a comment..."
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <SendComment type="submit"><FiSend /></SendComment>
            </PublishCommentBar>
        </PublishCommentContainer>
    );
}

const PublishCommentContainer = styled.div`
     display: flex;
    align-items: center;
    width: 100%;
    height: 65px;
    display: flex;
    font-family: 'Lato';
`
const UserIcon = styled.img`
`

const CommentDivisionBar = styled.hr`
    width: 92%;
    border: 1px solid #353535;
`
const PublishCommentBar = styled.form`

`
const TextArea = styled.input`
`
const SendComment = styled.button`
`