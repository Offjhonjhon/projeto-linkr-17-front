import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StateContext from '../contexts/StateContext.js';

export default function Header() {
    const getData = localStorage.getItem("dados");
    const { avatar } = getData ? JSON.parse(getData) : '';
    const { visible } = useContext(StateContext);
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('dados');
        navigate('/');
    }

    return visible ? (
        <Container>
            <Nav>
                <Title onClick={() => navigate("/timeline")}>linkr</Title>
                <Block onClick={() => setMenu(!menu)}>
                    <Icon>{menu ? <FaAngleDown /> : <FaAngleUp />}</Icon>
                    <Image src={avatar}></Image>
                </Block>
            </Nav>
            {menu ? 
                <Menu onClick={logout}>Logout</Menu> 
            : <></>} 
        </Container>
    ) : <></>;
}

const Container = styled.div`
    width: 100vw;
    background-color: #333333;
`;

const Nav = styled.div`
    z-index: 1;
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
    
    :hover {
        cursor: pointer;
    }
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

    :hover {
        cursor: pointer;
    }
`;

const Menu = styled.div`
    top: 72px;
    right: 0;
    width: 150px;
    height: 47px;
    font-weight: 700;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    font-family: 'Lato';
    color: #FFFFFF;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    z-index: 1;

    :hover {
        cursor: pointer;
    }
`;