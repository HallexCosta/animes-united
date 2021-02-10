export type Override<TypeSource, OverrideProperties> = Pick<
  TypeSource,
  Exclude<keyof TypeSource, keyof OverrideProperties>
> &
  OverrideProperties
