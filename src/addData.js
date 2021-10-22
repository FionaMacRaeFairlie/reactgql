import datasource from "./data.js";
import { useEffect, useState, useCallback } from "react";

function AddTodo(todoString,onTodoAdd) {
  let [queryString, setQueryString] = useState("");


  const handleSubmit = useCallback((inputData) => {
   console.log(inputData);
   const dataQuery = {
    query: `
    mutation {addtodo(
        input: {todo:"${inputData}", 
          done:"false" }
      ){todo,done}}
      `,
};
   const queryText = JSON.stringify(dataQuery);
    fetch(datasource.baseURL, {
      method: "POST",
      headers: datasource.headers,
      body:queryText,
    }).then((response) => response.json())
    .then((data) => {
        const datalist = data.data.addtodo;
        setQueryString(datalist);
        console.log(datalist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);
  
  const handleSub = (event) => {
    event.preventDefault();
    const todo = document.getElementById("todo");
   handleSubmit(todo.value);
    todo.value="";
   } 

  return (

   <div> 
     <form id="addtodo" onSubmit={handleSub}>
  New item:<br/>
    <input id="todo" type="text"/>
    <input id="add" type="submit" value="Add"/>
  </form>
     
     {queryString.todo}
     
     
     </div>
  
     
  );
}

export default AddTodo;




