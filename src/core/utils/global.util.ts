import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

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
