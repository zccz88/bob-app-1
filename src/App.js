import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ChatList from "./pages/ChatList";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { isLoggedInUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/board" component={BoardPage} />
        <PrivateRoute path="/board/:boardId" component={BoardDetailPage} />
        <PrivateRoute path="/chatlist" component={ChatList} />
        <PrivateRoute path="/profile" component={ProfilePage} />
      </Router>
    </div>
  );
};

export default App;
