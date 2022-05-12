import './styles/App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import CoinList from './views/CoinList'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='coin-list' element={<CoinList />}></Route>
    </Routes>
  );
}

export default App;
