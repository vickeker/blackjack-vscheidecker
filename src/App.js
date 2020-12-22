import {Banner} from 'common/components';
import {Main} from 'core/Main';
import 'App.css';

function App() {
  return (
    <div className="App">
      <Banner style={{top:"0"}} text='Blackjack game from vscheidecker'></Banner>
      <Main></Main>
      <Banner style={{bottom:"0"}} text='Have fun!'></Banner>
    </div>
  );
}

export default App;
