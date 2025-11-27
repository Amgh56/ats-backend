import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger';

@Schema({timestamps:true})
export class Jobs{
    @ApiProperty({ example: 'Software Engineer' })
    @Prop({required:true})
    title:string;
    @ApiProperty({ example: 'Senior Software Engineer with +5y experiance' })
    @Prop({required:true})
    description:string;

    @ApiProperty({ example: 15000 })
    @Prop({required: true})
    salary?: number; 

    @ApiProperty({ example: 'Riyadh' })
    @Prop({required:true})
    location:string;

    @ApiProperty({example: '692737828b2fa163082e938c', description: 'Id of the job creator'})
    @Prop({ required: true })
    ownerId: string;
}

export type JobsDocument = Jobs & Document;
export const  JobsSchema = SchemaFactory.createForClass(Jobs);