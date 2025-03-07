import { HttpCode, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { TodoPresenter } from './presenters/todo-presenter';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const model = await this.todoModel.create(createTodoDto);
    return new TodoPresenter(model);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const models = await this.todoModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return models.map((model) => new TodoPresenter(model));
  }

  async findOne(_id: string) {
    const model = await this.todoModel.findOne({ _id });
    if (!model) {
      throw new Error('Todo not found');
    }
    return new TodoPresenter(model);
  }

  update(_id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findOneAndUpdate(
      { _id },
      { $set: updateTodoDto },
      { new: true },
    );
  }

  @HttpCode(204)
  async remove(_id: string) {
    await this.todoModel.findOneAndDelete({ _id });
  }
}
