import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkPayload {
  @ApiProperty({
    required: true,
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: true,
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;
}
