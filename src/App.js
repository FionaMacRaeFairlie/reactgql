import datasource from "./data.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import AddTodo from "./addData"

function App() {
  let [queryString, setQueryString] = useState("");

  const fetchData = useCallback(() => {
   const queryText = JSON.stringify(query);

    fetch(datasource.baseURL, {
      method: "POST",
      headers: datasource.headers,
      body: queryText,
    }).then((response) => response.json())
      .then((data) => {
        const datalist = data.data.list;
        setQueryString(datalist);
        console.log(datalist);
        console.log(datalist[0].todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  const handleClick = useCallback(() => {
    const queryText = JSON.stringify(query);
 
     fetch(datasource.baseURL, {
       method: "POST",
       headers: datasource.headers,
       body: queryText,
     }).then((response) => response.json())
       .then((data) => {
         const datalist = data.data.list;
         setQueryString(datalist);
         console.log(datalist);
         console.log(datalist[0].todo);
       })
       .catch((err) => {
         console.log(err);
       });
   }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]); 


  return (
  <div>
    <AddTodo />

   <ul> 
      {queryString&&queryString.map((item,i) => (
         <li key={i}>{item.todo}  {item.done}</li>  
      ))
     }
    </ul>
    <button id="update" onClick={handleClick}>Update</button>
    <button id="clear">Clear all</button>

    </div>
  );
}

export default App;





