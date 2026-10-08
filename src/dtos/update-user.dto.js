import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name;

  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number format' })
  phoneNumber;
}
