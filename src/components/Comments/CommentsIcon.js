import { AiOutlineComment } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import StateContext from "../../contexts/StateContext";
import axios from "axios";



export default function CommentsIcon() {
    const { URL } = useContext(StateContext);
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        async function getCommentsQuantity() {
            try {
                const { data } = await axios.get(`${URL}/comments/quantity`);
                setQuantity(data)

            }
            catch (error) {
                console.log(error)
                alert("An error occured while trying to fetch the comments, please refresh the page");
            }
        }

        getCommentsQuantity();

    }, [URL]);



    return (
        <CommentIconContainer>
            <CommentIcon />
            <CommentQuantity>{`${quantity} comments`}</CommentQuantity>
        </CommentIconContainer>
    );
}

const CommentIconContainer = styled.div`
    margin-left: 7px;
    margin-right: 5px;
    width: 67px;
`

const CommentIcon = styled(AiOutlineComment)`
    font-size: 20px;
    margin-top: -12px;
    cursor: pointer;
    margin-left: 23px;
`
const CommentQuantity = styled.p`
    font-family: 'Lato';
    font-size: 11px;
    line-height: 13px;
    margin-left: 5px;
  

`