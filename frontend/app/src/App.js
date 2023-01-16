import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Search from "./routes/Search";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routers