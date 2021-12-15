import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Layout } from './layout/Layout'; 
import { Start } from './pages/Start';
import { EditClient } from './pages/EditClient';
import { ViewClient } from "./pages/ViewClient"
import { NewClient } from './pages/NewClient'; 

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path = "/clients" element = {<Layout />}>
          <Route index element = {<Start />} />
          <Route path = "clients/new" element = {<NewClient />} />
          <Route path = "clients/edit/:id" element = {<EditClient />} />
          <Route path = "clients/:id" element = {<ViewClient />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
