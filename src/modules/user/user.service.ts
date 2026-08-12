import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.userRepository.existsBy({
      email: createUserDto.email,
    });

    if (existingEmail) {
      throw new ConflictException(
        `User with "${createUserDto.email}" email is taken! Please choose a different email.`,
      );
    }
    const hashedPassword = await hash(createUserDto.password);
    const createdUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(createdUser);
  }

  async findList() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({ id });
    const newEmail = updateUserDto.email;
    const isEmailChanged = newEmail && newEmail !== user.email;

    if (isEmailChanged) {
      const existingEmail = await this.userRepository.existsBy({
        email: newEmail,
      });

      if (existingEmail) {
        throw new ConflictException(
          `User with "${newEmail}" email is taken! Please choose a different email.`,
        );
      }
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    await this.userRepository.findOneByOrFail({ id });
    return this.userRepository.delete({ id });
  }
}
