import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import Edit from './views/Edit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = '/edit'>
          <Edit />
        </Route>
        <Route path = '/login'>
          <Login />
        </Route>
        <Route path = '/register'>
          <Register />
        </Route>
        <Route exact path ='/'>
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
