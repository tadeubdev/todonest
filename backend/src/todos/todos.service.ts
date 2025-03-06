import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private catModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.catModel.create(createTodoDto);
  }

  findAll() {
    return this.catModel.find();
  }

  findOne(_id: string) {
    return this.catModel.findOne({ _id });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: string) {
    return `This action removes a #${id} todo`;
  }
}
