//import logo from './logo.svg';
import './App.css';
import Routes from './routes';

function App() {
  let userIsValid = false;
  function validateUserWallet() {
    if(window.ethereum){
      userIsValid = true;
    }
  }
  validateUserWallet();
  return  (

      <Routes userIsValid={userIsValid}/>

    //(
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  //);
  );
}



export default App;