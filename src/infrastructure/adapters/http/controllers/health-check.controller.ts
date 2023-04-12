import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('App Health Check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  @ApiOkResponse({
    description: 'Products API is healthy',
  })
  checkAppHealth(): object {
    return {
      appName: 'Products-Service',
      status: true,
    };
  }
}
