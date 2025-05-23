import { Rule } from '../enums/rule.enum';

export class CreateUserDto {
  tenantId: string;
  name: string;
  email: string;
  password: string;
  rules?: Rule[] = [Rule.DEFAULT];
}
