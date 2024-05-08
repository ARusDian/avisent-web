import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Log from "./Pages/Log";
import Addturret from "./Pages/Addturret";
import Addaccount from "./Pages/Addaccount";
import Index from "./Pages/Index";
import Formturret from "./Pages/Formturret";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/addturret" element={<Addturret />} />
        <Route path="/addaccount" element={<Addaccount />} />
        <Route path="/formturret" element={<Formturret />} />

        {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* <Route path="/turret" element={<Layout />}>
          <Route index element={<IndexTurret />} />
          <Route path="/create" element={<CreateTurret />} />
          <Route path="/edit/:id" element={<EditTurret />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
