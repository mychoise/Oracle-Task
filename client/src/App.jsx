import React from 'react'
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import KanbanBoard from "./pages/KanbanBoard.jsx";
import Register from "./pages/Register.jsx";
import {Route, Routes} from "react-router-dom";;

const App = () => {
    return (

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/kanban-board" element={<KanbanBoard />} />
            </Routes>

    )
}
export default App
