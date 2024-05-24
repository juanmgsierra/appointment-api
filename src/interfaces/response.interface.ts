import { Appointment } from "src/appointment/entities/appointment.entity"

export interface Response {
    typeTransaction: string,
    message: string,
    dateTime: string,
    data: Appointment[] | Appointment,
}