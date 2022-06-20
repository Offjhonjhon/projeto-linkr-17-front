import PageContainer from '../components/PageContainer';
import TrendingHashtags from '../components/TrendingHashtags';
import styled from 'styled-components';

function Timeline() {
    const text = 'Teste #react #react-native #sql #materiais'

    const getTags = (text) => {
        const tags = [];
        text.split(" ").forEach(tag => {
            if (tag.startsWith("#")) {
                tags.push(tag.replace("#", ""));
            }
        })
        return tags;
    }
    return (
        <PageContainer>
            <TrendingHashtags />
            {console.log(getTags(text))}
        </PageContainer>
    );
}

export default Timeline;

const TesteContainer = styled.div`
    background-color: #333333;
    width: 300px;
    height: 300px;
`


