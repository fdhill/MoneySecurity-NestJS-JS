import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password;

  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name;

  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number format' })
  phoneNumber;
}
