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

  it('should find all todos with pagination', () => {
    const page = '1';
    const limit = '10';
    const todos = [
      { id: '1', title: 'Test Todo 1' },
      { id: '2', title: 'Test Todo 2' },
    ];
    mockTodosService.findAll.mockResolvedValue(todos);
    void expect(controller.findAll(page, limit)).resolves.toEqual(todos);
  });

  it('should find all todos without pagination', () => {
    const todos = [
      { id: '1', title: 'Test Todo 1' },
      { id: '2', title: 'Test Todo 2' },
    ];
    mockTodosService.findAll.mockResolvedValue(todos);
    void expect(controller.findAll()).resolves.toEqual(todos);
  });

  it('should throw an error if page or limit is not a valid number', () => {
    const invalidPage = 'invalid';
    const invalidLimit = 'invalid';
    void expect(() => controller.findAll(invalidPage, invalidLimit)).toThrow(
      'Invalid page or limit',
    );
  });

  it('should find a todo by id', () => {
    const todo = { id: '1', title: 'Test Todo' };
    mockTodosService.findOne.mockResolvedValue(todo);
    void expect(controller.findOne('1')).resolves.toEqual(todo);
  });

  it('should update a todo', () => {
    const updateTodoDto = { title: 'Updated Todo' };
    const updatedTodo = { id: '1', ...updateTodoDto };
    mockTodosService.update.mockResolvedValue(updatedTodo);
    void expect(controller.update('1', updateTodoDto)).resolves.toEqual(
      updatedTodo,
    );
  });

  it('should remove a todo', () => {
    const removedTodo = { id: '1' };
    mockTodosService.remove.mockResolvedValue(removedTodo);
    void expect(controller.remove('1')).resolves.toEqual(removedTodo);
  });

  it('should handle errors', () => {
    const errorMessage = 'Error occurred';
    mockTodosService.create.mockRejectedValue(new Error(errorMessage));
    void expect(
      controller.create({
        title: 'Test Todo',
      }),
    ).rejects.toThrow(errorMessage);
  });
});
