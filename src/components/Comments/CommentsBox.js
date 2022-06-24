import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";
import Comment from "./Comments";
import CommentsPostBar from "./CommentsPostBar";

export default function CommentsBox({ post, visibility, avatar, token }) {
    const { URL } = useContext(StateContext);
    const [params, setParams] = useState(useNavigate.params);
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    console.log(refresh);

    useEffect(() => {
        async function getComments() {
            try {
                const { data } = await axios.get(`${URL}/comments/${post.postId}`);
                setComments(data)
            }
            catch (error) {
                console.log(error)
                alert("An error occured while trying to fetch the comments, please refresh the page");
            }
        }

        getComments();

    }, [URL, refresh, params, post.postId]);

    return (
        <Box visibility={visibility}>
            <CommentsContainer>
                {comments.map((comment, index) => (
                    <>
                        <Comment key={index} value={comment} />
                        <CommentDivisionBar key={comment.id} />
                    </>
                ))}

            </CommentsContainer>
            <CommentsPostBar
                icon={avatar}
                token={token}
                postId={post.postId}
                refresh={() => setRefresh(!refresh)}
            />
        </Box>
    );
}

const CommentsContainer = styled.div`
     max-height: 250px;
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
const Box = styled.div`
    display: ${props => props.visibility ? 'inline' : 'none'};
    background: #1E1E1E;
`
