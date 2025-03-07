/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export class TodoPresenter {
  constructor(private readonly todo: any) {}

  toResponse() {
    if (!this.todo) return null;
    return {
      id: this.todo._id,
      title: this.todo.title,
      description: this.todo.description,
      completed: this.todo.completed,
      createdAt: this.todo.createdAt,
      updatedAt: this.todo.updatedAt,
    };
  }
}
