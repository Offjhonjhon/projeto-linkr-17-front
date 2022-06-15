import {FaAngleDown} from 'react-icons/fa';
import {useContext} from 'react';
import styled from 'styled-components';

import StateContext from '../contexts/StateContext.js';

export default function Header() {
    const {visible} = useContext(StateContext);
    const image = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg';

    return visible ? (
        <Container>
            <Nav>
                <Title>linkr</Title>
                <Block> 
                    <Icon><FaAngleDown /></Icon>
                    <Image src={image}></Image>
                </Block>
            </Nav>
        </Container>
    ) : <></>;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #333333;
`;

const Nav = styled.div`
    top: 0;
    width: 100vw;
    height: 72px;
    padding: 10px 20px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    background-color: #151515;
`;

const Title = styled.h1`
    font-size: 49px;
    font-weight: 700;
    line-height: 54px;
    color: #FFFFFF;
    font-family: 'Passion One', cursive;
`;

const Block = styled.div`
    display: flex;
`;

const Icon = styled.div`
    font-size: 35px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    color: #FFFFFF;

    :hover {
        cursor: pointer;
    }
`;

const Image = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 27px;
`;