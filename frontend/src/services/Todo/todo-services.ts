import { api } from "../api";

export const fetchTodosService = async () => {
  return new Promise((resolve, reject) => {
    api.get('/todos')
      .then((response) => {
        const todos = response.data;
        resolve(todos);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Error fetching todos';
        reject(message);
      });
  });
};

export const addTodoService = async (todo: { title: string; description: string }) => {
  return new Promise((resolve, reject) => {
    api.post('/todos', todo)
      .then((response) => {
        const newTodo = response.data;
        resolve(newTodo);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Error adding todo';
        reject(message);
      });
  });
};

export const removeTodoService = async (id: string) => {
  return new Promise((resolve, reject) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Error removing todo';
        reject(message);
      });
  });
};

export const toggleTodoService = async (id: string, completed: boolean) => {
  return new Promise((resolve, reject) => {
    api.patch(`/todos/${id}`, { completed })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Error toggling todo';
        reject(message);
      });
  });
};
