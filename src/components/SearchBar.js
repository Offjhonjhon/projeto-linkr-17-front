import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { DebounceInput } from 'react-debounce-input'
import { useNavigate } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import StateContext from '../contexts/StateContext.js'
import styled from "styled-components"

export default function SearchBar(){
    const navigate = useNavigate()
    const { visible } = useContext(StateContext)
    const [search, setSearch] = useState({name: ""})
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        setLoading(true)
        if(search.name.length >=3){
            setUsers([])
            axios
            .post("http://localhost:4000/search",search)
            .then(response => {
                setUsers(response.data)
                if(response.data.length === 0){
                    setLoading(false)
                }
            })
        }
        else{
            setUsers([])
        }
    },[search])

    return visible ? (
        <SearchWindow>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <DebounceInput minLength={3} debounceTimeout={300} type="text" placeholder="Search for people" onChange={(e) => {
                    setSearch({name: e.target.value})
                    }} />
            </SearchForm>
            {   
                search.name.length >=3 ?
                <UsersProfile>
                    {users.length > 0 ?
                        users.map((user,index) => {
                            return (
                                <SearchProfile onClick={() => {
                                    setSearch({name: ""})
                                    DebounceInput.value = ""
                                    navigate(`/user/${user.id}`)
                                    }} key={index}>
                                    <img src={user.avatar} alt="avatar"/>
                                    <p>{user.name.length > 20 ? user.name.slice(0, (user.name.length - 20)*-1) + "...": user.name}</p>
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
    ): <></>
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
    width: 100%;
    height: auto;
    
    img{
        width: 39px;
        height: 39px;
        border-radius: 85px;
        margin-right: 12px;
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