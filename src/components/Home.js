import React, { useState } from "react";
import styled from "styled-components";

export default function Home() {

    const user = {
        name: "Pieddra Enza",
        avatar: "https://img.olhardigital.com.br/wp-content/uploads/2021/09/Chloe-meme.jpg"
    };

    const posts = [
        {
            avatar: "https://www.lance.com.br/files/article_main/uploads/2016/05/23/5743356b7548b.jpeg",
            name: "Rubens Barrichello",
            text: "Vocês estão sabendo desse novo vírus? Estão dizendo que começou quando beijaram o batman numa festa. #TeamMarvel",
            title: "Hubei registra 139 novas mortes por Covid-19; vírus infectou 69 mil no mundo",
            description: "Novo coronavírus matou 1.666 27 países registraram casos Europa teve neste sábado 1ª morte Doença chegou também à África",
            url: "https://www.poder360.com.br/internacional/hubei-registra-139-novas-mortes-por-covid-19-virus-infectou-69-mil-no-mundo/",
            image: "https://static.poder360.com.br/2020/02/coronavirus-foto.jpg"
        },
        {
            avatar: "https://img.olhardigital.com.br/wp-content/uploads/2021/09/Chloe-meme.jpg",
            name: "Pieddra Enza",
            text: "Se liga nesse curso toooop",
            title: "Driven",
            description: "Formação intensiva em programação web que te prepara em 9 meses para entrar no mercado de tecnologia. Pague só depois de empregado. 100% dos alunos empregados com salário inicial médio de R$5.500",
            url: "https://www.driven.com.br",
            image: "https://yt3.ggpht.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj"
        }
    ];

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");

    function publish() {
        console.log("publish click")
    }

    return (
        <>
            <Header></Header>
            <Main>
                <div class="timeline">timeline</div>
                <div class="publish">
                    <div class="profile-picture">
                        <img src={user.avatar} alt={user.name} />
                    </div>
                    <form class="publish-form" onSubmit={publish}>
                        <p>What are you going to share today?</p>
                        <input class="url" placeholder="http://..." type="url" value={url} onChange={e => setUrl(e.target.value)} />
                        <textarea class="text" placeholder="Awesome article about #javascript" type="text" value={text} onChange={e => setText(e.target.value)} />
                        <button type="submit">Publish</button>
                    </form>
                </div>
                {posts.map(post => {
                    return (
                        <Post>
                            <div class="profile-picture">
                                <img src={post.avatar} alt={post.name} />
                            </div>
                            <div class="post-area">
                                <p class="user-name">{post.name}</p>
                                <p class="text">{post.text}</p>
                                <div class="link-area">
                                    <div class="link-left">
                                        <div class="title">{post.title}</div>
                                        <div class="description">{post.description}</div>
                                        <div class="url">{post.url}</div>
                                    </div>
                                    <img src={post.image} alt="Post" />
                                </div>
                            </div>
                        </Post>
                    );
                })}
            </Main>
        </>
    );
}

const Header = styled.div`
    height: 72px;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const Main = styled.div`

    @media (min-width: 652px) {

        --width: 611px;
        --border-radius: 16px;

    }

    @media (min-width: 612px) and (max-width: 651px) {

        .timeline {
            padding-left: calc(325.5px - (100vw/2));
        }

        --width: 611px;
        --border-radius: 16px;
    }

    @media (max-width: 611px) {

        .timeline {
            padding-left: 20px;
        }

        --width: 100vw;
        --border-radius: 0px;
    }


    background-color: #333333;
    margin-top: 72px;
    color: white;
    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    

    .timeline {
        width: var(--width);
        margin-top: 78px;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        font-weight: 700;
        color: white;
    }

    .publish {
        height: 209px;
        width: var(--width);
        border-radius: var(--border-radius);
        margin-top: 43px;
        background-color: white;
        box-shadow: 0px 4px 4px 0px #00000040;

        display: flex;
    }

    .profile-picture {
        height: 100px;
        width: 68px;
    }

    .profile-picture > img {
        margin: 9px 0 0 18px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        object-fit: cover;
    }

    .publish-form {
        height: 100%;
        width: calc(var(--width) - 68px);
        padding: 20px;

        display: flex;
        flex-direction: column;
    }

    .publish-form * {
        font-family: 'Lato', sans-serif;
    }

    .publish-form > p {
        color: black;
        font-size: 20px;
        font-weight: 300;
    }

    .publish-form > .url {
        width: calc(var(--width) - 108px);
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        padding: 0 13px;
        height: 30px;
        margin-top: 15px;
        font-weight: 300;
        font-size: 15px;
    }

    .publish-form > .text {
        width: calc(var(--width) - 108px);
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        padding: 8px 13px;
        height: 66px;
        margin-top: 5px;
        font-weight: 300;
        font-size: 15px;
    }

    .publish-form > button {
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        margin-left: calc(100% - 112px);
        margin-top: 5px;
        border: none;
        font-size: 14px;
        font-weight: 700;
        color: white;
    }
`;

const Post = styled.div`
    min-height: 209px;
    width: var(--width);
    margin-top: 43px;
    border-radius: var(--border-radius);
    background-color: #171717;
    box-shadow: 0px 4px 4px 0px #00000040;

    display: flex;

    .profile-picture {
        height: 100px;
        width: 68px;
    }

    .profile-picture > img {
        margin: 9px 0 0 18px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        object-fit: cover;
    }

    .post-area {
        height: 100%;
        width: calc(var(--width) - 68px);
        padding: 20px;

        display: flex;
        flex-direction: column;
    }

    .post-area * {
        font-family: 'Lato', sans-serif;
    }

    .post-area > .user-name {
        color: white;
        font-size: 19px;
        font-weight: 400;
    }

    .post-area > .text {
        margin-top: 12px;
        padding-bottom: 5px;
        color: #B7B7B7;
        font-size: 17px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .link-area {
        margin-top: 12px;
        width: calc(var(--width) - 108px);
        height: 155px;
        border-radius: 11px;
        border: 1px solid #4D4D4D;

        display: flex;
    }

    .link-left {
        width: calc(0.7 * (var(--width) - 108px));
        height: 153px;
        padding: 24px 19px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .link-left > * {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .link-left > .title {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        -webkit-line-clamp: 2;
    }
    .link-left > .description {
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        -webkit-line-clamp: 3;
    }
    .link-left > .url {
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        -webkit-line-clamp: 1;
    }

    .link-area > img {
        width: calc(0.3 * (var(--width) - 108px));
        height: 153px;
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        object-fit: cover;
    }
`;