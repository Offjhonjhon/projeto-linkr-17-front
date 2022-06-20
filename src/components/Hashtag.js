import ReactHashtag from "react-hashtag";
import styled from "styled-components";
import { useContext } from "react";
import TagContext from "../contexts/TagContext";

function Hashtag(props) {

    return (
        <HashtagContainer>
            <ReactHashtag
                renderHashtag={(hashtagValue) => {
                    return (
                        <StyledHashtag
                            href={`/hashtag/${hashtagValue.replace("#", "")}`}
                            key={hashtagValue}
                        >
                            {hashtagValue}
                        </StyledHashtag>
                    )
                }}
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