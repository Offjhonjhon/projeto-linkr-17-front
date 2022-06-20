import { Link } from "react-router-dom";
import styled from "styled-components";

const trendingHashtags = ['react', 'javaScript', "node"]

export default function TrendingHashtags() {
    return (
        <TrendingContainer>
            <TrendingTitle>trending</TrendingTitle>
            <TrendingLine />
            <TrendingHashtagsContainer>
                {trendingHashtags.map((hashtag, index) => {
                    return (
                        <TrendingHashtag
                            key={index}
                            to={`/hashtag/${hashtag}`}
                        >
                            {`# ${hashtag}`}
                        </TrendingHashtag>
                    )
                }
                )}
            </TrendingHashtagsContainer>
        </TrendingContainer>
    );
}

const TrendingContainer = styled.div`

    margin: 164px 0 0 25px;
    left: 1100px;
    top: 315px;
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    color: #ffffff;

    @media (max-width: 700px) {
        display: none;
    }

`
const TrendingTitle = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    margin-left: 16px;
    margin-top: 9px;
`
const TrendingHashtagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;    
    margin-top: 22px;
    font-family: 'Lato';
    font-size: 19px;
    margin-left: 16px;
`

const TrendingHashtag = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff;
    text-decoration: none;
`

const TrendingLine = styled.hr`
    width: 100%;
    height: 1px;
    border-color: #484848;
`
