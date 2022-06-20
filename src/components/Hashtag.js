import ReactHashtag from "react-hashtag";
import styled from "styled-components";

function Hashtag(props) {
    return (
        <HashtagContainer>
            <ReactHashtag
                renderHashtag={(hashtagValue) => (
                    <StyledHashtag
                        href={`/hashtag/${hashtagValue.replace("#", "")}`}
                    >
                        {hashtagValue}
                    </StyledHashtag>
                )}
            >
                {props.children}
            </ReactHashtag>
        </HashtagContainer>
    );
}

export default Hashtag;

const StyledHashtag = styled.a`
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
    display: inline;
`;

const HashtagContainer = styled.div`
    
`