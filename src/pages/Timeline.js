import PageContainer from '../components/PageContainer';
import TrendingHashtags from '../components/TrendingHashtags';

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



