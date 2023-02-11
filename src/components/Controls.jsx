import { useContext } from 'react';
import App, { AppContext } from '../App';

function Controls() {
  const {
    generateNumbers,
    maxValue,
    delay,
    totalValues,
    setMaxValue,
    setDelay,
    setTotalValues,
    setNumbers,
    unsortedNumbers,
    sorted,
    setSorted,
    sorting,
    setSorting,
    graphHeight,
    setGraphHeight,
  } = useContext(AppContext);

  let arr;

  const onSubmit = () => {
    if (sorting) return;
    if (maxValue <= 0) return;
    generateNumbers();
  };

  const callSort = async (type) => {
    if (sorting) return;
    setSorting(true);
    if (sorted) setNumbers([...unsortedNumbers]);
    arr = [...unsortedNumbers];
    switch (type) {
      case 'quick':
        quickCaller();
        break;
      case 'bubble':
        bubbleSort();
        break;
      case 'merge':
        mergeCaller();
        break;
      case 'insertion':
        insertionSort();
        break;
      case 'selection':
        selectionSort(arr.length);
        break;
      case 'heap':
        heapSort(arr.length);
        break;
      default:
        return;
    }

    setNumbers([...arr]);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const swap = (l, m) => {
    let temp = arr[l];
    arr[l] = arr[m];
    arr[m] = temp;
  };

  const pause = async () => {
    setNumbers([...arr]);
    await sleep(delay);
  };

  const merge = async (l, m, r) => {
    let i, j, k;

    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        await pause();
        i++;
      } else {
        arr[k] = R[j];
        await pause();
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      await pause();
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      await pause();
      j++;
      k++;
    }
  };

  const mergeCaller = async () => {
    await mergeSort(0, arr.length - 1);

    setSorted(true);
    setSorting(false);
  };

  const quickCaller = async () => {
    await quickSort(0, arr.length - 1);

    setSorted(true);
    setSorting(false);
  };

  const mergeSort = async (l, r) => {
    if (l < r) {
      let m = l + parseInt((r - l) / 2);

      await mergeSort(l, m);
      await mergeSort(m + 1, r);
      await merge(l, m, r);
    }
  };

  const quickSort = async (first, last) => {
    if (first < last) {
      let mid = parseInt((first + last) / 2);
      let pivot = arr[mid];
      swap(mid, first);
      await pause();
      let lo = first;
      let hi = last;
      while (lo < hi) {
        if (arr[lo + 1] > pivot && arr[hi] < pivot) {
          swap(lo + 1, hi);
          await pause();
          lo++;
          hi--;
        }
        if (arr[lo + 1] <= pivot) lo++;
        if (arr[hi] >= pivot) hi--;
      }
      swap(first, lo);
      await pause();
      if (lo < mid) {
        await quickSort(first, lo - 1);
        await quickSort(lo + 1, last);
      } else {
        await quickSort(lo + 1, last);
        await quickSort(first, lo - 1);
      }
    }
  };

  const insertionSort = async () => {
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      while (j > 0 && arr[j - 1] > arr[j]) {
        swap(j, j - 1);
        await pause();
        j--;
      }
    }

    setSorted(true);
    setSorting(false);
  };

  const selectionSort = async (n) => {
    for (let i = 0; i < n - 1; i++) {
      let smallest = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[smallest]) {
          smallest = j;
        }
      }

      if (smallest != i) {
        swap(smallest, i);
        await pause();
      }
    }

    setSorted(true);
    setSorting(false);
  };

  const heapify = async (N, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < N && arr[left] > arr[largest]) largest = left;

    if (right < N && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
      swap(i, largest);
      heapify(N, largest);
    }
  };

  const heapSort = async (N) => {
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
      heapify(N, i);
      await pause();
    }

    for (let i = N - 1; i >= 0; i--) {
      swap(0, i);
      await pause();
      heapify(i, 0);
    }

    setSorted(true);
    setSorting(false);
  };

  const bubbleSort = async () => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(j, j + 1);
          await pause();
        }
      }
    }

    setSorted(true);
    setSorting(false);
  };

  return (
    <section className="bg-slate-300 dark:bg-slate-800 p-4 rounded-lg mb-4">
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('merge')}
        >
          Merge Sort
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('quick')}
        >
          Quick Sort
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('insertion')}
        >
          Insertion Sort
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('selection')}
        >
          Selection Sort
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('heap')}
        >
          Heap Sort
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => callSort('bubble')}
        >
          Bubble Sort
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label
          htmlFor="totalValues"
          className="text-l text-slate-700 dark:text-white"
        >
          # of Values ({totalValues})
        </label>
        <input
          type="range"
          id="totalValues"
          name="totalValues"
          max="1000"
          min="1"
          value={totalValues}
          onChange={(e) => setTotalValues(e.target.value)}
          className="mb-4 w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />

        <label htmlFor="playDelay" className="text-l dark:text-white">
          Playback Delay ({delay}ms)
        </label>
        <input
          type="range"
          id="playDelay"
          name="playDelay"
          min="0"
          max="100"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          className="mb-4 w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />

        <label htmlFor="maxValue" className="text-l dark:text-white">
          Max Value ({maxValue})
        </label>
        <input
          type="range"
          id="maxValue"
          name="maxValue"
          max="1000"
          min="2"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          className="mb-4 w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />

        <label htmlFor="graphHeight" className="text-l dark:text-white">
          Graph Height ({graphHeight}px)
        </label>
        <input
          type="range"
          id="graphHeight"
          name="graphHeight"
          min="200"
          max="800"
          value={graphHeight}
          onChange={(e) => setGraphHeight(e.target.value)}
          className="mb-4 w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />
      </div>
      <div>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 w-full rounded-full justify-center flex mx-auto text-2xl"
          onClick={onSubmit}
        >
          Get New Values 🌟
        </button>
      </div>
    </section>
  );
}

export default Controls;
