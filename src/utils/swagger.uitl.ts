import { applyDecorators, Type } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiProperty as _ApiProperty, ApiPropertyOptional as _ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export const ApiSwaggerResponse = <TModel extends Type<unknown>>(model: TModel | TModel[], summary?: string) => {
    if (model && Array.isArray(model)) {
      return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({ summary }),
        ApiExtraModels(model[0]),
        ApiOkResponse({
          schema: {
            type: 'array',
            items: { $ref: getSchemaPath(model[0]) },
          }
        }),
      );
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({ summary }),
        ApiExtraModels(model as Function),
        ApiOkResponse({
          schema: { $ref: getSchemaPath(model as Function) }
        }),
      );
    }
  };

  export const ApiProperty = (options?: ApiPropertyOptions): PropertyDecorator => {
    return applyDecorators(
      _ApiProperty(options),
      Expose(),
      IsNotEmpty()
    );
  }
  
  export const ApiPropertyOptional = (options?: ApiPropertyOptions): PropertyDecorator => {
    return applyDecorators(
      _ApiPropertyOptional(options),
      Expose(),
      IsOptional()
    );
  }