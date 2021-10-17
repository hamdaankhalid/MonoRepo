import './App.css';
import ProviderLanding from './pages/landing/ProviderLanding';
import ShopperLanding from './pages/landing/ShopperLanding';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppFooter from './components/Footer';
import Signup from './pages/authentication/Signup';
import Login from './pages/authentication/Login';
import ProviderHome from './pages/provider/ProviderHome';
import { ProtectedRoute } from './wrappers/ProtectedRoute'
import ProviderHistory from './pages/provider/ProviderHistory';
import ProviderProfile from './pages/provider/ProviderProfile';
import ShopperHome from './pages/shopper/ShopperHome';
import ShopperProviderPublished from './pages/shopper/ShopperProviderPublished';

function App() {


  return (
    <div className="App">

      <Router>
        <Switch>

          <Route exact path="/" component={ShopperLanding} />
          <Route exact path="/provider" component={ProviderLanding} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <ProtectedRoute exact path="/provider/home" authorizationGroup={'food_bank'} component={ProviderHome} />
          <ProtectedRoute exact path="/provider/profile" authorizationGroup={'food_bank'} component={ ProviderProfile } />
          <ProtectedRoute exact path="/provider/history" authorizationGroup={'food_bank'} component={ ProviderHistory } />

          <Route path="/shopper/home" component={ShopperHome} />
          <Route path="/shopper/provider/:id/items" component={ShopperProviderPublished} />
            

        </Switch>
      </Router>


      <AppFooter />
    </div>
  );

}

export default App;
