import axios from "axios"
import { useState } from "react"
import { DebounceInput } from 'react-debounce-input';

export default function SearchBar(){
    const [search, setSearch] = useState({name: ""})
    if(search.name.length >= 3){
        axios
        .post("http://localhost:4000/search",search)
        .then(response => console.log(response))
    }
    return(
        <>
            <div>
                <form>
                    <DebounceInput minLength={3} debounceTimeout={300} type="text" placeholder="Search for people" onChange={(e) => setSearch({name: e.target.value})} />
                </form>
            </div>
        </>
    )

}