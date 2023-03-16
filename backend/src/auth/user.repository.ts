import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-status.enum';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // ハッシュ値の強度を高める文字列(リクエストされたpassword と混ぜて、ハッシュ値の復元をより難しくする)
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.create({
      ...createUserDto,
      password: hashPassword,
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
