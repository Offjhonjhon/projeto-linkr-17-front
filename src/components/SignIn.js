import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import StateContext from '../contexts/StateContext.js';

export default function SignIn() {
    const {setVisible} = useContext(StateContext);
    const navigate = useNavigate();

    setVisible(false);
    
    return (
        <Container>
            <Text>
                <H1>linkr</H1>
                <P>save, share and discover the best links on the web</P>
            </Text>
            <Form>
                <Input placeholder='e-mail' />
                <Input placeholder='password' />
                <Button>Log In</Button>
                <More onClick={() => navigate('/sign-up')}>First time? Create an account!</More>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #151515;

    @media (max-width: 700px) {
        justify-content: center;
    }
`;

const Text = styled.div`
    width: 25%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;

    @media (max-width: 700px) {
        top: 0;
        width: 70%;
        height: 30%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
`;

const H1 = styled.div`
    font-style: normal;
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    font-family: 'Passion One', cursive;
    
    @media (max-width: 700px) {
        font-size: 76px;
    }
`;

const P = styled.div`
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    font-family: 'Oswald', sans-serif;
    
    @media (max-width: 700px) {
        font-size: 25px;
        line-height: 34px;
    }
`;

const Form = styled.div`
    right: 0;
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #333333;

    @media (max-width: 700px) {
        bottom: 0;
        width: 100vw;
        height: 70%;
    }
`;

const Input = styled.input`
    width: 70%;
    height: 8%;
    padding: 15px;
    margin-bottom: 12px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    color: #333333;
    background: #FFFFFF;
    font-family: 'Oswald', sans-serif;

    ::placeholder {
        color: #9F9F9F;
    }

    @media (max-width: 700px) {
        height: 11%;
    }
`;

const Button = styled.button`
    width: 70%;
    height: 8%;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    border: none;
    color: #FFFFFF;
    background: #1877F2;
    font-family: 'Oswald', sans-serif;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 700px) {
        height: 11%;
    }
`;

const More = styled.p`
    margin: 0 15%;
    margin-top: 22px;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    text-decoration: underline;
    font-family: 'Lato', sans-serif;

    :hover {
        cursor: pointer;
    }
`;