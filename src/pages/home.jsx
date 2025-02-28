import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useState } from "react";
import { Container, Grid, Divider, Box } from "@mui/material";
import useTodo from "../hooks/useTodo";

const Home = () => {    
  const { createTodo, todos } = useTodo();

  return (
    <Container sx={{ my: 4, mx:2 }}>
      <Grid container spacing={1} alignItems="center" justifyContent="center" >
        <Grid item xs={12} md={5}>
          <TodoForm addTodo={createTodo} />
        </Grid>

        <Grid item xs={12} md={1}>
          <Box 
            sx={{ 
              height: "100%", 
              width: "2px", 
              backgroundColor: "black", 
              mx: "auto" 
            }} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TodoList todos={todos} />
        </Grid>
      </Grid>
    </Container>
  );    
};

export default Home;
