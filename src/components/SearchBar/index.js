import axios from "axios"
import { useEffect, useState } from "react"
import { DebounceInput } from 'react-debounce-input'
import styled from "styled-components"

export default function SearchBar(){
    const [search, setSearch] = useState({name: ""})
    const [users, setUsers] = useState([])

    useEffect(() =>{
        if(search.name.length >=3){
            axios
            .post("http://localhost:4000/search",search)
            .then(response => {
                setUsers(response.data)
            })
        }
    },[search])
    return(
        <SearchWindow>
            <SearchForm>
                <DebounceInput minLength={3} debounceTimeout={300} type="text" placeholder="Search for people" onChange={(e) => {
                    setSearch({name: e.target.value})
                    }} />
            </SearchForm>
            {   
                search.name.length >=3 ?
                <UsersProfile>
                    {users.length > 0 ?
                        users.map((user,index) => {
                            return(
                                <SearchProfile key={index}>
                                    <img src={user.avatar} alt="avatar"/>
                                    <p>{user.name}</p>
                                </SearchProfile>
                            )
                        })
                        : <NotFound>NOT FOUND 404 ;-;</NotFound>
                    }
                </UsersProfile>
                : null
            }
        </SearchWindow>
    )
}


const SearchWindow = styled.div`
    position: fixed;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
`

const SearchForm = styled.form`
    width: 50vw;
    height: 5vh;
    margin-bottom: -10px;

    input{
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0px none;
        border-radius: 8px;
        background-color: #FFFFFF;
        font-family: Lato;
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
`

const NotFound = styled.p`
    text-align: center;
`