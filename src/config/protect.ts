import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';


export function forAllUser(...token: string[]) {
    return applyDecorators(ApiBearerAuth(), 
    UseGuards(JwtAuthGuard));
  }