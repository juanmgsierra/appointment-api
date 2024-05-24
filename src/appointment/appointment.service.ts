import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Message } from './enums/messages.enum';
import { Response } from 'src/interfaces/response.interface';


@Injectable()
export class AppointmentService {
  constructor(@InjectRepository(Appointment) private readonly appointmentRepo : Repository<Appointment>){}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Response | Error>{
    try {
      const appointment = await this.appointmentRepo.save(
        { ...createAppointmentDto, notificationSent: false, createdDate: new Date() })

      return { 
        message: Message.CREATED, 
        typeTransaction: Message.TYPE_TRANSACTION, 
        dateTime: new Date().toISOString(), 
        data: appointment 
      } 
    } catch (error) {
      return new InternalServerErrorException(Message.ERROR, { cause: new Error(), description: error })
    }
  }

  async findAllByOwner(uidOwner: string): Promise<Response | Error>{
    try {
      const appointments = await this.appointmentRepo.find({
        where: { uidOwner: uidOwner } 
      })
      if(appointments.length == 0){
        return new NotFoundException(Message.NOT_FOUND);
      }
      return {
        message: Message.FIND_ALL,
        typeTransaction: Message.TYPE_TRANSACTION, 
        dateTime: new Date().toISOString(), 
        data: appointments
      }
    } catch (error) {
      return new InternalServerErrorException(Message.ERROR, { cause: new Error(), description: error })
    }
  }

  async findAll(): Promise<Response | Error> {
    try {
      const appointments = await this.appointmentRepo.find();
      if(appointments.length == 0){
        return new NotFoundException(Message.NOT_FOUND);
      }
      return { 
        message: Message.FIND_ALL,
        typeTransaction: Message.TYPE_TRANSACTION, 
        dateTime: new Date().toISOString(), 
        data: appointments
      }
    } catch (error) {
      return new InternalServerErrorException(Message.ERROR, { cause: new Error(), description: error })
    }
  }

  async findOne(id: number): Promise<Response | Error>{
    try { 
      const appointment = await this.appointmentRepo.findOneBy({ id });
      if(!appointment){
        return new NotFoundException(Message.NOT_FOUND);
      }
      return { 
        message: Message.FIND_ONE, 
        typeTransaction: Message.TYPE_TRANSACTION, 
        dateTime: new Date().toISOString(), 
        data: appointment 
      }
    } catch (error) {
      return new InternalServerErrorException(Message.ERROR, { cause: new Error(), description: error })
    }
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Response | Error> {
    try {
      const appointment = await this.appointmentRepo.findOneBy({ id })
      if(!appointment){
        return new NotFoundException(Message.NOT_FOUND);
      }
      const updateAppointment = await this.appointmentRepo.save({ ...appointment, ...updateAppointmentDto })
      
      return { 
        message: Message.UPDATED, 
        typeTransaction: Message.TYPE_TRANSACTION, 
        dateTime: new Date().toISOString(), 
        data: updateAppointment 
      }
    } catch (error) {
      return new InternalServerErrorException(Message.ERROR, { cause: new Error(), description: error })
    }
  }
}
