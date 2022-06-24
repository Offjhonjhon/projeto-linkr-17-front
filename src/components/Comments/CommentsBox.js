import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";
import Comment from "./Comments";
import CommentsPostBar from "./CommentsPostBar";

export default function CommentsBox({ post, visibility, avatar, token, refresh, setRefresh }) {
    const { URL } = useContext(StateContext);
    const [params, setParams] = useState(useNavigate.params);
    const [comments, setComments] = useState([]);
    const [follows, setFollows] = useState([]);
    const data = localStorage.getItem("dados");

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

        async function getFollows() {
            try {
                const { data } = await axios.get(`${URL}/comments/follow`, { headers: { Authorization: `Bearer ${token}` } });
                listFollows(data)
            }
            catch (error) {
                console.log(error)
                alert("An error occured while trying to fetch the follows, please refresh the page");
            }
        }

        getComments();
        getFollows();

    }, [URL, refresh, params, post.postId]);

    function listFollows(data) {
        const followList = data.map(follow => {
            return follow.followUserId
        })
        setFollows(followList)
    }

    return (
        <Box visibility={visibility}>
            <CommentsContainer>
                {comments.map((comment, index) => (
                    <>
                        <Comment key={index} value={comment} follows={follows} />
                        <CommentDivisionBar key={index + comments.length} />
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
