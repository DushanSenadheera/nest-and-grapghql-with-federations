import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from './entity/project.entity';
import { Location } from './entity/location.entity';
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @Query(() => Employee, { name: 'findEmployee' })
  findOne(@Args('id') id: string, @Info() info) {

    const keys = info.fieldNodes[0].selectionSet.selections
      .filter((selection) => !selection.selectionSet)
      .map((item) => item.name.value);

    return this.employeeService.findOne(id);
  }

  @ResolveField((of) => Project)
  project(@Parent() employee: Employee) {
    return { __typename: 'Project', id: employee.projectId };
  }

  @ResolveField((of) => Location)
  location(@Parent() employee: Employee) {
    return { __typename: 'Location', id: employee.locationId };
  }

}
