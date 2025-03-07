import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoPresenter } from './presenters/todo-presenter';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const presenter: TodoPresenter =
      await this.todosService.create(createTodoDto);
    return presenter.toResponse();
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    let pageNumber = 1;
    let limitNumber = 10;
    // check if page and limit are filled, if true, check if page and limit are valid numbers
    if (page && limit) {
      pageNumber = parseInt(page, 10);
      limitNumber = parseInt(limit, 10);
      if (isNaN(pageNumber) || isNaN(limitNumber)) {
        throw new HttpException(
          'Invalid page or limit',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return this.todosService.findAll(pageNumber, limitNumber).then((todos) => {
      return todos.map((todo) => todo.toResponse());
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id).then((todo) => {
      if (!todo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return todo.toResponse();
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
