import { BrowserRouter, Routes, Route } from "react-router-dom";
import Likes from "../Likes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/likes" element={<Likes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
