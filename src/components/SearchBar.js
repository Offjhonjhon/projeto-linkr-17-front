import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { DebounceInput } from 'react-debounce-input'
import { useNavigate } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import StateContext from '../contexts/StateContext.js'
import styled from "styled-components"

export default function SearchBar() {
    const navigate = useNavigate()
    const { visible, URL } = useContext(StateContext)
    const [search, setSearch] = useState({ name: "" })
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const datas = localStorage.getItem("data");
    const data = JSON.parse(datas);

    console.log(users)

    useEffect(() => {
        setLoading(true)
        if (search.name.length >= 3) {
            setUsers([])
            axios
                .post(`${URL}/search`, {search: search, userId: data.userId})
                .then(response => {
                    if (response.data.length === 0) {
                        setLoading(false)
                    }
                    else{
                        response.data.forEach(user => {
                            if(user.follow){
                                const splice = response.data.splice(response.data.indexOf(user),1)
                                response.data.splice(0,0,splice[0])
                                console.log(response.data)
                            }
                        })
                        console.log(response.data)
                        setUsers(response.data)
                    }
                })
        }
        else {
            setUsers([])
        }
    }, [search, URL])

    return visible ? (
        <SearchWindow>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <DebounceInput minLength={3} debounceTimeout={300} type="text" placeholder="Search for people" onChange={(e) => {
                    setSearch({ name: e.target.value })
                }} />
            </SearchForm>
            {
                search.name.length >= 3 ?
                    <UsersProfile>
                        {users.length > 0 ?
                            users.map((user, index) => {
                                return (
                                    <SearchProfile onClick={() => {
                                        setSearch({ name: "" })
                                        DebounceInput.value = ""
                                        navigate(`/user/${user.id}`)
                                    }} key={index}>
                                        <img src={user.avatar} alt="avatar" />
                                        <p>{user.name.length > 20 ? user.name.slice(0, (user.name.length - 20) * -1) + "..." : user.name}</p>
                                        {user.follow ? <li>following</li> : null}
                                        {() => setLoading(false)}
                                    </SearchProfile>
                                )
                            })
                            : loading ? <Loader><TailSpin color="black" /></Loader>
                                : <NotFound> NOT FOUND 404 ;-;</NotFound>
                        }
                    </UsersProfile>
                    : null
            }
        </SearchWindow>
    ) : <></>
}


const SearchWindow = styled.div`
    position: fixed;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    z-index: 1;

    @media (max-width: 700px) {
        position: absolute;
        top: 80px;
        z-index: 0;
    }
`

const SearchForm = styled.form`
    width: 40vw;
    height: 35px;
    margin-bottom: -11px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 700px) {
        width: 95vw;
    }

    input{
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0px none;
        border-radius: 8px;
        background-color: #FFFFFF;
        font-family: Lato;
        font-size: 19px;
        background: url("https://static.thenounproject.com/png/101791-200.png") white no-repeat right;;
        background-size: 25px;
        background-position: 98%;
        padding-left: 10px;
    }
`

const SearchProfile = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 17px;
    font-size: 19px;
    width: 90%;
    height: auto;

    :hover {
        cursor: pointer;
        background-color: white;
        border-radius: 8px;
    }
    
    img{
        width: 39px;
        height: 39px;
        border-radius: 85px;
        margin-right: 12px;
    }

    li{
        margin-left: 10px;
        color: #C5C5C5;
    }
`

const UsersProfile = styled.div`
    background-color:#E7E7E7;
    border-radius: 8px;
    padding-top: 15px;
    padding-bottom: 23px;
    height: auto;
    font-family: Lato;

    @media (max-width: 700px) {
        width: 95vw;
    }
`

const NotFound = styled.p`
    text-align: center;
`

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`