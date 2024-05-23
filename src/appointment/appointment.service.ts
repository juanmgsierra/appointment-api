import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {

  constructor(@InjectRepository(Appointment) private readonly appointmentRepo : Repository<Appointment>){}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = await this.appointmentRepo.save(
      { ...createAppointmentDto, notificationSent: false, createdDate: new Date() })
    return { success: true, data: appointment };
  }

  async findAllByOwner(uidOwner : string) {
    const appointments = await this.appointmentRepo.find({
      where: { uidOwner : uidOwner } 
    });
    return { success: true, data: appointments };
  }

  async findAll() {
    const appointments = await this.appointmentRepo.find();
    return { success: true, data: appointments };
  }

  async findOne(id: number) {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      return { success: false, data: null };
    }
    
    return { success: true, data: appointment };
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if(!appointment){
      return { success: false, data: null}
    }
    const updateAppointment = await this.appointmentRepo.save({ ...appointment, ...updateAppointmentDto })
    return { success: true, data: updateAppointment };
    
  }

}
