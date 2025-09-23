import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import SinglePlayer from "./pages/SinglePlayer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Problem from "./pages/Problem"
import MultiPlayer from "./pages/MultiPlayer"
import RoomPage from "./pages/RoomPage"
import Problemset from "./pages/Problemset"
import GameFinishPage from "./pages/GameFinishPage"
import PageNotFound from "./pages/NotFound"
import './App.css'
import { UserProvider } from "./utils/userProvider"

function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="SinglePlayer" element={<SinglePlayer />} />
          <Route path="MultiPlayer" element={<MultiPlayer />} />
          <Route path="room/:roomId" element={<RoomPage />} />
          <Route path="room/:roomId/problemset/team/:teamId" element={<Problemset />} />
          <Route path="room/:roomId/problems/:problemId/team/:teamId" element={<Problem />} />
          <Route path="room/:roomId/results" element={<GameFinishPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
