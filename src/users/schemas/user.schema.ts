import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Register schema is happening in here 
@Schema({timestamps: true})
export class User {
@Prop({required: true, unique: true, trim: true, lowercase:true})
email: string

@Prop({required: true})
password_hash:string

@Prop({required: true, enum: ["business", "talent"], default:"talent"})
role: "talent" | "business"

_id?: string

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)
