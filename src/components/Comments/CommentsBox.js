import { AiOutlineComment } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";



export default function CommentsBox({ postId }) {
    const { URL } = useContext(StateContext);
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        async function getCommentsQuantity() {
            try {
                const { data } = await axios.get(`${URL}/comments/${postId}`);
                console.log(data)
                setComments(data)

            }
            catch (error) {
                console.log(error)
                alert("An error occured while trying to fetch the comments, please refresh the page");
            }
        }

        getCommentsQuantity();

    }, [URL, refresh]);

    return (
        <CommentsContainer>


        </CommentsContainer>
    );
}

const CommentsContainer = styled.div`

`