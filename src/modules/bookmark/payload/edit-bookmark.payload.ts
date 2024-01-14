import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkPayload {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  link?: string;
}
