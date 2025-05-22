export class UserProps {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  rules?: string[];
}
export class User extends UserProps {
  constructor({
    id,
    tenantId,
    name,
    email,
    password,
    isActive,
    createdAt,
    updatedAt,
    deletedAt,
    rules,
  }: UserProps) {
    super();

    this.id = id;
    this.tenantId = tenantId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isActive = isActive || true;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.rules = rules || [];
  }
}
