import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput {
  @Field()
  id: string
  @Field()
  name: string
  @Field(() => Int)
  code: number
}