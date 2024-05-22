import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 250, name: 'uid_owner' })
    uidOwner: string; 

    @Column({ type: 'varchar', length: 100, name: 'name_owner' })
    nameOwner: string; 

    @Column({ type: 'varchar', length: 100, name: 'name_pacient' })
    namePacient: string; 

    @Column({type: 'varchar', length: 50, name: 'sender_phone' })
    senderPhone: string; 

    @Column({type: 'varchar', length: 50, name: 'receiver_phone' })
    receiverPhone: string;
    
    @Column({ type: 'timestamptz', name: 'appointment_date' })
    appointmentDate: Date;

    @Column({
        type: 'enum',
        enum: Status
    })
    status: Status;

    @Column({ type: 'bool', name: 'notification_sent' })
    notificationSent: boolean;
    
    
    @Column({type: 'varchar', length: 50, name: 'time_zone' })
    timeZone: string;
    
    @Column({ type: 'timestamptz', name: 'created_date' })
    createdDate: Date

}
