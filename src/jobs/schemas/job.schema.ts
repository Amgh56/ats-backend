import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({timestamps:true})
export class Jobs{
    @Prop({required:true})
    title:string;

    @Prop({required:true})
    description:string;

    @Prop({required: true})
    salary?: number; 

    @Prop({required:true})
    location:string;

    @Prop({ required: true })
    ownerId: string;
}

export type JobsDocument = Jobs & Document;
export const  JobsSchema = SchemaFactory.createForClass(Jobs);