import { Form } from './Components/Form'
import { Leaderboard } from './Components/Leaderboard'
import { Header } from './Components/Header';
import { Navbar } from './Components/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="px-6 py-20 text-center text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
        <Header/>
        <Form/>
        <Leaderboard/>
      </div>
    </div>
  );
}

export default App;
