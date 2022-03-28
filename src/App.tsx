import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/styles';
import Footer from './components/Footer';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "var(--black)",
      color: "var(--white)",
      minHeight: "100vh"
    }
  }))

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
