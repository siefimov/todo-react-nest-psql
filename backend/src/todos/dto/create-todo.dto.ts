import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TodoStatus } from '../todos.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  readonly title: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  readonly status?: TodoStatus;
}
