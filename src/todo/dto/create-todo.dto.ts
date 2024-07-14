import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    task: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
}
