import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private usersRepo: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const existing = await this.usersRepo.findOneBy({ email: dto.email });
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ email: dto.email, password: hash });
    return this.usersRepo.save(user);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.password);
    if (ok) return user;
    return null;
  }

  async login(dto: LoginAuthDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
