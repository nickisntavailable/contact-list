import { getData } from "app/actions/actionData";
import { RootState } from "app/constants";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);

  const isAuthed = useSelector<RootState>((state) => state.data.isAuthed);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      navigator("/contacts");
    }
  }, [isAuthed, navigator]);

  const submitHandler = () => {
    setDelay(0);
    if (name.length === 0 || password.length === 0) {
      setDelay(window.setTimeout(() => setDelay(0), 2000));
    }
    dispatch(getData({ name, password }));
  };
  const isReadyToSubmit = name.length !== 0 && password.length !== 0;
  return (
    <div className="home">
      <h1>Authorization</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className={isReadyToSubmit ? "home-submit active" : "home-submit"}
        onClick={submitHandler}
      >
        Submit
      </button>
      <p className={delay ? "home-disclaimer active" : "home-disclaimer"}>
        There must be empty field or fields
      </p>
    </div>
  );
};

export default Home;
