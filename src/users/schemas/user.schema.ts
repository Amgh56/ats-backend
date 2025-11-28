import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Register schema design. 
@Schema({timestamps: true})
export class User {
@ApiProperty({   example: 'abdullahmmmaghrabi@gamil.com',    description: 'Unique email address of the user', })
@Prop({required: true, unique: true, trim: true, lowercase:true})
email: string;

@ApiProperty({example: '$2b....', description: 'Hashed password of the user',})
@Prop({required: true})
password_hash:string;

@ApiProperty({ example: 'business', description: 'Role of the user: either business or talent', enum: ['business', 'talent'],})
@Prop({required: true, enum: ["business", "talent"], default:"talent"})
role: "talent" | "business";


@ApiProperty({ example: '6730dd1c4a07cf5ae14de5f2', description: 'MongoDB user ID',})
_id?: string;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
