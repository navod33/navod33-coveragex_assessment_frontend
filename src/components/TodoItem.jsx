import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import useTodo from "../hooks/useTodo";


const TodoItem = ({ todo }) => {
  const { markTodoAsDone } = useTodo();

  return (
    <Card sx={{ marginBottom: 2, backgroundColor: "#e0e0e0", borderRadius: 2 }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={9}>
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "left" }}>
              {todo.name}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {todo.description}
            </Typography>
          </Grid>

          <Grid item>
            <Button 
              variant="outlined" 
              onClick={() => markTodoAsDone(todo.id)}
              sx={{ 
                borderRadius: 4, 
                textTransform: "none", 
                color: "black", 
                borderColor: "black",
              
              }}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
