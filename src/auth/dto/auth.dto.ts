import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ name: 'username', example: 'xxxxxxxx', required: true })
  @IsString({ message: 'Username tidak boleh kosong.' })
  username: string;

  @ApiProperty({ name: 'password', example: 'xxxxxxxx', required: true })
  @IsString({ message: 'Password tidak boleh kosong.' })
  password: string;
}

export class LoginResponseDto implements TokenDto {
  @ApiProperty({ example: 'base64 token' })
  token: string;

  @ApiProperty({ example: '124000' })
  token_expired: number;
}

export class TokenDto {
  token: string;
  token_expired: number;
}
