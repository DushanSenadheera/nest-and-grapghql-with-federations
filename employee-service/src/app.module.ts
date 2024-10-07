import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Location } from './entity/location.entity';
import { EmployeeModule } from './employee.module';

@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: "src/schema.gql", federation: 2 },
      buildSchemaOptions: {
        orphanedTypes: [Project, Location],
      },
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'employee',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
    })
  ],
})
export class AppModule {}
