import { defineStore } from "pinia";
import type { TodoItemEnum } from "../enums/Todos/TodoItemEnum";
import { addTodoService, fetchTodosService, removeTodoService, toggleTodoService } from "../services/Todo/todo-services";

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
    addTodo(text: string) {
      return new Promise((resolve, reject) => {
        const newTodo = {
          title: text,
          description: '',
        };
        addTodoService(newTodo)
          .then((data: any) => {
            this.todos.unshift({
              ...data,
              loading: false,
            });
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          })
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
        const completed = !this.todos[todoIndex].completed;
        toggleTodoService(id, completed)
          .then(() => {
            this.todos[todoIndex].completed = completed;
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
