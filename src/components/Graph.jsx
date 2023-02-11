import { useEffect, useContext } from 'react';
import { AppContext } from '../App';

function Graph() {
  const { generateNumbers, numbers, highestValue, graphHeight, totalValues } =
    useContext(AppContext);

  let heightRatio = graphHeight / highestValue;

  useEffect(() => {
    generateNumbers(totalValues);
  }, []);

  return (
    <div
      className="flex graph mb-4 w-full rounded-t-2xl"
      style={{ height: `${graphHeight}px` }}
    >
      {numbers.map((number, index) => {
        return (
          <div
            key={index}
            className={`graph_item border-none dark:bg-blue-600 bg-blue-600 basis-full`}
            style={{
              height: `${number * heightRatio}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default Graph;
