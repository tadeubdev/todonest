import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoPresenter } from './presenters/todo-presenter';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodoModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([
      {
        _id: '1',
        title: 'Test Todo 1',
        description: 'Description 1',
        completed: false,
      },
    ]),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    };
    const createdTodo = {
      id: '1',
      ...createTodoDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTodoModel.create.mockResolvedValue(createdTodo);
    void expect(service.create(createTodoDto)).resolves.toBeInstanceOf(
      TodoPresenter,
    );
  });

  it('should find all todos with pagination', async () => {
    const page = 1;
    const limit = 5;

    const result = await service.findAll(page, limit);

    expect(mockTodoModel.find).toHaveBeenCalled();
    expect(mockTodoModel.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(mockTodoModel.skip).toHaveBeenCalledWith(0);
    expect(mockTodoModel.limit).toHaveBeenCalledWith(5);
    expect(mockTodoModel.exec).toHaveBeenCalled();

    expect(result[0]).toBeInstanceOf(TodoPresenter);
  });

  it('should find a todo by id', () => {
    const todo = { _id: '1', title: 'Test Todo' };
    mockTodoModel.findOne.mockResolvedValue(todo);
    void expect(service.findOne('1')).resolves.toBeInstanceOf(TodoPresenter);
    expect(mockTodoModel.findOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should throw an error if todo not found', () => {
    mockTodoModel.findOne.mockResolvedValue(null);
    void expect(service.findOne('1')).rejects.toThrow('Todo not found');
    expect(mockTodoModel.findOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should update a todo and return http status code 204 - no content', () => {
    const updateTodoDto = { title: 'Updated Todo' };
    const updatedTodo = { _id: '1', ...updateTodoDto };
    mockTodoModel.findOneAndUpdate.mockResolvedValue(updatedTodo);
    void expect(service.update('1', updateTodoDto)).resolves.toBeUndefined();
    expect(mockTodoModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: '1' },
      { $set: updateTodoDto },
      { new: true },
    );
  });

  it('should remove a todo and remove http status code 204', () => {
    const todoId = '1';
    mockTodoModel.findOneAndDelete.mockResolvedValue(null);
    void expect(service.remove(todoId)).resolves.toBeUndefined();
  });
});
