import { FaRetweet } from "react-icons/fa";
import { useState } from "react";
import styled from "styled-components";
import Tippy from '@tippyjs/react/headless';

export default function Reposts() {
    const [count, setCount] = useState(0);

    function repost() {
        setCount(count + 1);
    }

    return (
        <Container>
            <FaRetweet onClick={repost}/>
            <p>{count} reposts</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: 'Lato';
    font-size: 11px;
    line-height: 13px;
    margin-left: 20px;
    height: 60px; 

    svg {
        font-size: 23px;
        cursor: pointer;
    }

    p {
        color: #FFFFFF;
        margin-top: 4px;
        cursor: default;
    } 
`;