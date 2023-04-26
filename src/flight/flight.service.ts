import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}
  async create(flightDto: any): Promise<IFlight> {
    const createdFlight = new this.model(flightDto);
    return await createdFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, flightDto: any): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDto, { new: true });
  }

  async delete(id: string): Promise<IFlight> {
    return await this.model.findByIdAndDelete(id);
  }

  async addPassenger(id: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        id,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
