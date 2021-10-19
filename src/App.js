import datasource from "./data.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";

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
  
  return (
   <ul> 
      {queryString&&queryString.map((item,i) => (
         <li key={i}>{item.todo}  {item.done}</li>  
      ))
     }
    </ul>
  );
}

export default App;





