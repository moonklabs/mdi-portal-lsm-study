import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PanelService } from './panel.service';
import { Panel } from './panel.entity';
import { User } from '../auth/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('panels')
@ApiBearerAuth()
@Controller('/api/panels')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  /**
   * 새로운 패널 생성
   * @param panelData 패널 생성에 필요한 데이터
   * @param req 사용자 요청
   * @returns 생성된 패널
   */
  @ApiOperation({ summary: '패널 생성' })
  @ApiResponse({ status: 201, description: '패널 생성 성공', type: Panel })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() panelData: CreatePanelDto, @Request() req): Promise<Panel> {
    const user: User = req.user;
    return this.panelService.create(panelData, user);
  }

  /**
   * 모든 패널 조회
   * @param req 사용자 요청
   * @returns 사용자의 모든 패널
   */
  @ApiOperation({ summary: '모든 패널 조회' })
  @ApiResponse({ status: 200, description: '패널 조회 성공', type: [Panel] })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<Panel[]> {
    const user: User = req.user;
    return this.panelService.findAll(user);
  }

  /**
   * 패널 정보 저장 및 업데이트
   * @param panelArray 업데이트할 패널 배열
   * @param req 사용자 요청
   * @returns 업데이트된 패널 배열
   */
  @ApiOperation({ summary: '패널 저장' })
  @ApiResponse({ status: 200, description: '패널 저장 성공', type: [Panel] })
  @UseGuards(JwtAuthGuard)
  @Post('save')
  saveChanges(
    @Body() panelArray: UpdatePanelDto[],
    @Request() req,
  ): Promise<Panel[]> {
    const user: User = req.user;
    return this.panelService.saveChanges(panelArray, user);
  }
}
