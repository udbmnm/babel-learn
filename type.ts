
type Index = 1 | 2 | 3 | 4;
type Form = { [index in Index]: string };
interface Student {
  name: string;
  age: number;
}

type S1 = Pick<Student, 'age'>;
type S2 = Omit<Student, 'name'>;
type S3 = Partial<Student>;
type S4 = Required<Student>;
type S5 = Exclude<Student, 'name'>;
type GetObjValues<T> = T extends Record<any, infer V> ? V : never
export type SwitchKeyValue<
  T,
  T1 extends Record<string, any> = {
    [K in keyof T]: { key: K; value: T[K] }
  },
  T2 = {
    [K in GetObjValues<T1>['value']]: Extract<GetObjValues<T1>, { value: K }>['key']
  }
> = T2

type ToUppercase<T> = T extends string? Uppercase<T> : T;
type ToLowerCase<T> = T extends string? Lowercase<T> : T;
type GetKeyType<T,K extends keyof T> = T[K]
type PickOne<T, K extends keyof T> = { [key in K]: T[key] };
type ExcludeOne<T, K extends keyof T> = { [key in Exclude<keyof T, K>]: T[key] };
// type UppercaseKeys<T ,T0 = {[K in keyof T]: ToUppercase<K>},T1 = SwitchKeyValue<T0>,T2 = {[K in keyof T1]: T[ToLowerCase<K>]}> = T2;

//https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%BB%8B%E7%BB%8D
// infer 表示在 extends 条件语句中待推断的类型变量
//在这个条件语句 T extends (...args: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。
// 整句表示为：如果 T 能赋值给 (...args: infer P) => any，则结果是 (...args: infer P) => any 类型中的参数 P，否则返回为 T。

type ParamType<T> = T extends (...args: infer P) => any ? P : T;
type GetType<T> = T extends infer P ? P : never;

type anyType = GetType<number>;

//获取索引签名 key
type InferTypeKey<T,K,K1 = ToLowerCase<K>> = K1 extends keyof T ? T[K1] : never
type UppercaseType<T> = {[K in ToUppercase<keyof T>]: InferTypeKey<T,K> };

type Func = (user: Student) => void;

type Param = ParamType<Func>;
type AA = ParamType<string>; // string

type S6 = PickOne<Student, 'age'>;
type S7 = ExcludeOne<Student, 'age'>;
type S8 = keyof Student;
type S9 = keyof Student[];
type S10 = {[key in Uppercase<keyof Student>]: Student[Lowercase<key>] };
type S11 = UppercaseType<Student>;
type S12 = GetKeyType<Student, 'age'>;




const a: S8 = 'age';
const b: S9 = 'length';


type PromiseType<T> = (args: any[]) => Promise<T>;
async function stringPromise() {
  return "string promise";
}
type stringPromiseReturnType = ReturnType<typeof stringPromise>; // Promise<string>
//通过infer反解出类型
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
type extractStringPromise = UnPromisify<typeof stringPromise>; // string

//解析参数数组的类型
type VariadicFn<A extends any[]> = (...args: A) => any;
type ArgsType<T> = T extends VariadicFn<infer A> ? A : never;
type Fn = (a: number, b: string) => string;
type Fn2Args = ArgsType<Fn>; // [number, string]


type LowerToUpperToLowerCaseMapper = {
  a: 'A'
  b: 'B'
  c: 'C'
  d: 'D'
  e: 'E'
  f: 'F'
  g: 'G'
  h: 'H'
  i: 'I'
  j: 'J'
  k: 'K'
  l: 'L'
  m: 'M'
  n: 'N'
  o: 'O'
  p: 'P'
  q: 'Q'
  r: 'R'
  s: 'S'
  t: 'T'
  u: 'U'
  v: 'V'
  w: 'W'
  x: 'X'
  y: 'Y'
  z: 'Z'
}

type UpperToLowerCaseMapper = {
  A: 'a'
  B: 'b'
  C: 'c'
  D: 'd'
  E: 'e'
  F: 'f'
  G: 'g'
  H: 'h'
  I: 'i'
  J: 'j'
  K: 'k'
  L: 'l'
  M: 'm'
  N: 'n'
  O: 'o'
  P: 'p'
  Q: 'q'
  R: 'r'
  S: 's'
  T: 't'
  U: 'u'
  V: 'v'
  W: 'w'
  X: 'x'
  Y: 'y'
  Z: 'z'
}


type HeadLetter<T> = T extends `${infer FirstLetter}${infer _Rest}` ? FirstLetter : never
type TailLetters<T> = T extends `${infer _FirstLetter}${infer Rest}` ? Rest : never

type LetterToUpper<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter extends keyof LowerToUpperToLowerCaseMapper
    ? LowerToUpperToLowerCaseMapper[FirstLetter]
    : FirstLetter
  : T

type LetterToLower<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter extends keyof UpperToLowerCaseMapper
    ? UpperToLowerCaseMapper[FirstLetter]
    : FirstLetter
  : T

// type ToLowerCase<T> = T extends ''
//   ? T
//   : `${LetterToLower<HeadLetter<T>>}${ToLowerCase<TailLetters<T>>}`

// First letter is upper rest is lower
type ToSentenceCase<T> = `${LetterToUpper<HeadLetter<T>>}${ToLowerCase<TailLetters<T>>}`

type ToPascalCase<T> = T extends ``
  ? T
  : T extends `${infer FirstWord}_${infer RestLetters}`
  ? `${ToSentenceCase<FirstWord>}${ToPascalCase<RestLetters>}`
  : ToSentenceCase<T>

export type UpperCaseToCamelCase<T> = `${ToLowerCase<HeadLetter<T>>}${TailLetters<ToPascalCase<T>>}`

// apply snake case into objects
type Cast<T, U> = T extends U ? T : U


type CallRecursiveTransformIfObj<T> = T extends Record<any, any> ? TransformKeysToCamelCase<T> : T


type TransformKeysToCamelCase<
  T extends Record<string, any>,
  T0 = { [K in keyof T]: UpperCaseToCamelCase<K> },
  T1 = SwitchKeyValue<T0>,
  T2 = { [K in keyof T1]: CallRecursiveTransformIfObj<T[Cast<T1[K], string>]> }
> = T2


type NestedKeyRevert = TransformKeysToCamelCase<{
  FOO_BAR: string
  ANOTHER_FOO_BAR: true | number,
  NESTED_KEY: {
    NEST_FOO: string
    NEST_BAR: boolean
  },
}>
