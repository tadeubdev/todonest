import { defineStore } from "pinia";
import type { TodoItemEnum } from "../enums/Todos/TodoItemEnum";
import { fetchTodosService, removeTodoService, toggleTodoService } from "../services/Todo/todo-services";

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as TodoItemEnum[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    fetchTodosList() {
      this.loading = true;
      this.error = null;

      fetchTodosService()
        .then((data) => {
          this.todos = (data as TodoItemEnum[]).map((todo) => ({
            ...todo,
            loading: false,
          }));
        })
        .catch((error) => {
          this.error = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeTodo(id: string) {
      return new Promise((resolve, reject) => {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
          return reject(new Error('Todo not found'));
        }
        this.todos[todoIndex].loading = true;
        removeTodoService(id)
          .then(() => {
            this.todos = this.todos.filter(todo => todo.id !== id);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    toggleTodo(id: string) {
      return new Promise((resolve, reject) => {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
          return reject(new Error('Todo not found'));
        }
        this.todos[todoIndex].loading = true;
        toggleTodoService(id)
          .then(() => {
            this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.todos[todoIndex].loading = false;
          });
      });
    },
  },
});
