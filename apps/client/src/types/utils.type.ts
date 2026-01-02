export type PrefixCapitalize<
  T extends string,
  TPrefix extends string,
> = `${TPrefix}${Capitalize<T>}`

export type RemovePrefix<
  T extends string,
  TPrefix extends string,
> = T extends `${TPrefix}${infer P}` ? P : T

export type SnakeCaseConverter<T extends string> = T extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? First extends Lowercase<First>
      ? `${First}${SnakeCaseConverter<Rest>}` // Numbers/Symbols
      : `_${First}${SnakeCaseConverter<Rest>}` // Uppercase Letter
    : `${Uppercase<First>}${SnakeCaseConverter<Rest>}` // Lowercase Letter
  : T

export type ObjectKeysWithPrefix<T extends object, TPrefix extends string> = {
  [K in keyof T as PrefixCapitalize<string & K, TPrefix>]: T[K]
}

export type ObjectValueShouldBe<T extends object, TValue> = {
  [K in keyof T]: T[K] | TValue
}

export type ObjectKeys<T extends object> = keyof T

export type ObjectKeysToFunctionMap<T extends object, TPrefix extends string> = {
  [K in keyof T as PrefixCapitalize<string & K, TPrefix>]: (value: T[K]) => void
}

export type ReducerActionTitle<T extends string> = RemovePrefix<SnakeCaseConverter<T>, '_'>

export type ReducerAction<
  T extends object,
  TPrefix extends string = 'SET',
  TRemovePrefix extends string = '',
> =
  | { type: 'RESET'; payload?: never }
  | {
      [K in keyof T]: {
        type: PrefixCapitalize<
          ReducerActionTitle<RemovePrefix<string & K, TRemovePrefix>>,
          `${TPrefix}_`
        >
        payload: T[K]
      }
    }[keyof T]

export type ToChangeHandlers<T> = {
  [K in keyof T & string as `onChange${Capitalize<K>}`]: (value: T[K]) => void
}
