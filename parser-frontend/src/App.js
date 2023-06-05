import { Form } from './Components/Form'
import { Leaderboard } from './Components/Leaderboard'
function App() {
  return (
    <div className="App">
      <div
        className="px-6 py-20 text-center text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
        <h1 className="mb-6 text-7xl font-bold">Resume Parser</h1>
        <h3 className="mb-8 text-4xl font-light">Find your ideal recruit</h3>
       <Form/>
       <Leaderboard/>
      </div>
    </div>
  );
}

export default App;
