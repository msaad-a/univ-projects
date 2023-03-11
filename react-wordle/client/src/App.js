import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './react_component/Login/Login';
import RegularHome from './react_component/Home/RegularHome';
import AdminHome from './react_component/Home/AdminHome';
import SoloOptions from './react_component/SoloOptions'
import Lobby from './react_component/Multi/Lobby'
import MultiSelection from './react_component/Multi/MultiSelection';
import LobbySettings from './react_component/Multi/LobbySettings';
import SoloGameCover from './react_component/Game/SoloGameCover';
import MultiGame from './react_component/Game/MultiGame';
import MultiGameCover from './react_component/Game/MultiGameCover'
import ProfilePage from './react_component/Profile/ProfilePage';
import Signup from './react_component/Login/Signup';

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
  state = {
    currentUser: '',
    logReg: false,
    logAdm: false
  }

  handleLogin = (logReg, logAdm) => {

    this.setState({
      logReg,
      logAdm
    })
    
  }

  render() {
    return (
        <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (!this.state.logReg && !this.state.logAdm ?<Login app = {this} islogin={this.handleLogin}/>
                              :this.state.logReg ?<RegularHome islogin={this.handleLogin}/>
                              :this.state.logAdm?<AdminHome islogin={this.handleLogin}/>:<Login islogin={this.handleLogin}/> )}/>
            <Route exact path='/Signup' render={() => 
                            (<Signup />)}/>
            <Route exact path='/SoloOptions' render={() => 
                            (<SoloOptions />)}/>
            <Route exact path='/SoloGame' render={() => 
                            (<SoloGameCover />)}/>
            <Route exact path='/multi' render={() => 
                            (<MultiSelection />)}/>
            {/* <Route exact path='/lobby' render={() => 
                            (<Lobby />)}/> */}
            <Route exact path='/lobbySettings' render={() => 
                            (<LobbySettings />)}/>
            <Route exact path='/multiGame' render={() => 
                            (<MultiGameCover />)}/>
            <Route exact path='/profile' render={() => 
                            (<ProfilePage currentUser = {this.currentUser}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
