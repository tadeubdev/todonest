import { HttpCode, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoModel.create(createTodoDto);
  }

  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.todoModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  findOne(_id: string) {
    return this.todoModel.findOne({ _id });
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
