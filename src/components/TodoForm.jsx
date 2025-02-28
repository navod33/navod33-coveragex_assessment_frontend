import React, { useState, useEffect } from "react";
import Joi from "joi";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import useTodo from "../hooks/useTodo";

const TodoForm = () => {
  const { createTodo, loading, error } = useTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  // Joi Schema for validation
  const schema = Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required.",
    }),
    description: Joi.string().allow("").optional(),
  });


  // Handle form submission
  const handleSubmit = async () => {
    const { error: validation } = schema.validate(
      { title, description },
      { abortEarly: false }
    );

    if (validation) {
      setValidationError(validation.details[0].message);
      return;
    }

    setValidationError(""); 

    try {

     await createTodo({ name: title, description, isDone: false });

      setTitle(""); 
      setDescription("");
    } catch (err) {
      console.error("Failed to create todo", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "bold" }}>
            Add a Task
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!validationError}
            helperText={validationError}
            disabled={loading}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff", 
                "& fieldset": {
                  borderColor: "#ccc", 
                },
                "&:hover fieldset": {
                  borderColor: "#888", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", 
                  boxShadow: "0px 4px 8px rgba(25, 118, 210, 0.3)", 
                },
              },
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff", 
                "& fieldset": {
                  borderColor: "#ccc", 
                },
                "&:hover fieldset": {
                  borderColor: "#888", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", 
                  boxShadow: "0px 4px 8px rgba(25, 118, 210, 0.3)", 
                },
              },
            }}
          />
        </Grid>

        <Grid item display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{width: "100px", borderRadius: "12px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </Grid>

        {error && (
          <Grid item>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TodoForm;
