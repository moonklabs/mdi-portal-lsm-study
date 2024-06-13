import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePanelDto {
  @ApiProperty({ description: '패널 제목', example: '패널 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '패널 내용', example: '패널 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '패널 액션', example: 'browser' })
  @IsString()
  action: string;

  @ApiProperty({ description: '시간대', example: 'Asia/seoul' })
  @IsString()
  timezone: string;

  @ApiProperty({ description: '패널 너비', example: '400' })
  @IsNumber()
  width: number;

  @ApiProperty({ description: '패널 높이', example: '300' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: '패널 x 좌표', example: '0' })
  @IsNumber()
  x: number;

  @ApiProperty({ description: '패널 y 좌표', example: '0' })
  @IsNumber()
  y: number;

  @ApiProperty({ description: '패널 숨김 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isHide?: boolean;

  @ApiProperty({ description: '패널 최대화 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isMaximize?: boolean;

  @ApiProperty({ description: '패널 최소화 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isMinimize?: boolean;

  @ApiProperty({ description: '패널 닫힘 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isClose?: boolean;

  @ApiProperty({ description: '패널 드래그 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isDrag?: boolean;

  @ApiProperty({ description: '패널 리사이즈 상태', example: 'false' })
  @IsBoolean()
  @IsOptional()
  isResize?: boolean;

  @ApiProperty({ description: '패널 순서', example: '0' })
  @IsNumber()
  @IsOptional()
  order?: number;
}
