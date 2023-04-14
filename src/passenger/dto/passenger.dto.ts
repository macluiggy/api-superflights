import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PassengerDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
