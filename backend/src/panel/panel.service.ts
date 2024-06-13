import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panel } from './panel.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(Panel)
    private panelRepository: Repository<Panel>,
  ) {}

  private readonly logger = new Logger(PanelService.name);

  /**
   * 새로운 패널 생성
   * @param panelData 패널 생성에 필요한 데이터
   * @param user 패널을 생성하는 사용자
   * @returns 생성된 패널
   */
  create(panelData: Partial<Panel>, user: User): Promise<Panel> {
    const panel = this.panelRepository.create({ ...panelData, user });
    return this.panelRepository.save(panel);
  }

  /**
   * 사용자의 모든 패널 조회
   * @param user 패널을 조회할 사용자
   * @returns 사용자의 모든 패널
   */
  async findAll(user: User): Promise<Panel[]> {
    return this.panelRepository
      .createQueryBuilder('panel')
      .where('panel.userId = :userId', { userId: user.id })
      .getMany();
  }

  /**
   * 패널 정보 저장 및 업데이트
   * @param panelArray 업데이트할 패널 배열
   * @param user 패널을 업데이트하는 사용자
   * @returns 업데이트된 패널 배열
   */
  async saveChanges(
    panelArray: Partial<Panel>[],
    user: User,
  ): Promise<Panel[]> {
    const savedPanels: Panel[] = [];

    for (const panelData of panelArray) {
      let panel: Panel | undefined = undefined;

      if (panelData.id && !panelData.id.toString().startsWith('temp-')) {
        const panelId =
          typeof panelData.id === 'string'
            ? parseInt(panelData.id, 10)
            : panelData.id;

        panel = await this.panelRepository.findOne({
          where: { id: panelId, user: { id: user.id } },
        });
      }

      if (panelData.isClose) {
        if (panel) {
          await this.panelRepository.remove(panel);
        }
        continue;
      }

      this.logger.debug(`panelData: ${JSON.stringify(panelData)}`);
      this.logger.debug(`panel: ${JSON.stringify(panel)}`);

      if (panel) {
        panel = this.panelRepository.merge(panel, panelData);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...dataWithoutId } = panelData;
        panel = this.panelRepository.create({ ...dataWithoutId, user });
      }

      panel = await this.panelRepository.save(panel);
      savedPanels.push(panel);
    }

    return savedPanels;
  }
}
