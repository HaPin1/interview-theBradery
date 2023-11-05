import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);

    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: 'Invalid credentials',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: 'Invalid credentials',
      };
    }

    const result = { username: user.username, sub: user.id };
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const response = {
      token: this.jwtService.sign(payload),
      username: user.username,
    };
    return {
      status: HttpStatus.OK,
      JSON: response,
    };
  }

  async createUser(username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        username,
        password: hashedPassword,
      });
      await this.usersRepository.save(newUser);
      return {
        status: HttpStatus.OK,
        data: 'User created successfully',
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: 'Username is already taken',
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: 'Error encountered while creating user',
      };
    }
  }
}
