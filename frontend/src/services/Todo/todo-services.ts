export const fetchTodosService = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = [
        { id: '1', title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false, loading: false },
        { id: '2', title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: false, loading: false },
        { id: '3', title: 'Tarefa 3', description: 'Descrição da tarefa 3', completed: false, loading: false },
        { id: '4', title: 'Tarefa 4', description: 'Descrição da tarefa 4', completed: false, loading: false },
        { id: '5', title: 'Tarefa 5', description: 'Descrição da tarefa 5', completed: false, loading: false },
        { id: '6', title: 'Tarefa 6', description: 'Descrição da tarefa 6', completed: false, loading: false },
        { id: '7', title: 'Tarefa 7', description: 'Descrição da tarefa 7', completed: false, loading: false },
        { id: '8', title: 'Tarefa 8', description: 'Descrição da tarefa 8', completed: false, loading: false },
        { id: '9', title: 'Tarefa 9', description: 'Descrição da tarefa 9', completed: false, loading: false },
        { id: '10', title: 'Tarefa 10', description: 'Descrição da tarefa 10', completed: false, loading: false },
      ];
      resolve(todos);
    }, 500);
  });
};

export const removeTodoService = async (id: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const toggleTodoService = async (id: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
