import styled from 'styled-components';

export default function Comment({ value }) {

    const author = value.userId === value.postAuthor;

    return (
        <CommentContainer>
            <UserIcon src={value.avatar} />
            <CommentDiv>
                <User>{author ? <User>{value.name + " "} <Author > •  post’s author</Author></User> : `${value.name}`}</User>
                <UserText>{value.comment}</UserText>
            </CommentDiv>
        </CommentContainer>
    );
}

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 65px;
    display: flex;
    font-family: 'Lato';
    
`
const User = styled.p`
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
    margin-bottom: 5px;
`
const UserIcon = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 25px;
    object-fit: cover;
    margin-left: 25px;
    margin-right: 18px;
`
const UserText = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
`
const CommentDiv = styled.div`
`
const Author = styled.span`
    color: #565656;
`
