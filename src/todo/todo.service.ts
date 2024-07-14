import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createTodoDto: CreateTodoDto, email: string) {
  try{
      const user = await this.databaseService.user.findUnique({where:{email}})
      let data: Prisma.TodoCreateInput = {
        description : createTodoDto.description,
        task:  createTodoDto.task,
        status : 'ACTIVE',
        user:{
          connect: {email: user.email}
        }
      }
      console.log(data)
      return await this.databaseService.todo.create({data});
    }catch (error) {
      console.log(error)
    return error
  }
}

  async findAll(userEmail: string) {
    return await this.databaseService.todo.findMany({
      where:{
        userEmail: userEmail
      }
    });
  }

  async findOne(id: number) {
    return await this.databaseService.todo.findFirst({
      where:{
        id: id
      }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.databaseService.todo.update({
      where:{
        id: id
      },
      data: updateTodoDto
    });
  }

  async remove(id: number) {
    return await this.databaseService.todo.delete({
      where:{
        id: id
      }
  });
}}
