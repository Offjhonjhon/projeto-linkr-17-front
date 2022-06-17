import styled from 'styled-components';

export default function PageContainer({ children }) {

    return (
        <Page>
            {children}
        </Page>
    );
}

const Page = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #333333;
    padding-top: 72px;

    @media (max-width: 700px) {
        justify-content: center;
    }
`;
