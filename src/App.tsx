import { RootState } from "app/constants";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Contacts from "./routes/Contacts/Contacts";
import Home from "./routes/Home/Home";

type ProtectedPathProps = {
  isAuthed: boolean;
  children: React.ReactElement;
};

const ProtectedPath = ({ isAuthed, children }: ProtectedPathProps) => {
  if (!isAuthed) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const isAuthed = useSelector<RootState>(
    (state) => state.data.isAuthed
  ) as boolean;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/contacts"
        element={
          <ProtectedPath isAuthed={isAuthed}>
            <Contacts />
          </ProtectedPath>
        }
      />
    </Routes>
  );
}

export default App;
