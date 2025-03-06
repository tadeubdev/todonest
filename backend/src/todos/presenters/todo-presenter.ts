export class TodoPresenter {
  static toResponse(
    todo: {
      _id: string;
      title: string;
      description: string;
      completed: boolean;
      __v: number;
    } | null,
  ) {
    if (!todo) return null;
    return {
      id: todo._id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
  }
}
