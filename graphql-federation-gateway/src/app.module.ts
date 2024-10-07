import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'employees', url: 'http://localhost:3000/graphql' },
            { name: 'projects', url: 'http://localhost:3001/graphql' },
            { name: 'locations', url: 'http://localhost:3002/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
