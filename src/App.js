import NavBars from './components/NavBars';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import News from "./components/News";
import Weather from "./components/Weather";
import History from "./components/History";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" render={(history) => (<NavBars history={history}/>)} />
        <Switch>
            <Route path="/News" component={News} />
            <Route path="/Weather" component={Weather} />
            <Route path="/History" component={History} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
