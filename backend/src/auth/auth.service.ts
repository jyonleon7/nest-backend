import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialDto } from './dto/credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async signin({
    username,
    password,
  }: CredentialDto): Promise<{ accessToken }> {
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください。',
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException('ユーザーが見つかりません。');
    return user;
  }

  async findAll(): Promise<User[]> {
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
