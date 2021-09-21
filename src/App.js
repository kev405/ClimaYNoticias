import NavBars from './components/NavBars';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux';
import generateStore from './store/store';
import News from "./components/News";
import Weather from "./components/Weather";
// import SelectCity from './components/SelectCity'
import History from "./components/History";

function App() {

  // const citySelected = useSelector(store => store.city.city)
  // console.log(citySelected)
  const store = generateStore();

  return (
    <div className="App">
      <Router>
        <Provider store={store}>
        <Route path="/" render={(history) => (<NavBars history={history}/>)} />
        <Redirect exact from="/" to="/News" />
        {/* <Route path="/News" render={(history) => (<NavBars history={history}/>)} /> */}
        <Switch>
            <Route path="/News" component={News} />
            <Route path="/Weather" component={Weather} />
            <Route path="/History" component={History} />
        </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
