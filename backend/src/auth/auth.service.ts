import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      id,
    });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateStatus(id: string): Promise<User> {
    const user = await this.findById(id);
    const updatedUser = this.userRepository.updateStatus(user);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({
      id,
    });
  }
}
