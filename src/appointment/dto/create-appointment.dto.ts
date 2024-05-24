import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";
import { Status } from "../enums/status.enum";

export class CreateAppointmentDto {

    @ApiProperty()
    uidOwner: string; 

    @ApiProperty()
    @Matches(/^[a-zA-Z ]*$/)
    nameOwner: string; 

    @ApiProperty()
    @Matches(/^[a-zA-Z ]*$/)
    namePacient: string; 

    @ApiProperty()
    senderPhone: string; 
    
    @ApiProperty()
    receiverPhone: string;
    
    @ApiProperty()
    appointmentDate: Date;

    @ApiProperty({ enum: Status })
    status: Status;
    
    @ApiProperty()
    timeZone: string;
    
}
