import { hash } from 'bcryptjs';
import { NotFoundException, BadRequestException } from '../common/exceptions';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(prismaService) {
    this.repository = new UserRepository(prismaService);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto) {
    const existingUser = await this.repository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hash(dto.password, 10);

    return this.repository.create({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      phoneNumber: dto.phoneNumber || null,
      role: 2,
    });
  }

  async update(id, dto) {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
