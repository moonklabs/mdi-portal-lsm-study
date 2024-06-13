import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from './data-source';
import { PanelModule } from './panel/panel.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Panel } from './panel/panel.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // ...AppDataSource.options,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Panel],
      synchronize: true,
      logging: true,
    }),
    PanelModule,
    AuthModule,
  ],
})
export class AppModule {}
