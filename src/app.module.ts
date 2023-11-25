import { Module } from '@nestjs/common';
import { PrismaModule } from './lib/prisma/prisma.module';
import { SkillModule } from './modules/skill/skill.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [PrismaModule, UserModule, SkillModule],
})
export class AppModule {}
