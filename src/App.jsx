import { createContext, useState } from 'react';
import Controls from './components/Controls';
import Footer from './components/Footer';
import Graph from './components/Graph';

export const AppContext = createContext();

function App() {
  const [numbers, setNumbers] = useState([]);
  const [totalValues, setTotalValues] = useState(50);
  const [unsortedNumbers, setUnsortedNumbers] = useState([]);
  const [delay, setDelay] = useState(20);
  const [maxValue, setMaxValue] = useState(500);
  const [highestValue, setHighestValue] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [graphHeight, setGraphHeight] = useState(450);

  const generateNumbers = () => {
    const arr = [];
    let highestValue = 1;
    for (let i = 0; i < totalValues; i++) {
      const rand = Math.floor(Math.random() * maxValue + 1);
      arr[i] = rand;
      if (rand > highestValue) highestValue = rand;
    }
    setHighestValue(highestValue);
    setNumbers([...arr]);
    setUnsortedNumbers([...arr]);
  };

  return (
    <main className="py-5 px-5 dark:bg-slate-900 bg-slate-100 min-h-screen">
      <AppContext.Provider
        value={{
          generateNumbers,
          numbers,
          setNumbers,
          totalValues,
          setTotalValues,
          unsortedNumbers,
          setUnsortedNumbers,
          sorted,
          setSorted,
          delay,
          setDelay,
          maxValue,
          setMaxValue,
          highestValue,
          setHighestValue,
          sorting,
          setSorting,
          graphHeight,
          setGraphHeight,
        }}
      >
        <Graph />
        <Controls />
        <Footer />
      </AppContext.Provider>
    </main>
  );
}

export default App;
