import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const text = "Lorem Ipsum is simply";

  const [currText, setCurrText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const savedCb = useRef(null);
  const [id, setId] = useState(null);

  const cb = useCallback(() => {
    console.log(id);
    if (index === text.length) {
      console.log(id);
      clearInterval(id);
      setId(null);
      setCurrText("");
      setIndex(0);
      setHasStarted(false);
      return;
    }
    const newIndex = index;
    setCurrText((prev) => prev + text[newIndex]);
    setIndex((prev) => prev + 1);
  }, [index, currText, id]);

  const onClick = useCallback(() => {
    console.log(hasStarted);
    if (hasStarted) return;

    function start() {
      setHasStarted(true);
      if (savedCb.current) savedCb.current();
    }
    const id = setInterval(start, 200);
    setId(id);
  }, [hasStarted]);

  useEffect(() => {
    savedCb.current = cb;
  });

  useEffect(() => {
    return () => {};
  }, []);
  console.log(id);
  return (
    <div className="App">
      <button onClick={onClick}>Start Typing Effect</button>
      <div>{currText}</div>
    </div>
  );
}
