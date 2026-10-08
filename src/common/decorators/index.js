export const Public = () => {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata('isPublic', true, descriptor.value);
    return descriptor;
  };
};

export const Roles = (...roles) => {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata('roles', roles, descriptor.value);
    return descriptor;
  };
};
