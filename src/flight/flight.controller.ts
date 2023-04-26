import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flight')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}
  @Post()
  async create(@Body() flightDto: FlightDTO) {
    return await this.flightService.create(flightDto);
  }

  @Get()
  async findAll() {
    return await this.flightService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.flightService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() flightDto: FlightDTO) {
    return await this.flightService.update(id, flightDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.flightService.delete(id);
  }

  @Post(':id/passenger/:passengerId')
  async addPassenger(
    @Param() { id, passengerId }: { id: string; passengerId: string },
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return await this.flightService.addPassenger(id, passengerId);
  }
}
