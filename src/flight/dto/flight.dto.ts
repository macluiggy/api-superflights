import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FlightDTO {
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;
  @IsNotEmpty()
  @IsString()
  readonly airplane: string;
  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly flightDate: Date;
}

/**
 * json example
 {
  "pilot": "John Doe",
  "airplane": "Boeing 747",
  "destinationCity": "New York",
  "flightDate": "2021-01-01T00:00:00.000Z"
 }
 */
