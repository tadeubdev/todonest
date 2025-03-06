import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodoModel = {
    exists: jest.fn(),
    create: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnValue([]),
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
      _id: '1',
      ...createTodoDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTodoModel.exists.mockResolvedValue(false);
    mockTodoModel.create.mockResolvedValue(createdTodo);
    void expect(service.create(createTodoDto)).resolves.toEqual(createdTodo);
  });

  it('should find all todos', () => {
    const todos = [
      { _id: '1', title: 'Test Todo 1' },
      { _id: '2', title: 'Test Todo 2' },
    ];
    mockTodoModel.find.mockResolvedValue(todos);
    void expect(service.findAll()).resolves.toEqual(todos);
  });

  it('should find a todo by id', () => {
    const todo = { _id: '1', title: 'Test Todo' };
    mockTodoModel.findOne.mockResolvedValue(todo);
    void expect(service.findOne('1')).resolves.toEqual(todo);
  });
});
