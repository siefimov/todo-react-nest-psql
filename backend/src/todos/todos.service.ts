import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-user.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(todosRepository: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(todosRepository);
    return this.todosRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const task = await this.todosRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return this.todosRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    const result = await this.todosRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
