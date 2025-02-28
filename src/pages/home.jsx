import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useState, useEffect } from "react";
import { Container, Grid, Divider, Box } from "@mui/material";
import useTodo from "../hooks/useTodo";

const Home = () => {    
  const { createTodo, fetchTodos, todos } = useTodo();

  //refetch the data
  useEffect(() => {
    fetchTodos();
  }, [todos]); 

  const handleAddTodo = async (newTodo) => {
    await createTodo(newTodo);  
    fetchTodos();  
  };

  return (
    <Container sx={{ my: 4, mx: 2 }}>
      <Grid container spacing={1} alignItems="start" justifyContent="center">
        <Grid item xs={12} md={5}>
          <TodoForm addTodo={handleAddTodo} />
        </Grid>

        {/* <Grid item xs={12} md={1}>
          <Box
            sx={{
              height: "100%",
              width: "2px",
              backgroundColor: "black",
              mx: "auto",
            }}
          />
        </Grid> */}

        <Grid item xs={12} md={6}>
          <TodoList todos={todos} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
