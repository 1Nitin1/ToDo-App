import Heading from "./Components/Heading"
import Input from "./Components/Input";
import Item1 from "./Components/Item1";
import './App.css'
import Container from "./Components/Container";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react"
function App() {
  let savedList = localStorage.getItem("MyList");
  let [originalList, setList] = useState(
    savedList ? JSON.parse(savedList) : []   // fallback to empty array
  );

  let addElement = (text, date) => {
    let newObj = { text, date };
    let list = [...originalList, newObj];
    localStorage.setItem("MyList", JSON.stringify(list));
    setList(list);
  };

  let delElement = (text, date) => {
    let index = originalList.findIndex(
      (item) => item.text === text && item.date === date
    );
    let newArr = [...originalList];
    if (index !== -1) newArr.splice(index, 1);
    localStorage.setItem("MyList", JSON.stringify(newArr));
    setList(newArr);
  };

  return (
    <Container>
      <Heading />
      <Input addElement={addElement} />
      {originalList.map((item, index) => (
        <Item1
          key={index}
          text={item.text}
          date={item.date}
          delElement={delElement}
        />
      ))}
      <Analytics/>
    </Container>
  );
}

export default App;
