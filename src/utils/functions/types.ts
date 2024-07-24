export interface GenericFunction<T = any, R = any> {
  (...args: T[]): R;
}
