export interface Mapper {
  toDomain(raw: unknown): any;
  toDTO(entity: unknown): any;
}
