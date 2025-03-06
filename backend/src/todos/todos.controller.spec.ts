import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', () => {
    const createTodoDto = {
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    };
    const createdTodo = {
      id: '1',
      ...createTodoDto,
    };
    mockTodosService.create.mockResolvedValue(createdTodo);
    void expect(controller.create(createTodoDto)).resolves.toEqual(createdTodo);
  });

  it('should find all todos', () => {
    const todos = [
      { id: '1', title: 'Test Todo 1' },
      { id: '2', title: 'Test Todo 2' },
    ];
    mockTodosService.findAll.mockResolvedValue(todos);
    void expect(controller.findAll()).resolves.toEqual(todos);
  });

  it('should find a todo by id', () => {
    const todo = { id: '1', title: 'Test Todo' };
    mockTodosService.findOne.mockResolvedValue(todo);
    void expect(controller.findOne('1')).resolves.toEqual(todo);
  });
});
