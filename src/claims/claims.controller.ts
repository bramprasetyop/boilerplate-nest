import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/core/service/guard';
import { MapResponseSwagger } from '@src/core/utils/global.util';

import {
  ClaimCreateRequest,
  ClaimFindAllResponse,
  ClaimRequestList,
  ClaimResponse,
  ClaimUpdateRequest,
} from './dto';
import { ClaimsService } from './service/claims.service';

@Controller('claims')
@ApiTags('Claims')
@ApiBearerAuth()
export class ClaimsController {
  constructor(private claim: ClaimsService) {}

  @MapResponseSwagger(ClaimResponse, { status: 200, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: ClaimRequestList
  ): Promise<ClaimFindAllResponse> {
    try {
      return await this.claim.findAll(+query?.page, +query?.perPage);
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  @MapResponseSwagger(ClaimResponse, { status: 200, isArray: false })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findDetail(@Param('id') id: number): Promise<ClaimResponse> {
    try {
      return await this.claim.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  @MapResponseSwagger(ClaimCreateRequest, { status: 200, isArray: false })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: ClaimCreateRequest): Promise<any> {
    try {
      return await this.claim.create(body);
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  @MapResponseSwagger(ClaimUpdateRequest, { status: 200, isArray: false })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: ClaimUpdateRequest): Promise<any> {
    try {
      return await this.claim.update(body);
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
