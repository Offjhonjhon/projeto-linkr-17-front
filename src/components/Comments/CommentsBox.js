import { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";
import Comment from "./Comments";
import CommentsPostBar from "./CommentsPostBar";

export default function CommentsBox({ postId, visibility, avatar }) {
    const { URL } = useContext(StateContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getComments() {
            try {
                const { data } = await axios.get(`${URL}/comments/${postId}`);
                setComments(data)
            }
            catch (error) {
                console.log(error)
                alert("An error occured while trying to fetch the comments, please refresh the page");
            }
        }

        getComments();

    }, [URL]);

    return (
        <CommentsBox>
            <CommentsContainer visibility={visibility}>
                {comments.map((comment, index) => (
                    <>
                        <Comment key={index} value={comment} />
                        <CommentDivisionBar key={comment.id} />
                    </>
                ))}
                
            </CommentsContainer>
        </CommentsBox>
    );
}

const CommentsContainer = styled.div`
    display: ${props => props.visibility ? 'inline' : 'none'};
    background: #1E1E1E;
    height: 250px;
    overflow: scroll;
    border-radius: 0 0 20px 20px;
    
    ::-webkit-scrollbar {
        display: none;
    }
`

const CommentDivisionBar = styled.hr`
    width: 92%;
    border: 1px solid #353535;
`