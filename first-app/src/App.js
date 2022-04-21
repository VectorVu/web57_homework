// import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import './Dropdown.css';
import Dropdown from './components/Dropdown';
function App() {
  return (
    <div className="App">
      <Button label="Button1" size="small"/>
      <Button label="Button2" size="medium" backgroundColor="#CC66FF" primary={true}/>
      <Button label="Button3" size="large" backgroundColor="#FF9900" primary={true}/>
      <Dropdown options={["Proifle", "Layer","Contact"]}/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
