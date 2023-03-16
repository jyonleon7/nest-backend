import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-status.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create({
      ...createUserDto,
      status: UserStatus.FREE,
    });
    this.save(user);
    return user;
  }

  async updateStatus(user: User): Promise<User> {
    const updateStatusUser = {
      ...user,
      status: UserStatus.PREMIUM,
    };
    this.save(updateStatusUser);
    return updateStatusUser;
  }
}
