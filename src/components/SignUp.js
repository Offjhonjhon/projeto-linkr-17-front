import {useContext} from 'react';
import styled from 'styled-components';

import StateContext from '../contexts/StateContext.js';

export default function SignUp() {
    const {setVisible} = useContext(StateContext);
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
                <Input placeholder='username' />
                <Input placeholder='picture url' />
                <Button>Sign Up</Button>
                <More>Switch back to log in</More>
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
`;

const Text = styled.div`
    width: 25%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
`;

const H1 = styled.div`
    font-style: normal;
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    font-family: 'Passion One', cursive;
`;

const P = styled.div`
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    font-family: 'Oswald', sans-serif;
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