import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routers