import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panel } from './panel.entity';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panel])],
  providers: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}
