import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import * as crypto from 'crypto';

import { Meta, SwaggerMetaResponse } from '../dto/global.dto';

export function GeneratePagination(
  pageSize: number,
  currentPage: number,
  totalData: number
): Meta {
  return {
    pageSize: pageSize,
    currentPage: currentPage,
    total: totalData,
    totalPage: Math.ceil(totalData / pageSize),
  };
}

export function GenerateUUIDv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

export const MapResponseSwagger = <
  DataDto extends Type<unknown>,
  Options extends { status: number; isArray: boolean },
>(
  dataDto: DataDto,
  options: Options
) =>
  applyDecorators(
    ApiExtraModels(SwaggerMetaResponse, Meta, dataDto),
    ApiResponse({
      status: options.status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerMetaResponse) },
          {
            ...(options.isArray
              ? {
                  properties: {
                    status_code: {
                      example: options.status,
                    },
                    data: {
                      type: 'array',
                      items: { $ref: getSchemaPath(dataDto) },
                    },
                    meta: {
                      $ref: getSchemaPath('Meta'),
                    },
                  },
                }
              : {
                  properties: {
                    status_code: {
                      example: options.status,
                    },
                    data: {
                      $ref: getSchemaPath(dataDto),
                    },
                  },
                }),
          },
        ],
      },
    })
  );
