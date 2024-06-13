import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    description: '유저 이름',
    minLength: 4,
    maxLength: 20,
    example: 'johnDoe',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '비밀번호',
    minLength: 8,
    maxLength: 32,
    example: 'Password123!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)).+/, {
    message: 'Password too weak',
  })
  password: string;
}
