import { FiSend } from "react-icons/fi";
import { useContext, useState } from "react";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";


export default function CommentsPostBar({ icon, token, postId, refresh }) {
    const { URL } = useContext(StateContext);
    const [text, setText] = useState('');
    const comment = {
        comment: text,
        postId: postId
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        try {
            axios.post(`${URL}/comments/publish`, comment, { headers: { Authorization: `Bearer ${token}` } });
            setText('');
            refresh();
        }
        catch (error) {
            console.log(error);
        }
    }

    document.addEventListener("keypress", function (e) {
        if (e.key === "enter") {
            const btn = document.querySelector('#submit');

            btn.click();
        }
    })

    return (
        <PublishCommentContainer >
            <UserIcon src={icon} />
            <PublishCommentBar onSubmit={handleCommentSubmit}>
                <TextArea
                    placeholder="write a comment..."
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <SendComment type="submit" id="submit"><StyledIcon /></SendComment>
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
    width: 39px;
    height: 39px;
    border-radius: 25px;
    object-fit: cover;
    margin-left: 25px;
    margin-right: 18px;
`

const PublishCommentBar = styled.form`
    display: flex;
    align-items: center;
    width: 82%;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    justify-content: space-between;

`
const TextArea = styled.input`
    margin-left: 15px;
    width: 90%;
    border: none;
    background: #252525;
    color: #ACACAC;
    font-size: 15px;

    ::placeholder {
        font-size: 14px;
        color: #575757;
    }

    :focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
`
const SendComment = styled.button`
    cursor: pointer;
    width: 17px;
    height: 17px;
    margin-right: 17px;
    font-size: 15px;
    background: #252525;
    border: none;
`

const StyledIcon = styled(FiSend)`
    color: #F3F3F3;
`