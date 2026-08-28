
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model PrivateCredential
 * 
 */
export type PrivateCredential = $Result.DefaultSelection<Prisma.$PrivateCredentialPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model MemberPrivateFinancial
 * 
 */
export type MemberPrivateFinancial = $Result.DefaultSelection<Prisma.$MemberPrivateFinancialPayload>
/**
 * Model InstallmentPlan
 * 
 */
export type InstallmentPlan = $Result.DefaultSelection<Prisma.$InstallmentPlanPayload>
/**
 * Model Installment
 * 
 */
export type Installment = $Result.DefaultSelection<Prisma.$InstallmentPayload>
/**
 * Model Bank
 * 
 */
export type Bank = $Result.DefaultSelection<Prisma.$BankPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model SecurityEvent
 * 
 */
export type SecurityEvent = $Result.DefaultSelection<Prisma.$SecurityEventPayload>
/**
 * Model AppSettings
 * 
 */
export type AppSettings = $Result.DefaultSelection<Prisma.$AppSettingsPayload>
/**
 * Model BannedIp
 * 
 */
export type BannedIp = $Result.DefaultSelection<Prisma.$BannedIpPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlanStatus: {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus]


export const PaymentStatus: {
  BEKLIYOR: 'BEKLIYOR',
  ODENDI: 'ODENDI',
  GECIKMIS: 'GECIKMIS',
  KISMI: 'KISMI'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type PlanStatus = $Enums.PlanStatus

export const PlanStatus: typeof $Enums.PlanStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AdminUsers
 * const adminUsers = await prisma.adminUser.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AdminUsers
   * const adminUsers = await prisma.adminUser.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs>;

  /**
   * `prisma.privateCredential`: Exposes CRUD operations for the **PrivateCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrivateCredentials
    * const privateCredentials = await prisma.privateCredential.findMany()
    * ```
    */
  get privateCredential(): Prisma.PrivateCredentialDelegate<ExtArgs>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs>;

  /**
   * `prisma.memberPrivateFinancial`: Exposes CRUD operations for the **MemberPrivateFinancial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberPrivateFinancials
    * const memberPrivateFinancials = await prisma.memberPrivateFinancial.findMany()
    * ```
    */
  get memberPrivateFinancial(): Prisma.MemberPrivateFinancialDelegate<ExtArgs>;

  /**
   * `prisma.installmentPlan`: Exposes CRUD operations for the **InstallmentPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstallmentPlans
    * const installmentPlans = await prisma.installmentPlan.findMany()
    * ```
    */
  get installmentPlan(): Prisma.InstallmentPlanDelegate<ExtArgs>;

  /**
   * `prisma.installment`: Exposes CRUD operations for the **Installment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Installments
    * const installments = await prisma.installment.findMany()
    * ```
    */
  get installment(): Prisma.InstallmentDelegate<ExtArgs>;

  /**
   * `prisma.bank`: Exposes CRUD operations for the **Bank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Banks
    * const banks = await prisma.bank.findMany()
    * ```
    */
  get bank(): Prisma.BankDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.securityEvent`: Exposes CRUD operations for the **SecurityEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityEvents
    * const securityEvents = await prisma.securityEvent.findMany()
    * ```
    */
  get securityEvent(): Prisma.SecurityEventDelegate<ExtArgs>;

  /**
   * `prisma.appSettings`: Exposes CRUD operations for the **AppSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSettings
    * const appSettings = await prisma.appSettings.findMany()
    * ```
    */
  get appSettings(): Prisma.AppSettingsDelegate<ExtArgs>;

  /**
   * `prisma.bannedIp`: Exposes CRUD operations for the **BannedIp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BannedIps
    * const bannedIps = await prisma.bannedIp.findMany()
    * ```
    */
  get bannedIp(): Prisma.BannedIpDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AdminUser: 'AdminUser',
    PrivateCredential: 'PrivateCredential',
    Member: 'Member',
    MemberPrivateFinancial: 'MemberPrivateFinancial',
    InstallmentPlan: 'InstallmentPlan',
    Installment: 'Installment',
    Bank: 'Bank',
    AuditLog: 'AuditLog',
    SecurityEvent: 'SecurityEvent',
    AppSettings: 'AppSettings',
    BannedIp: 'BannedIp'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "adminUser" | "privateCredential" | "member" | "memberPrivateFinancial" | "installmentPlan" | "installment" | "bank" | "auditLog" | "securityEvent" | "appSettings" | "bannedIp"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      PrivateCredential: {
        payload: Prisma.$PrivateCredentialPayload<ExtArgs>
        fields: Prisma.PrivateCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrivateCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrivateCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          findFirst: {
            args: Prisma.PrivateCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrivateCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          findMany: {
            args: Prisma.PrivateCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>[]
          }
          create: {
            args: Prisma.PrivateCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          createMany: {
            args: Prisma.PrivateCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrivateCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>[]
          }
          delete: {
            args: Prisma.PrivateCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          update: {
            args: Prisma.PrivateCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          deleteMany: {
            args: Prisma.PrivateCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrivateCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrivateCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateCredentialPayload>
          }
          aggregate: {
            args: Prisma.PrivateCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrivateCredential>
          }
          groupBy: {
            args: Prisma.PrivateCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrivateCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrivateCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<PrivateCredentialCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      MemberPrivateFinancial: {
        payload: Prisma.$MemberPrivateFinancialPayload<ExtArgs>
        fields: Prisma.MemberPrivateFinancialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberPrivateFinancialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberPrivateFinancialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          findFirst: {
            args: Prisma.MemberPrivateFinancialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberPrivateFinancialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          findMany: {
            args: Prisma.MemberPrivateFinancialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>[]
          }
          create: {
            args: Prisma.MemberPrivateFinancialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          createMany: {
            args: Prisma.MemberPrivateFinancialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberPrivateFinancialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>[]
          }
          delete: {
            args: Prisma.MemberPrivateFinancialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          update: {
            args: Prisma.MemberPrivateFinancialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          deleteMany: {
            args: Prisma.MemberPrivateFinancialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberPrivateFinancialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberPrivateFinancialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPrivateFinancialPayload>
          }
          aggregate: {
            args: Prisma.MemberPrivateFinancialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberPrivateFinancial>
          }
          groupBy: {
            args: Prisma.MemberPrivateFinancialGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberPrivateFinancialGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberPrivateFinancialCountArgs<ExtArgs>
            result: $Utils.Optional<MemberPrivateFinancialCountAggregateOutputType> | number
          }
        }
      }
      InstallmentPlan: {
        payload: Prisma.$InstallmentPlanPayload<ExtArgs>
        fields: Prisma.InstallmentPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstallmentPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstallmentPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          findFirst: {
            args: Prisma.InstallmentPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstallmentPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          findMany: {
            args: Prisma.InstallmentPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>[]
          }
          create: {
            args: Prisma.InstallmentPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          createMany: {
            args: Prisma.InstallmentPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstallmentPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>[]
          }
          delete: {
            args: Prisma.InstallmentPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          update: {
            args: Prisma.InstallmentPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          deleteMany: {
            args: Prisma.InstallmentPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstallmentPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstallmentPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPlanPayload>
          }
          aggregate: {
            args: Prisma.InstallmentPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstallmentPlan>
          }
          groupBy: {
            args: Prisma.InstallmentPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstallmentPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstallmentPlanCountArgs<ExtArgs>
            result: $Utils.Optional<InstallmentPlanCountAggregateOutputType> | number
          }
        }
      }
      Installment: {
        payload: Prisma.$InstallmentPayload<ExtArgs>
        fields: Prisma.InstallmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstallmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstallmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findFirst: {
            args: Prisma.InstallmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstallmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          findMany: {
            args: Prisma.InstallmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          create: {
            args: Prisma.InstallmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          createMany: {
            args: Prisma.InstallmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstallmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>[]
          }
          delete: {
            args: Prisma.InstallmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          update: {
            args: Prisma.InstallmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          deleteMany: {
            args: Prisma.InstallmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstallmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstallmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallmentPayload>
          }
          aggregate: {
            args: Prisma.InstallmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstallment>
          }
          groupBy: {
            args: Prisma.InstallmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstallmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstallmentCountArgs<ExtArgs>
            result: $Utils.Optional<InstallmentCountAggregateOutputType> | number
          }
        }
      }
      Bank: {
        payload: Prisma.$BankPayload<ExtArgs>
        fields: Prisma.BankFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          findFirst: {
            args: Prisma.BankFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          findMany: {
            args: Prisma.BankFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>[]
          }
          create: {
            args: Prisma.BankCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          createMany: {
            args: Prisma.BankCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>[]
          }
          delete: {
            args: Prisma.BankDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          update: {
            args: Prisma.BankUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          deleteMany: {
            args: Prisma.BankDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BankUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          aggregate: {
            args: Prisma.BankAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBank>
          }
          groupBy: {
            args: Prisma.BankGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankCountArgs<ExtArgs>
            result: $Utils.Optional<BankCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      SecurityEvent: {
        payload: Prisma.$SecurityEventPayload<ExtArgs>
        fields: Prisma.SecurityEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          findFirst: {
            args: Prisma.SecurityEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          findMany: {
            args: Prisma.SecurityEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>[]
          }
          create: {
            args: Prisma.SecurityEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          createMany: {
            args: Prisma.SecurityEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>[]
          }
          delete: {
            args: Prisma.SecurityEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          update: {
            args: Prisma.SecurityEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          deleteMany: {
            args: Prisma.SecurityEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SecurityEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          aggregate: {
            args: Prisma.SecurityEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityEvent>
          }
          groupBy: {
            args: Prisma.SecurityEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityEventCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityEventCountAggregateOutputType> | number
          }
        }
      }
      AppSettings: {
        payload: Prisma.$AppSettingsPayload<ExtArgs>
        fields: Prisma.AppSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          findFirst: {
            args: Prisma.AppSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          findMany: {
            args: Prisma.AppSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>[]
          }
          create: {
            args: Prisma.AppSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          createMany: {
            args: Prisma.AppSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>[]
          }
          delete: {
            args: Prisma.AppSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          update: {
            args: Prisma.AppSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AppSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingsPayload>
          }
          aggregate: {
            args: Prisma.AppSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppSettings>
          }
          groupBy: {
            args: Prisma.AppSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AppSettingsCountAggregateOutputType> | number
          }
        }
      }
      BannedIp: {
        payload: Prisma.$BannedIpPayload<ExtArgs>
        fields: Prisma.BannedIpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BannedIpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BannedIpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          findFirst: {
            args: Prisma.BannedIpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BannedIpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          findMany: {
            args: Prisma.BannedIpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>[]
          }
          create: {
            args: Prisma.BannedIpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          createMany: {
            args: Prisma.BannedIpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BannedIpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>[]
          }
          delete: {
            args: Prisma.BannedIpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          update: {
            args: Prisma.BannedIpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          deleteMany: {
            args: Prisma.BannedIpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BannedIpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BannedIpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BannedIpPayload>
          }
          aggregate: {
            args: Prisma.BannedIpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBannedIp>
          }
          groupBy: {
            args: Prisma.BannedIpGroupByArgs<ExtArgs>
            result: $Utils.Optional<BannedIpGroupByOutputType>[]
          }
          count: {
            args: Prisma.BannedIpCountArgs<ExtArgs>
            result: $Utils.Optional<BannedIpCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    auditLogs: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | MemberCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type MemberPrivateFinancialCountOutputType
   */

  export type MemberPrivateFinancialCountOutputType = {
    plans: number
  }

  export type MemberPrivateFinancialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plans?: boolean | MemberPrivateFinancialCountOutputTypeCountPlansArgs
  }

  // Custom InputTypes
  /**
   * MemberPrivateFinancialCountOutputType without action
   */
  export type MemberPrivateFinancialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancialCountOutputType
     */
    select?: MemberPrivateFinancialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberPrivateFinancialCountOutputType without action
   */
  export type MemberPrivateFinancialCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentPlanWhereInput
  }


  /**
   * Count Type InstallmentPlanCountOutputType
   */

  export type InstallmentPlanCountOutputType = {
    installments: number
  }

  export type InstallmentPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | InstallmentPlanCountOutputTypeCountInstallmentsArgs
  }

  // Custom InputTypes
  /**
   * InstallmentPlanCountOutputType without action
   */
  export type InstallmentPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlanCountOutputType
     */
    select?: InstallmentPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstallmentPlanCountOutputType without action
   */
  export type InstallmentPlanCountOutputTypeCountInstallmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
  }


  /**
   * Count Type BankCountOutputType
   */

  export type BankCountOutputType = {
    installments: number
  }

  export type BankCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | BankCountOutputTypeCountInstallmentsArgs
  }

  // Custom InputTypes
  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankCountOutputType
     */
    select?: BankCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeCountInstallmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserAvgAggregateOutputType = {
    failedLoginCount: number | null
    version: number | null
  }

  export type AdminUserSumAggregateOutputType = {
    failedLoginCount: number | null
    version: number | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    passwordHash: string | null
    failedLoginCount: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    passwordHash: string | null
    failedLoginCount: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    username: number
    displayName: number
    passwordHash: number
    failedLoginCount: number
    lockedUntil: number
    lastLoginAt: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserAvgAggregateInputType = {
    failedLoginCount?: true
    version?: true
  }

  export type AdminUserSumAggregateInputType = {
    failedLoginCount?: true
    version?: true
  }

  export type AdminUserMinAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    passwordHash?: true
    failedLoginCount?: true
    lockedUntil?: true
    lastLoginAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    passwordHash?: true
    failedLoginCount?: true
    lockedUntil?: true
    lastLoginAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    passwordHash?: true
    failedLoginCount?: true
    lockedUntil?: true
    lastLoginAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _avg?: AdminUserAvgAggregateInputType
    _sum?: AdminUserSumAggregateInputType
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    username: string
    displayName: string
    passwordHash: string
    failedLoginCount: number
    lockedUntil: Date | null
    lastLoginAt: Date | null
    version: number
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    passwordHash?: boolean
    failedLoginCount?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    passwordHash?: boolean
    failedLoginCount?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    username?: boolean
    displayName?: boolean
    passwordHash?: boolean
    failedLoginCount?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      displayName: string
      passwordHash: string
      failedLoginCount: number
      lockedUntil: Date | null
      lastLoginAt: Date | null
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */ 
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly username: FieldRef<"AdminUser", 'String'>
    readonly displayName: FieldRef<"AdminUser", 'String'>
    readonly passwordHash: FieldRef<"AdminUser", 'String'>
    readonly failedLoginCount: FieldRef<"AdminUser", 'Int'>
    readonly lockedUntil: FieldRef<"AdminUser", 'DateTime'>
    readonly lastLoginAt: FieldRef<"AdminUser", 'DateTime'>
    readonly version: FieldRef<"AdminUser", 'Int'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
  }


  /**
   * Model PrivateCredential
   */

  export type AggregatePrivateCredential = {
    _count: PrivateCredentialCountAggregateOutputType | null
    _avg: PrivateCredentialAvgAggregateOutputType | null
    _sum: PrivateCredentialSumAggregateOutputType | null
    _min: PrivateCredentialMinAggregateOutputType | null
    _max: PrivateCredentialMaxAggregateOutputType | null
  }

  export type PrivateCredentialAvgAggregateOutputType = {
    failedAttemptCount: number | null
  }

  export type PrivateCredentialSumAggregateOutputType = {
    failedAttemptCount: number | null
  }

  export type PrivateCredentialMinAggregateOutputType = {
    id: string | null
    passwordHash: string | null
    failedAttemptCount: number | null
    lockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrivateCredentialMaxAggregateOutputType = {
    id: string | null
    passwordHash: string | null
    failedAttemptCount: number | null
    lockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrivateCredentialCountAggregateOutputType = {
    id: number
    passwordHash: number
    failedAttemptCount: number
    lockedUntil: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrivateCredentialAvgAggregateInputType = {
    failedAttemptCount?: true
  }

  export type PrivateCredentialSumAggregateInputType = {
    failedAttemptCount?: true
  }

  export type PrivateCredentialMinAggregateInputType = {
    id?: true
    passwordHash?: true
    failedAttemptCount?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrivateCredentialMaxAggregateInputType = {
    id?: true
    passwordHash?: true
    failedAttemptCount?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrivateCredentialCountAggregateInputType = {
    id?: true
    passwordHash?: true
    failedAttemptCount?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrivateCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrivateCredential to aggregate.
     */
    where?: PrivateCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateCredentials to fetch.
     */
    orderBy?: PrivateCredentialOrderByWithRelationInput | PrivateCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrivateCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrivateCredentials
    **/
    _count?: true | PrivateCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrivateCredentialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrivateCredentialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrivateCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrivateCredentialMaxAggregateInputType
  }

  export type GetPrivateCredentialAggregateType<T extends PrivateCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregatePrivateCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrivateCredential[P]>
      : GetScalarType<T[P], AggregatePrivateCredential[P]>
  }




  export type PrivateCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrivateCredentialWhereInput
    orderBy?: PrivateCredentialOrderByWithAggregationInput | PrivateCredentialOrderByWithAggregationInput[]
    by: PrivateCredentialScalarFieldEnum[] | PrivateCredentialScalarFieldEnum
    having?: PrivateCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrivateCredentialCountAggregateInputType | true
    _avg?: PrivateCredentialAvgAggregateInputType
    _sum?: PrivateCredentialSumAggregateInputType
    _min?: PrivateCredentialMinAggregateInputType
    _max?: PrivateCredentialMaxAggregateInputType
  }

  export type PrivateCredentialGroupByOutputType = {
    id: string
    passwordHash: string
    failedAttemptCount: number
    lockedUntil: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PrivateCredentialCountAggregateOutputType | null
    _avg: PrivateCredentialAvgAggregateOutputType | null
    _sum: PrivateCredentialSumAggregateOutputType | null
    _min: PrivateCredentialMinAggregateOutputType | null
    _max: PrivateCredentialMaxAggregateOutputType | null
  }

  type GetPrivateCredentialGroupByPayload<T extends PrivateCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrivateCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrivateCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrivateCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], PrivateCredentialGroupByOutputType[P]>
        }
      >
    >


  export type PrivateCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passwordHash?: boolean
    failedAttemptCount?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["privateCredential"]>

  export type PrivateCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passwordHash?: boolean
    failedAttemptCount?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["privateCredential"]>

  export type PrivateCredentialSelectScalar = {
    id?: boolean
    passwordHash?: boolean
    failedAttemptCount?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PrivateCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrivateCredential"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      passwordHash: string
      failedAttemptCount: number
      lockedUntil: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["privateCredential"]>
    composites: {}
  }

  type PrivateCredentialGetPayload<S extends boolean | null | undefined | PrivateCredentialDefaultArgs> = $Result.GetResult<Prisma.$PrivateCredentialPayload, S>

  type PrivateCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrivateCredentialFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrivateCredentialCountAggregateInputType | true
    }

  export interface PrivateCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrivateCredential'], meta: { name: 'PrivateCredential' } }
    /**
     * Find zero or one PrivateCredential that matches the filter.
     * @param {PrivateCredentialFindUniqueArgs} args - Arguments to find a PrivateCredential
     * @example
     * // Get one PrivateCredential
     * const privateCredential = await prisma.privateCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrivateCredentialFindUniqueArgs>(args: SelectSubset<T, PrivateCredentialFindUniqueArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PrivateCredential that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrivateCredentialFindUniqueOrThrowArgs} args - Arguments to find a PrivateCredential
     * @example
     * // Get one PrivateCredential
     * const privateCredential = await prisma.privateCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrivateCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, PrivateCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PrivateCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialFindFirstArgs} args - Arguments to find a PrivateCredential
     * @example
     * // Get one PrivateCredential
     * const privateCredential = await prisma.privateCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrivateCredentialFindFirstArgs>(args?: SelectSubset<T, PrivateCredentialFindFirstArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PrivateCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialFindFirstOrThrowArgs} args - Arguments to find a PrivateCredential
     * @example
     * // Get one PrivateCredential
     * const privateCredential = await prisma.privateCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrivateCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, PrivateCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PrivateCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrivateCredentials
     * const privateCredentials = await prisma.privateCredential.findMany()
     * 
     * // Get first 10 PrivateCredentials
     * const privateCredentials = await prisma.privateCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const privateCredentialWithIdOnly = await prisma.privateCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrivateCredentialFindManyArgs>(args?: SelectSubset<T, PrivateCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PrivateCredential.
     * @param {PrivateCredentialCreateArgs} args - Arguments to create a PrivateCredential.
     * @example
     * // Create one PrivateCredential
     * const PrivateCredential = await prisma.privateCredential.create({
     *   data: {
     *     // ... data to create a PrivateCredential
     *   }
     * })
     * 
     */
    create<T extends PrivateCredentialCreateArgs>(args: SelectSubset<T, PrivateCredentialCreateArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PrivateCredentials.
     * @param {PrivateCredentialCreateManyArgs} args - Arguments to create many PrivateCredentials.
     * @example
     * // Create many PrivateCredentials
     * const privateCredential = await prisma.privateCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrivateCredentialCreateManyArgs>(args?: SelectSubset<T, PrivateCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrivateCredentials and returns the data saved in the database.
     * @param {PrivateCredentialCreateManyAndReturnArgs} args - Arguments to create many PrivateCredentials.
     * @example
     * // Create many PrivateCredentials
     * const privateCredential = await prisma.privateCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrivateCredentials and only return the `id`
     * const privateCredentialWithIdOnly = await prisma.privateCredential.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrivateCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, PrivateCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PrivateCredential.
     * @param {PrivateCredentialDeleteArgs} args - Arguments to delete one PrivateCredential.
     * @example
     * // Delete one PrivateCredential
     * const PrivateCredential = await prisma.privateCredential.delete({
     *   where: {
     *     // ... filter to delete one PrivateCredential
     *   }
     * })
     * 
     */
    delete<T extends PrivateCredentialDeleteArgs>(args: SelectSubset<T, PrivateCredentialDeleteArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PrivateCredential.
     * @param {PrivateCredentialUpdateArgs} args - Arguments to update one PrivateCredential.
     * @example
     * // Update one PrivateCredential
     * const privateCredential = await prisma.privateCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrivateCredentialUpdateArgs>(args: SelectSubset<T, PrivateCredentialUpdateArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PrivateCredentials.
     * @param {PrivateCredentialDeleteManyArgs} args - Arguments to filter PrivateCredentials to delete.
     * @example
     * // Delete a few PrivateCredentials
     * const { count } = await prisma.privateCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrivateCredentialDeleteManyArgs>(args?: SelectSubset<T, PrivateCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrivateCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrivateCredentials
     * const privateCredential = await prisma.privateCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrivateCredentialUpdateManyArgs>(args: SelectSubset<T, PrivateCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PrivateCredential.
     * @param {PrivateCredentialUpsertArgs} args - Arguments to update or create a PrivateCredential.
     * @example
     * // Update or create a PrivateCredential
     * const privateCredential = await prisma.privateCredential.upsert({
     *   create: {
     *     // ... data to create a PrivateCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrivateCredential we want to update
     *   }
     * })
     */
    upsert<T extends PrivateCredentialUpsertArgs>(args: SelectSubset<T, PrivateCredentialUpsertArgs<ExtArgs>>): Prisma__PrivateCredentialClient<$Result.GetResult<Prisma.$PrivateCredentialPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PrivateCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialCountArgs} args - Arguments to filter PrivateCredentials to count.
     * @example
     * // Count the number of PrivateCredentials
     * const count = await prisma.privateCredential.count({
     *   where: {
     *     // ... the filter for the PrivateCredentials we want to count
     *   }
     * })
    **/
    count<T extends PrivateCredentialCountArgs>(
      args?: Subset<T, PrivateCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrivateCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrivateCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrivateCredentialAggregateArgs>(args: Subset<T, PrivateCredentialAggregateArgs>): Prisma.PrismaPromise<GetPrivateCredentialAggregateType<T>>

    /**
     * Group by PrivateCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrivateCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrivateCredentialGroupByArgs['orderBy'] }
        : { orderBy?: PrivateCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrivateCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrivateCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrivateCredential model
   */
  readonly fields: PrivateCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrivateCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrivateCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PrivateCredential model
   */ 
  interface PrivateCredentialFieldRefs {
    readonly id: FieldRef<"PrivateCredential", 'String'>
    readonly passwordHash: FieldRef<"PrivateCredential", 'String'>
    readonly failedAttemptCount: FieldRef<"PrivateCredential", 'Int'>
    readonly lockedUntil: FieldRef<"PrivateCredential", 'DateTime'>
    readonly createdAt: FieldRef<"PrivateCredential", 'DateTime'>
    readonly updatedAt: FieldRef<"PrivateCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrivateCredential findUnique
   */
  export type PrivateCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter, which PrivateCredential to fetch.
     */
    where: PrivateCredentialWhereUniqueInput
  }

  /**
   * PrivateCredential findUniqueOrThrow
   */
  export type PrivateCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter, which PrivateCredential to fetch.
     */
    where: PrivateCredentialWhereUniqueInput
  }

  /**
   * PrivateCredential findFirst
   */
  export type PrivateCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter, which PrivateCredential to fetch.
     */
    where?: PrivateCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateCredentials to fetch.
     */
    orderBy?: PrivateCredentialOrderByWithRelationInput | PrivateCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrivateCredentials.
     */
    cursor?: PrivateCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrivateCredentials.
     */
    distinct?: PrivateCredentialScalarFieldEnum | PrivateCredentialScalarFieldEnum[]
  }

  /**
   * PrivateCredential findFirstOrThrow
   */
  export type PrivateCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter, which PrivateCredential to fetch.
     */
    where?: PrivateCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateCredentials to fetch.
     */
    orderBy?: PrivateCredentialOrderByWithRelationInput | PrivateCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrivateCredentials.
     */
    cursor?: PrivateCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrivateCredentials.
     */
    distinct?: PrivateCredentialScalarFieldEnum | PrivateCredentialScalarFieldEnum[]
  }

  /**
   * PrivateCredential findMany
   */
  export type PrivateCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter, which PrivateCredentials to fetch.
     */
    where?: PrivateCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateCredentials to fetch.
     */
    orderBy?: PrivateCredentialOrderByWithRelationInput | PrivateCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrivateCredentials.
     */
    cursor?: PrivateCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateCredentials.
     */
    skip?: number
    distinct?: PrivateCredentialScalarFieldEnum | PrivateCredentialScalarFieldEnum[]
  }

  /**
   * PrivateCredential create
   */
  export type PrivateCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * The data needed to create a PrivateCredential.
     */
    data: XOR<PrivateCredentialCreateInput, PrivateCredentialUncheckedCreateInput>
  }

  /**
   * PrivateCredential createMany
   */
  export type PrivateCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrivateCredentials.
     */
    data: PrivateCredentialCreateManyInput | PrivateCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PrivateCredential createManyAndReturn
   */
  export type PrivateCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PrivateCredentials.
     */
    data: PrivateCredentialCreateManyInput | PrivateCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PrivateCredential update
   */
  export type PrivateCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * The data needed to update a PrivateCredential.
     */
    data: XOR<PrivateCredentialUpdateInput, PrivateCredentialUncheckedUpdateInput>
    /**
     * Choose, which PrivateCredential to update.
     */
    where: PrivateCredentialWhereUniqueInput
  }

  /**
   * PrivateCredential updateMany
   */
  export type PrivateCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrivateCredentials.
     */
    data: XOR<PrivateCredentialUpdateManyMutationInput, PrivateCredentialUncheckedUpdateManyInput>
    /**
     * Filter which PrivateCredentials to update
     */
    where?: PrivateCredentialWhereInput
  }

  /**
   * PrivateCredential upsert
   */
  export type PrivateCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * The filter to search for the PrivateCredential to update in case it exists.
     */
    where: PrivateCredentialWhereUniqueInput
    /**
     * In case the PrivateCredential found by the `where` argument doesn't exist, create a new PrivateCredential with this data.
     */
    create: XOR<PrivateCredentialCreateInput, PrivateCredentialUncheckedCreateInput>
    /**
     * In case the PrivateCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrivateCredentialUpdateInput, PrivateCredentialUncheckedUpdateInput>
  }

  /**
   * PrivateCredential delete
   */
  export type PrivateCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
    /**
     * Filter which PrivateCredential to delete.
     */
    where: PrivateCredentialWhereUniqueInput
  }

  /**
   * PrivateCredential deleteMany
   */
  export type PrivateCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrivateCredentials to delete
     */
    where?: PrivateCredentialWhereInput
  }

  /**
   * PrivateCredential without action
   */
  export type PrivateCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateCredential
     */
    select?: PrivateCredentialSelect<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberAvgAggregateOutputType = {
    sequenceNumber: number | null
  }

  export type MemberSumAggregateOutputType = {
    sequenceNumber: number | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    sequenceNumber: number | null
    memberNumber: string | null
    fullName: string | null
    phone: string | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    sequenceNumber: number | null
    memberNumber: string | null
    fullName: string | null
    phone: string | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    sequenceNumber: number
    memberNumber: number
    fullName: number
    phone: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberAvgAggregateInputType = {
    sequenceNumber?: true
  }

  export type MemberSumAggregateInputType = {
    sequenceNumber?: true
  }

  export type MemberMinAggregateInputType = {
    id?: true
    sequenceNumber?: true
    memberNumber?: true
    fullName?: true
    phone?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    sequenceNumber?: true
    memberNumber?: true
    fullName?: true
    phone?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    sequenceNumber?: true
    memberNumber?: true
    fullName?: true
    phone?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _avg?: MemberAvgAggregateInputType
    _sum?: MemberSumAggregateInputType
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    sequenceNumber: number
    memberNumber: string | null
    fullName: string
    phone: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceNumber?: boolean
    memberNumber?: boolean
    fullName?: boolean
    phone?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    privateFinancial?: boolean | Member$privateFinancialArgs<ExtArgs>
    auditLogs?: boolean | Member$auditLogsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceNumber?: boolean
    memberNumber?: boolean
    fullName?: boolean
    phone?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    sequenceNumber?: boolean
    memberNumber?: boolean
    fullName?: boolean
    phone?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    privateFinancial?: boolean | Member$privateFinancialArgs<ExtArgs>
    auditLogs?: boolean | Member$auditLogsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      privateFinancial: Prisma.$MemberPrivateFinancialPayload<ExtArgs> | null
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sequenceNumber: number
      memberNumber: string | null
      fullName: string
      phone: string
      isDeleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    privateFinancial<T extends Member$privateFinancialArgs<ExtArgs> = {}>(args?: Subset<T, Member$privateFinancialArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    auditLogs<T extends Member$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Member$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */ 
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly sequenceNumber: FieldRef<"Member", 'Int'>
    readonly memberNumber: FieldRef<"Member", 'String'>
    readonly fullName: FieldRef<"Member", 'String'>
    readonly phone: FieldRef<"Member", 'String'>
    readonly isDeleted: FieldRef<"Member", 'Boolean'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
  }

  /**
   * Member.privateFinancial
   */
  export type Member$privateFinancialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    where?: MemberPrivateFinancialWhereInput
  }

  /**
   * Member.auditLogs
   */
  export type Member$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model MemberPrivateFinancial
   */

  export type AggregateMemberPrivateFinancial = {
    _count: MemberPrivateFinancialCountAggregateOutputType | null
    _avg: MemberPrivateFinancialAvgAggregateOutputType | null
    _sum: MemberPrivateFinancialSumAggregateOutputType | null
    _min: MemberPrivateFinancialMinAggregateOutputType | null
    _max: MemberPrivateFinancialMaxAggregateOutputType | null
  }

  export type MemberPrivateFinancialAvgAggregateOutputType = {
    plotSize: Decimal | null
    downPayment: Decimal | null
  }

  export type MemberPrivateFinancialSumAggregateOutputType = {
    plotSize: Decimal | null
    downPayment: Decimal | null
  }

  export type MemberPrivateFinancialMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    plotSize: Decimal | null
    downPayment: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberPrivateFinancialMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    plotSize: Decimal | null
    downPayment: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberPrivateFinancialCountAggregateOutputType = {
    id: number
    memberId: number
    plotSize: number
    downPayment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberPrivateFinancialAvgAggregateInputType = {
    plotSize?: true
    downPayment?: true
  }

  export type MemberPrivateFinancialSumAggregateInputType = {
    plotSize?: true
    downPayment?: true
  }

  export type MemberPrivateFinancialMinAggregateInputType = {
    id?: true
    memberId?: true
    plotSize?: true
    downPayment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberPrivateFinancialMaxAggregateInputType = {
    id?: true
    memberId?: true
    plotSize?: true
    downPayment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberPrivateFinancialCountAggregateInputType = {
    id?: true
    memberId?: true
    plotSize?: true
    downPayment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberPrivateFinancialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberPrivateFinancial to aggregate.
     */
    where?: MemberPrivateFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberPrivateFinancials to fetch.
     */
    orderBy?: MemberPrivateFinancialOrderByWithRelationInput | MemberPrivateFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberPrivateFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberPrivateFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberPrivateFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberPrivateFinancials
    **/
    _count?: true | MemberPrivateFinancialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberPrivateFinancialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberPrivateFinancialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberPrivateFinancialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberPrivateFinancialMaxAggregateInputType
  }

  export type GetMemberPrivateFinancialAggregateType<T extends MemberPrivateFinancialAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberPrivateFinancial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberPrivateFinancial[P]>
      : GetScalarType<T[P], AggregateMemberPrivateFinancial[P]>
  }




  export type MemberPrivateFinancialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberPrivateFinancialWhereInput
    orderBy?: MemberPrivateFinancialOrderByWithAggregationInput | MemberPrivateFinancialOrderByWithAggregationInput[]
    by: MemberPrivateFinancialScalarFieldEnum[] | MemberPrivateFinancialScalarFieldEnum
    having?: MemberPrivateFinancialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberPrivateFinancialCountAggregateInputType | true
    _avg?: MemberPrivateFinancialAvgAggregateInputType
    _sum?: MemberPrivateFinancialSumAggregateInputType
    _min?: MemberPrivateFinancialMinAggregateInputType
    _max?: MemberPrivateFinancialMaxAggregateInputType
  }

  export type MemberPrivateFinancialGroupByOutputType = {
    id: string
    memberId: string
    plotSize: Decimal | null
    downPayment: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: MemberPrivateFinancialCountAggregateOutputType | null
    _avg: MemberPrivateFinancialAvgAggregateOutputType | null
    _sum: MemberPrivateFinancialSumAggregateOutputType | null
    _min: MemberPrivateFinancialMinAggregateOutputType | null
    _max: MemberPrivateFinancialMaxAggregateOutputType | null
  }

  type GetMemberPrivateFinancialGroupByPayload<T extends MemberPrivateFinancialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberPrivateFinancialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberPrivateFinancialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberPrivateFinancialGroupByOutputType[P]>
            : GetScalarType<T[P], MemberPrivateFinancialGroupByOutputType[P]>
        }
      >
    >


  export type MemberPrivateFinancialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    plotSize?: boolean
    downPayment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    plans?: boolean | MemberPrivateFinancial$plansArgs<ExtArgs>
    _count?: boolean | MemberPrivateFinancialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberPrivateFinancial"]>

  export type MemberPrivateFinancialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    plotSize?: boolean
    downPayment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberPrivateFinancial"]>

  export type MemberPrivateFinancialSelectScalar = {
    id?: boolean
    memberId?: boolean
    plotSize?: boolean
    downPayment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberPrivateFinancialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    plans?: boolean | MemberPrivateFinancial$plansArgs<ExtArgs>
    _count?: boolean | MemberPrivateFinancialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberPrivateFinancialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }

  export type $MemberPrivateFinancialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberPrivateFinancial"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      plans: Prisma.$InstallmentPlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      plotSize: Prisma.Decimal | null
      downPayment: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberPrivateFinancial"]>
    composites: {}
  }

  type MemberPrivateFinancialGetPayload<S extends boolean | null | undefined | MemberPrivateFinancialDefaultArgs> = $Result.GetResult<Prisma.$MemberPrivateFinancialPayload, S>

  type MemberPrivateFinancialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberPrivateFinancialFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberPrivateFinancialCountAggregateInputType | true
    }

  export interface MemberPrivateFinancialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberPrivateFinancial'], meta: { name: 'MemberPrivateFinancial' } }
    /**
     * Find zero or one MemberPrivateFinancial that matches the filter.
     * @param {MemberPrivateFinancialFindUniqueArgs} args - Arguments to find a MemberPrivateFinancial
     * @example
     * // Get one MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberPrivateFinancialFindUniqueArgs>(args: SelectSubset<T, MemberPrivateFinancialFindUniqueArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MemberPrivateFinancial that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberPrivateFinancialFindUniqueOrThrowArgs} args - Arguments to find a MemberPrivateFinancial
     * @example
     * // Get one MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberPrivateFinancialFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberPrivateFinancialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MemberPrivateFinancial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialFindFirstArgs} args - Arguments to find a MemberPrivateFinancial
     * @example
     * // Get one MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberPrivateFinancialFindFirstArgs>(args?: SelectSubset<T, MemberPrivateFinancialFindFirstArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MemberPrivateFinancial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialFindFirstOrThrowArgs} args - Arguments to find a MemberPrivateFinancial
     * @example
     * // Get one MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberPrivateFinancialFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberPrivateFinancialFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MemberPrivateFinancials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberPrivateFinancials
     * const memberPrivateFinancials = await prisma.memberPrivateFinancial.findMany()
     * 
     * // Get first 10 MemberPrivateFinancials
     * const memberPrivateFinancials = await prisma.memberPrivateFinancial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberPrivateFinancialWithIdOnly = await prisma.memberPrivateFinancial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberPrivateFinancialFindManyArgs>(args?: SelectSubset<T, MemberPrivateFinancialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MemberPrivateFinancial.
     * @param {MemberPrivateFinancialCreateArgs} args - Arguments to create a MemberPrivateFinancial.
     * @example
     * // Create one MemberPrivateFinancial
     * const MemberPrivateFinancial = await prisma.memberPrivateFinancial.create({
     *   data: {
     *     // ... data to create a MemberPrivateFinancial
     *   }
     * })
     * 
     */
    create<T extends MemberPrivateFinancialCreateArgs>(args: SelectSubset<T, MemberPrivateFinancialCreateArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MemberPrivateFinancials.
     * @param {MemberPrivateFinancialCreateManyArgs} args - Arguments to create many MemberPrivateFinancials.
     * @example
     * // Create many MemberPrivateFinancials
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberPrivateFinancialCreateManyArgs>(args?: SelectSubset<T, MemberPrivateFinancialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberPrivateFinancials and returns the data saved in the database.
     * @param {MemberPrivateFinancialCreateManyAndReturnArgs} args - Arguments to create many MemberPrivateFinancials.
     * @example
     * // Create many MemberPrivateFinancials
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberPrivateFinancials and only return the `id`
     * const memberPrivateFinancialWithIdOnly = await prisma.memberPrivateFinancial.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberPrivateFinancialCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberPrivateFinancialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MemberPrivateFinancial.
     * @param {MemberPrivateFinancialDeleteArgs} args - Arguments to delete one MemberPrivateFinancial.
     * @example
     * // Delete one MemberPrivateFinancial
     * const MemberPrivateFinancial = await prisma.memberPrivateFinancial.delete({
     *   where: {
     *     // ... filter to delete one MemberPrivateFinancial
     *   }
     * })
     * 
     */
    delete<T extends MemberPrivateFinancialDeleteArgs>(args: SelectSubset<T, MemberPrivateFinancialDeleteArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MemberPrivateFinancial.
     * @param {MemberPrivateFinancialUpdateArgs} args - Arguments to update one MemberPrivateFinancial.
     * @example
     * // Update one MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberPrivateFinancialUpdateArgs>(args: SelectSubset<T, MemberPrivateFinancialUpdateArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MemberPrivateFinancials.
     * @param {MemberPrivateFinancialDeleteManyArgs} args - Arguments to filter MemberPrivateFinancials to delete.
     * @example
     * // Delete a few MemberPrivateFinancials
     * const { count } = await prisma.memberPrivateFinancial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberPrivateFinancialDeleteManyArgs>(args?: SelectSubset<T, MemberPrivateFinancialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberPrivateFinancials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberPrivateFinancials
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberPrivateFinancialUpdateManyArgs>(args: SelectSubset<T, MemberPrivateFinancialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MemberPrivateFinancial.
     * @param {MemberPrivateFinancialUpsertArgs} args - Arguments to update or create a MemberPrivateFinancial.
     * @example
     * // Update or create a MemberPrivateFinancial
     * const memberPrivateFinancial = await prisma.memberPrivateFinancial.upsert({
     *   create: {
     *     // ... data to create a MemberPrivateFinancial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberPrivateFinancial we want to update
     *   }
     * })
     */
    upsert<T extends MemberPrivateFinancialUpsertArgs>(args: SelectSubset<T, MemberPrivateFinancialUpsertArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MemberPrivateFinancials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialCountArgs} args - Arguments to filter MemberPrivateFinancials to count.
     * @example
     * // Count the number of MemberPrivateFinancials
     * const count = await prisma.memberPrivateFinancial.count({
     *   where: {
     *     // ... the filter for the MemberPrivateFinancials we want to count
     *   }
     * })
    **/
    count<T extends MemberPrivateFinancialCountArgs>(
      args?: Subset<T, MemberPrivateFinancialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberPrivateFinancialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberPrivateFinancial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberPrivateFinancialAggregateArgs>(args: Subset<T, MemberPrivateFinancialAggregateArgs>): Prisma.PrismaPromise<GetMemberPrivateFinancialAggregateType<T>>

    /**
     * Group by MemberPrivateFinancial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberPrivateFinancialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberPrivateFinancialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberPrivateFinancialGroupByArgs['orderBy'] }
        : { orderBy?: MemberPrivateFinancialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberPrivateFinancialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberPrivateFinancialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberPrivateFinancial model
   */
  readonly fields: MemberPrivateFinancialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberPrivateFinancial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberPrivateFinancialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    plans<T extends MemberPrivateFinancial$plansArgs<ExtArgs> = {}>(args?: Subset<T, MemberPrivateFinancial$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberPrivateFinancial model
   */ 
  interface MemberPrivateFinancialFieldRefs {
    readonly id: FieldRef<"MemberPrivateFinancial", 'String'>
    readonly memberId: FieldRef<"MemberPrivateFinancial", 'String'>
    readonly plotSize: FieldRef<"MemberPrivateFinancial", 'Decimal'>
    readonly downPayment: FieldRef<"MemberPrivateFinancial", 'Decimal'>
    readonly createdAt: FieldRef<"MemberPrivateFinancial", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberPrivateFinancial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberPrivateFinancial findUnique
   */
  export type MemberPrivateFinancialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter, which MemberPrivateFinancial to fetch.
     */
    where: MemberPrivateFinancialWhereUniqueInput
  }

  /**
   * MemberPrivateFinancial findUniqueOrThrow
   */
  export type MemberPrivateFinancialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter, which MemberPrivateFinancial to fetch.
     */
    where: MemberPrivateFinancialWhereUniqueInput
  }

  /**
   * MemberPrivateFinancial findFirst
   */
  export type MemberPrivateFinancialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter, which MemberPrivateFinancial to fetch.
     */
    where?: MemberPrivateFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberPrivateFinancials to fetch.
     */
    orderBy?: MemberPrivateFinancialOrderByWithRelationInput | MemberPrivateFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberPrivateFinancials.
     */
    cursor?: MemberPrivateFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberPrivateFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberPrivateFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberPrivateFinancials.
     */
    distinct?: MemberPrivateFinancialScalarFieldEnum | MemberPrivateFinancialScalarFieldEnum[]
  }

  /**
   * MemberPrivateFinancial findFirstOrThrow
   */
  export type MemberPrivateFinancialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter, which MemberPrivateFinancial to fetch.
     */
    where?: MemberPrivateFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberPrivateFinancials to fetch.
     */
    orderBy?: MemberPrivateFinancialOrderByWithRelationInput | MemberPrivateFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberPrivateFinancials.
     */
    cursor?: MemberPrivateFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberPrivateFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberPrivateFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberPrivateFinancials.
     */
    distinct?: MemberPrivateFinancialScalarFieldEnum | MemberPrivateFinancialScalarFieldEnum[]
  }

  /**
   * MemberPrivateFinancial findMany
   */
  export type MemberPrivateFinancialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter, which MemberPrivateFinancials to fetch.
     */
    where?: MemberPrivateFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberPrivateFinancials to fetch.
     */
    orderBy?: MemberPrivateFinancialOrderByWithRelationInput | MemberPrivateFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberPrivateFinancials.
     */
    cursor?: MemberPrivateFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberPrivateFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberPrivateFinancials.
     */
    skip?: number
    distinct?: MemberPrivateFinancialScalarFieldEnum | MemberPrivateFinancialScalarFieldEnum[]
  }

  /**
   * MemberPrivateFinancial create
   */
  export type MemberPrivateFinancialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberPrivateFinancial.
     */
    data: XOR<MemberPrivateFinancialCreateInput, MemberPrivateFinancialUncheckedCreateInput>
  }

  /**
   * MemberPrivateFinancial createMany
   */
  export type MemberPrivateFinancialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberPrivateFinancials.
     */
    data: MemberPrivateFinancialCreateManyInput | MemberPrivateFinancialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberPrivateFinancial createManyAndReturn
   */
  export type MemberPrivateFinancialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MemberPrivateFinancials.
     */
    data: MemberPrivateFinancialCreateManyInput | MemberPrivateFinancialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberPrivateFinancial update
   */
  export type MemberPrivateFinancialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberPrivateFinancial.
     */
    data: XOR<MemberPrivateFinancialUpdateInput, MemberPrivateFinancialUncheckedUpdateInput>
    /**
     * Choose, which MemberPrivateFinancial to update.
     */
    where: MemberPrivateFinancialWhereUniqueInput
  }

  /**
   * MemberPrivateFinancial updateMany
   */
  export type MemberPrivateFinancialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberPrivateFinancials.
     */
    data: XOR<MemberPrivateFinancialUpdateManyMutationInput, MemberPrivateFinancialUncheckedUpdateManyInput>
    /**
     * Filter which MemberPrivateFinancials to update
     */
    where?: MemberPrivateFinancialWhereInput
  }

  /**
   * MemberPrivateFinancial upsert
   */
  export type MemberPrivateFinancialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberPrivateFinancial to update in case it exists.
     */
    where: MemberPrivateFinancialWhereUniqueInput
    /**
     * In case the MemberPrivateFinancial found by the `where` argument doesn't exist, create a new MemberPrivateFinancial with this data.
     */
    create: XOR<MemberPrivateFinancialCreateInput, MemberPrivateFinancialUncheckedCreateInput>
    /**
     * In case the MemberPrivateFinancial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberPrivateFinancialUpdateInput, MemberPrivateFinancialUncheckedUpdateInput>
  }

  /**
   * MemberPrivateFinancial delete
   */
  export type MemberPrivateFinancialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
    /**
     * Filter which MemberPrivateFinancial to delete.
     */
    where: MemberPrivateFinancialWhereUniqueInput
  }

  /**
   * MemberPrivateFinancial deleteMany
   */
  export type MemberPrivateFinancialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberPrivateFinancials to delete
     */
    where?: MemberPrivateFinancialWhereInput
  }

  /**
   * MemberPrivateFinancial.plans
   */
  export type MemberPrivateFinancial$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    where?: InstallmentPlanWhereInput
    orderBy?: InstallmentPlanOrderByWithRelationInput | InstallmentPlanOrderByWithRelationInput[]
    cursor?: InstallmentPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstallmentPlanScalarFieldEnum | InstallmentPlanScalarFieldEnum[]
  }

  /**
   * MemberPrivateFinancial without action
   */
  export type MemberPrivateFinancialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPrivateFinancial
     */
    select?: MemberPrivateFinancialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberPrivateFinancialInclude<ExtArgs> | null
  }


  /**
   * Model InstallmentPlan
   */

  export type AggregateInstallmentPlan = {
    _count: InstallmentPlanCountAggregateOutputType | null
    _avg: InstallmentPlanAvgAggregateOutputType | null
    _sum: InstallmentPlanSumAggregateOutputType | null
    _min: InstallmentPlanMinAggregateOutputType | null
    _max: InstallmentPlanMaxAggregateOutputType | null
  }

  export type InstallmentPlanAvgAggregateOutputType = {
    totalInstallments: number | null
  }

  export type InstallmentPlanSumAggregateOutputType = {
    totalInstallments: number | null
  }

  export type InstallmentPlanMinAggregateOutputType = {
    id: string | null
    privateFinancialId: string | null
    status: $Enums.PlanStatus | null
    totalInstallments: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentPlanMaxAggregateOutputType = {
    id: string | null
    privateFinancialId: string | null
    status: $Enums.PlanStatus | null
    totalInstallments: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentPlanCountAggregateOutputType = {
    id: number
    privateFinancialId: number
    status: number
    totalInstallments: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InstallmentPlanAvgAggregateInputType = {
    totalInstallments?: true
  }

  export type InstallmentPlanSumAggregateInputType = {
    totalInstallments?: true
  }

  export type InstallmentPlanMinAggregateInputType = {
    id?: true
    privateFinancialId?: true
    status?: true
    totalInstallments?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentPlanMaxAggregateInputType = {
    id?: true
    privateFinancialId?: true
    status?: true
    totalInstallments?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentPlanCountAggregateInputType = {
    id?: true
    privateFinancialId?: true
    status?: true
    totalInstallments?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InstallmentPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstallmentPlan to aggregate.
     */
    where?: InstallmentPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallmentPlans to fetch.
     */
    orderBy?: InstallmentPlanOrderByWithRelationInput | InstallmentPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstallmentPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallmentPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallmentPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstallmentPlans
    **/
    _count?: true | InstallmentPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstallmentPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstallmentPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstallmentPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstallmentPlanMaxAggregateInputType
  }

  export type GetInstallmentPlanAggregateType<T extends InstallmentPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateInstallmentPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstallmentPlan[P]>
      : GetScalarType<T[P], AggregateInstallmentPlan[P]>
  }




  export type InstallmentPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentPlanWhereInput
    orderBy?: InstallmentPlanOrderByWithAggregationInput | InstallmentPlanOrderByWithAggregationInput[]
    by: InstallmentPlanScalarFieldEnum[] | InstallmentPlanScalarFieldEnum
    having?: InstallmentPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstallmentPlanCountAggregateInputType | true
    _avg?: InstallmentPlanAvgAggregateInputType
    _sum?: InstallmentPlanSumAggregateInputType
    _min?: InstallmentPlanMinAggregateInputType
    _max?: InstallmentPlanMaxAggregateInputType
  }

  export type InstallmentPlanGroupByOutputType = {
    id: string
    privateFinancialId: string
    status: $Enums.PlanStatus
    totalInstallments: number
    createdAt: Date
    updatedAt: Date
    _count: InstallmentPlanCountAggregateOutputType | null
    _avg: InstallmentPlanAvgAggregateOutputType | null
    _sum: InstallmentPlanSumAggregateOutputType | null
    _min: InstallmentPlanMinAggregateOutputType | null
    _max: InstallmentPlanMaxAggregateOutputType | null
  }

  type GetInstallmentPlanGroupByPayload<T extends InstallmentPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstallmentPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstallmentPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstallmentPlanGroupByOutputType[P]>
            : GetScalarType<T[P], InstallmentPlanGroupByOutputType[P]>
        }
      >
    >


  export type InstallmentPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    privateFinancialId?: boolean
    status?: boolean
    totalInstallments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    privateFinancial?: boolean | MemberPrivateFinancialDefaultArgs<ExtArgs>
    installments?: boolean | InstallmentPlan$installmentsArgs<ExtArgs>
    _count?: boolean | InstallmentPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installmentPlan"]>

  export type InstallmentPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    privateFinancialId?: boolean
    status?: boolean
    totalInstallments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    privateFinancial?: boolean | MemberPrivateFinancialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installmentPlan"]>

  export type InstallmentPlanSelectScalar = {
    id?: boolean
    privateFinancialId?: boolean
    status?: boolean
    totalInstallments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InstallmentPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    privateFinancial?: boolean | MemberPrivateFinancialDefaultArgs<ExtArgs>
    installments?: boolean | InstallmentPlan$installmentsArgs<ExtArgs>
    _count?: boolean | InstallmentPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstallmentPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    privateFinancial?: boolean | MemberPrivateFinancialDefaultArgs<ExtArgs>
  }

  export type $InstallmentPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InstallmentPlan"
    objects: {
      privateFinancial: Prisma.$MemberPrivateFinancialPayload<ExtArgs>
      installments: Prisma.$InstallmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      privateFinancialId: string
      status: $Enums.PlanStatus
      totalInstallments: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["installmentPlan"]>
    composites: {}
  }

  type InstallmentPlanGetPayload<S extends boolean | null | undefined | InstallmentPlanDefaultArgs> = $Result.GetResult<Prisma.$InstallmentPlanPayload, S>

  type InstallmentPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstallmentPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstallmentPlanCountAggregateInputType | true
    }

  export interface InstallmentPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InstallmentPlan'], meta: { name: 'InstallmentPlan' } }
    /**
     * Find zero or one InstallmentPlan that matches the filter.
     * @param {InstallmentPlanFindUniqueArgs} args - Arguments to find a InstallmentPlan
     * @example
     * // Get one InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallmentPlanFindUniqueArgs>(args: SelectSubset<T, InstallmentPlanFindUniqueArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InstallmentPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstallmentPlanFindUniqueOrThrowArgs} args - Arguments to find a InstallmentPlan
     * @example
     * // Get one InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallmentPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, InstallmentPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InstallmentPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanFindFirstArgs} args - Arguments to find a InstallmentPlan
     * @example
     * // Get one InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallmentPlanFindFirstArgs>(args?: SelectSubset<T, InstallmentPlanFindFirstArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InstallmentPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanFindFirstOrThrowArgs} args - Arguments to find a InstallmentPlan
     * @example
     * // Get one InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallmentPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, InstallmentPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InstallmentPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstallmentPlans
     * const installmentPlans = await prisma.installmentPlan.findMany()
     * 
     * // Get first 10 InstallmentPlans
     * const installmentPlans = await prisma.installmentPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const installmentPlanWithIdOnly = await prisma.installmentPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstallmentPlanFindManyArgs>(args?: SelectSubset<T, InstallmentPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InstallmentPlan.
     * @param {InstallmentPlanCreateArgs} args - Arguments to create a InstallmentPlan.
     * @example
     * // Create one InstallmentPlan
     * const InstallmentPlan = await prisma.installmentPlan.create({
     *   data: {
     *     // ... data to create a InstallmentPlan
     *   }
     * })
     * 
     */
    create<T extends InstallmentPlanCreateArgs>(args: SelectSubset<T, InstallmentPlanCreateArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InstallmentPlans.
     * @param {InstallmentPlanCreateManyArgs} args - Arguments to create many InstallmentPlans.
     * @example
     * // Create many InstallmentPlans
     * const installmentPlan = await prisma.installmentPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstallmentPlanCreateManyArgs>(args?: SelectSubset<T, InstallmentPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InstallmentPlans and returns the data saved in the database.
     * @param {InstallmentPlanCreateManyAndReturnArgs} args - Arguments to create many InstallmentPlans.
     * @example
     * // Create many InstallmentPlans
     * const installmentPlan = await prisma.installmentPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InstallmentPlans and only return the `id`
     * const installmentPlanWithIdOnly = await prisma.installmentPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstallmentPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, InstallmentPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InstallmentPlan.
     * @param {InstallmentPlanDeleteArgs} args - Arguments to delete one InstallmentPlan.
     * @example
     * // Delete one InstallmentPlan
     * const InstallmentPlan = await prisma.installmentPlan.delete({
     *   where: {
     *     // ... filter to delete one InstallmentPlan
     *   }
     * })
     * 
     */
    delete<T extends InstallmentPlanDeleteArgs>(args: SelectSubset<T, InstallmentPlanDeleteArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InstallmentPlan.
     * @param {InstallmentPlanUpdateArgs} args - Arguments to update one InstallmentPlan.
     * @example
     * // Update one InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstallmentPlanUpdateArgs>(args: SelectSubset<T, InstallmentPlanUpdateArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InstallmentPlans.
     * @param {InstallmentPlanDeleteManyArgs} args - Arguments to filter InstallmentPlans to delete.
     * @example
     * // Delete a few InstallmentPlans
     * const { count } = await prisma.installmentPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstallmentPlanDeleteManyArgs>(args?: SelectSubset<T, InstallmentPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstallmentPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstallmentPlans
     * const installmentPlan = await prisma.installmentPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstallmentPlanUpdateManyArgs>(args: SelectSubset<T, InstallmentPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InstallmentPlan.
     * @param {InstallmentPlanUpsertArgs} args - Arguments to update or create a InstallmentPlan.
     * @example
     * // Update or create a InstallmentPlan
     * const installmentPlan = await prisma.installmentPlan.upsert({
     *   create: {
     *     // ... data to create a InstallmentPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstallmentPlan we want to update
     *   }
     * })
     */
    upsert<T extends InstallmentPlanUpsertArgs>(args: SelectSubset<T, InstallmentPlanUpsertArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InstallmentPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanCountArgs} args - Arguments to filter InstallmentPlans to count.
     * @example
     * // Count the number of InstallmentPlans
     * const count = await prisma.installmentPlan.count({
     *   where: {
     *     // ... the filter for the InstallmentPlans we want to count
     *   }
     * })
    **/
    count<T extends InstallmentPlanCountArgs>(
      args?: Subset<T, InstallmentPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstallmentPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstallmentPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstallmentPlanAggregateArgs>(args: Subset<T, InstallmentPlanAggregateArgs>): Prisma.PrismaPromise<GetInstallmentPlanAggregateType<T>>

    /**
     * Group by InstallmentPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstallmentPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstallmentPlanGroupByArgs['orderBy'] }
        : { orderBy?: InstallmentPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstallmentPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallmentPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InstallmentPlan model
   */
  readonly fields: InstallmentPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InstallmentPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstallmentPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    privateFinancial<T extends MemberPrivateFinancialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberPrivateFinancialDefaultArgs<ExtArgs>>): Prisma__MemberPrivateFinancialClient<$Result.GetResult<Prisma.$MemberPrivateFinancialPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    installments<T extends InstallmentPlan$installmentsArgs<ExtArgs> = {}>(args?: Subset<T, InstallmentPlan$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InstallmentPlan model
   */ 
  interface InstallmentPlanFieldRefs {
    readonly id: FieldRef<"InstallmentPlan", 'String'>
    readonly privateFinancialId: FieldRef<"InstallmentPlan", 'String'>
    readonly status: FieldRef<"InstallmentPlan", 'PlanStatus'>
    readonly totalInstallments: FieldRef<"InstallmentPlan", 'Int'>
    readonly createdAt: FieldRef<"InstallmentPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"InstallmentPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InstallmentPlan findUnique
   */
  export type InstallmentPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter, which InstallmentPlan to fetch.
     */
    where: InstallmentPlanWhereUniqueInput
  }

  /**
   * InstallmentPlan findUniqueOrThrow
   */
  export type InstallmentPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter, which InstallmentPlan to fetch.
     */
    where: InstallmentPlanWhereUniqueInput
  }

  /**
   * InstallmentPlan findFirst
   */
  export type InstallmentPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter, which InstallmentPlan to fetch.
     */
    where?: InstallmentPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallmentPlans to fetch.
     */
    orderBy?: InstallmentPlanOrderByWithRelationInput | InstallmentPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstallmentPlans.
     */
    cursor?: InstallmentPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallmentPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallmentPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstallmentPlans.
     */
    distinct?: InstallmentPlanScalarFieldEnum | InstallmentPlanScalarFieldEnum[]
  }

  /**
   * InstallmentPlan findFirstOrThrow
   */
  export type InstallmentPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter, which InstallmentPlan to fetch.
     */
    where?: InstallmentPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallmentPlans to fetch.
     */
    orderBy?: InstallmentPlanOrderByWithRelationInput | InstallmentPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstallmentPlans.
     */
    cursor?: InstallmentPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallmentPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallmentPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstallmentPlans.
     */
    distinct?: InstallmentPlanScalarFieldEnum | InstallmentPlanScalarFieldEnum[]
  }

  /**
   * InstallmentPlan findMany
   */
  export type InstallmentPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter, which InstallmentPlans to fetch.
     */
    where?: InstallmentPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallmentPlans to fetch.
     */
    orderBy?: InstallmentPlanOrderByWithRelationInput | InstallmentPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstallmentPlans.
     */
    cursor?: InstallmentPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallmentPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallmentPlans.
     */
    skip?: number
    distinct?: InstallmentPlanScalarFieldEnum | InstallmentPlanScalarFieldEnum[]
  }

  /**
   * InstallmentPlan create
   */
  export type InstallmentPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a InstallmentPlan.
     */
    data: XOR<InstallmentPlanCreateInput, InstallmentPlanUncheckedCreateInput>
  }

  /**
   * InstallmentPlan createMany
   */
  export type InstallmentPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InstallmentPlans.
     */
    data: InstallmentPlanCreateManyInput | InstallmentPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InstallmentPlan createManyAndReturn
   */
  export type InstallmentPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InstallmentPlans.
     */
    data: InstallmentPlanCreateManyInput | InstallmentPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InstallmentPlan update
   */
  export type InstallmentPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a InstallmentPlan.
     */
    data: XOR<InstallmentPlanUpdateInput, InstallmentPlanUncheckedUpdateInput>
    /**
     * Choose, which InstallmentPlan to update.
     */
    where: InstallmentPlanWhereUniqueInput
  }

  /**
   * InstallmentPlan updateMany
   */
  export type InstallmentPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InstallmentPlans.
     */
    data: XOR<InstallmentPlanUpdateManyMutationInput, InstallmentPlanUncheckedUpdateManyInput>
    /**
     * Filter which InstallmentPlans to update
     */
    where?: InstallmentPlanWhereInput
  }

  /**
   * InstallmentPlan upsert
   */
  export type InstallmentPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the InstallmentPlan to update in case it exists.
     */
    where: InstallmentPlanWhereUniqueInput
    /**
     * In case the InstallmentPlan found by the `where` argument doesn't exist, create a new InstallmentPlan with this data.
     */
    create: XOR<InstallmentPlanCreateInput, InstallmentPlanUncheckedCreateInput>
    /**
     * In case the InstallmentPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstallmentPlanUpdateInput, InstallmentPlanUncheckedUpdateInput>
  }

  /**
   * InstallmentPlan delete
   */
  export type InstallmentPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
    /**
     * Filter which InstallmentPlan to delete.
     */
    where: InstallmentPlanWhereUniqueInput
  }

  /**
   * InstallmentPlan deleteMany
   */
  export type InstallmentPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstallmentPlans to delete
     */
    where?: InstallmentPlanWhereInput
  }

  /**
   * InstallmentPlan.installments
   */
  export type InstallmentPlan$installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    cursor?: InstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * InstallmentPlan without action
   */
  export type InstallmentPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentPlan
     */
    select?: InstallmentPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentPlanInclude<ExtArgs> | null
  }


  /**
   * Model Installment
   */

  export type AggregateInstallment = {
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  export type InstallmentAvgAggregateOutputType = {
    installmentNumber: number | null
    amount: Decimal | null
  }

  export type InstallmentSumAggregateOutputType = {
    installmentNumber: number | null
    amount: Decimal | null
  }

  export type InstallmentMinAggregateOutputType = {
    id: string | null
    planId: string | null
    installmentNumber: number | null
    amount: Decimal | null
    dueDate: Date | null
    status: $Enums.PaymentStatus | null
    bankId: string | null
    paymentDate: Date | null
    receiptNumber: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    installmentNumber: number | null
    amount: Decimal | null
    dueDate: Date | null
    status: $Enums.PaymentStatus | null
    bankId: string | null
    paymentDate: Date | null
    receiptNumber: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstallmentCountAggregateOutputType = {
    id: number
    planId: number
    installmentNumber: number
    amount: number
    dueDate: number
    status: number
    bankId: number
    paymentDate: number
    receiptNumber: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InstallmentAvgAggregateInputType = {
    installmentNumber?: true
    amount?: true
  }

  export type InstallmentSumAggregateInputType = {
    installmentNumber?: true
    amount?: true
  }

  export type InstallmentMinAggregateInputType = {
    id?: true
    planId?: true
    installmentNumber?: true
    amount?: true
    dueDate?: true
    status?: true
    bankId?: true
    paymentDate?: true
    receiptNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentMaxAggregateInputType = {
    id?: true
    planId?: true
    installmentNumber?: true
    amount?: true
    dueDate?: true
    status?: true
    bankId?: true
    paymentDate?: true
    receiptNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstallmentCountAggregateInputType = {
    id?: true
    planId?: true
    installmentNumber?: true
    amount?: true
    dueDate?: true
    status?: true
    bankId?: true
    paymentDate?: true
    receiptNumber?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InstallmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installment to aggregate.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Installments
    **/
    _count?: true | InstallmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstallmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstallmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstallmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstallmentMaxAggregateInputType
  }

  export type GetInstallmentAggregateType<T extends InstallmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstallment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstallment[P]>
      : GetScalarType<T[P], AggregateInstallment[P]>
  }




  export type InstallmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithAggregationInput | InstallmentOrderByWithAggregationInput[]
    by: InstallmentScalarFieldEnum[] | InstallmentScalarFieldEnum
    having?: InstallmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstallmentCountAggregateInputType | true
    _avg?: InstallmentAvgAggregateInputType
    _sum?: InstallmentSumAggregateInputType
    _min?: InstallmentMinAggregateInputType
    _max?: InstallmentMaxAggregateInputType
  }

  export type InstallmentGroupByOutputType = {
    id: string
    planId: string
    installmentNumber: number
    amount: Decimal
    dueDate: Date
    status: $Enums.PaymentStatus
    bankId: string | null
    paymentDate: Date | null
    receiptNumber: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: InstallmentCountAggregateOutputType | null
    _avg: InstallmentAvgAggregateOutputType | null
    _sum: InstallmentSumAggregateOutputType | null
    _min: InstallmentMinAggregateOutputType | null
    _max: InstallmentMaxAggregateOutputType | null
  }

  type GetInstallmentGroupByPayload<T extends InstallmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstallmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstallmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
            : GetScalarType<T[P], InstallmentGroupByOutputType[P]>
        }
      >
    >


  export type InstallmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    installmentNumber?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    bankId?: boolean
    paymentDate?: boolean
    receiptNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | InstallmentPlanDefaultArgs<ExtArgs>
    bank?: boolean | Installment$bankArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    installmentNumber?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    bankId?: boolean
    paymentDate?: boolean
    receiptNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | InstallmentPlanDefaultArgs<ExtArgs>
    bank?: boolean | Installment$bankArgs<ExtArgs>
  }, ExtArgs["result"]["installment"]>

  export type InstallmentSelectScalar = {
    id?: boolean
    planId?: boolean
    installmentNumber?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    bankId?: boolean
    paymentDate?: boolean
    receiptNumber?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InstallmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | InstallmentPlanDefaultArgs<ExtArgs>
    bank?: boolean | Installment$bankArgs<ExtArgs>
  }
  export type InstallmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | InstallmentPlanDefaultArgs<ExtArgs>
    bank?: boolean | Installment$bankArgs<ExtArgs>
  }

  export type $InstallmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Installment"
    objects: {
      plan: Prisma.$InstallmentPlanPayload<ExtArgs>
      bank: Prisma.$BankPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      installmentNumber: number
      amount: Prisma.Decimal
      dueDate: Date
      status: $Enums.PaymentStatus
      bankId: string | null
      paymentDate: Date | null
      receiptNumber: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["installment"]>
    composites: {}
  }

  type InstallmentGetPayload<S extends boolean | null | undefined | InstallmentDefaultArgs> = $Result.GetResult<Prisma.$InstallmentPayload, S>

  type InstallmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstallmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstallmentCountAggregateInputType | true
    }

  export interface InstallmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Installment'], meta: { name: 'Installment' } }
    /**
     * Find zero or one Installment that matches the filter.
     * @param {InstallmentFindUniqueArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallmentFindUniqueArgs>(args: SelectSubset<T, InstallmentFindUniqueArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Installment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstallmentFindUniqueOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Installment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallmentFindFirstArgs>(args?: SelectSubset<T, InstallmentFindFirstArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Installment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindFirstOrThrowArgs} args - Arguments to find a Installment
     * @example
     * // Get one Installment
     * const installment = await prisma.installment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Installments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Installments
     * const installments = await prisma.installment.findMany()
     * 
     * // Get first 10 Installments
     * const installments = await prisma.installment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const installmentWithIdOnly = await prisma.installment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstallmentFindManyArgs>(args?: SelectSubset<T, InstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Installment.
     * @param {InstallmentCreateArgs} args - Arguments to create a Installment.
     * @example
     * // Create one Installment
     * const Installment = await prisma.installment.create({
     *   data: {
     *     // ... data to create a Installment
     *   }
     * })
     * 
     */
    create<T extends InstallmentCreateArgs>(args: SelectSubset<T, InstallmentCreateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Installments.
     * @param {InstallmentCreateManyArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstallmentCreateManyArgs>(args?: SelectSubset<T, InstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Installments and returns the data saved in the database.
     * @param {InstallmentCreateManyAndReturnArgs} args - Arguments to create many Installments.
     * @example
     * // Create many Installments
     * const installment = await prisma.installment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Installments and only return the `id`
     * const installmentWithIdOnly = await prisma.installment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstallmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Installment.
     * @param {InstallmentDeleteArgs} args - Arguments to delete one Installment.
     * @example
     * // Delete one Installment
     * const Installment = await prisma.installment.delete({
     *   where: {
     *     // ... filter to delete one Installment
     *   }
     * })
     * 
     */
    delete<T extends InstallmentDeleteArgs>(args: SelectSubset<T, InstallmentDeleteArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Installment.
     * @param {InstallmentUpdateArgs} args - Arguments to update one Installment.
     * @example
     * // Update one Installment
     * const installment = await prisma.installment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstallmentUpdateArgs>(args: SelectSubset<T, InstallmentUpdateArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Installments.
     * @param {InstallmentDeleteManyArgs} args - Arguments to filter Installments to delete.
     * @example
     * // Delete a few Installments
     * const { count } = await prisma.installment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstallmentDeleteManyArgs>(args?: SelectSubset<T, InstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Installments
     * const installment = await prisma.installment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstallmentUpdateManyArgs>(args: SelectSubset<T, InstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Installment.
     * @param {InstallmentUpsertArgs} args - Arguments to update or create a Installment.
     * @example
     * // Update or create a Installment
     * const installment = await prisma.installment.upsert({
     *   create: {
     *     // ... data to create a Installment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Installment we want to update
     *   }
     * })
     */
    upsert<T extends InstallmentUpsertArgs>(args: SelectSubset<T, InstallmentUpsertArgs<ExtArgs>>): Prisma__InstallmentClient<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Installments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentCountArgs} args - Arguments to filter Installments to count.
     * @example
     * // Count the number of Installments
     * const count = await prisma.installment.count({
     *   where: {
     *     // ... the filter for the Installments we want to count
     *   }
     * })
    **/
    count<T extends InstallmentCountArgs>(
      args?: Subset<T, InstallmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstallmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstallmentAggregateArgs>(args: Subset<T, InstallmentAggregateArgs>): Prisma.PrismaPromise<GetInstallmentAggregateType<T>>

    /**
     * Group by Installment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstallmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstallmentGroupByArgs['orderBy'] }
        : { orderBy?: InstallmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Installment model
   */
  readonly fields: InstallmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Installment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstallmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends InstallmentPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstallmentPlanDefaultArgs<ExtArgs>>): Prisma__InstallmentPlanClient<$Result.GetResult<Prisma.$InstallmentPlanPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    bank<T extends Installment$bankArgs<ExtArgs> = {}>(args?: Subset<T, Installment$bankArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Installment model
   */ 
  interface InstallmentFieldRefs {
    readonly id: FieldRef<"Installment", 'String'>
    readonly planId: FieldRef<"Installment", 'String'>
    readonly installmentNumber: FieldRef<"Installment", 'Int'>
    readonly amount: FieldRef<"Installment", 'Decimal'>
    readonly dueDate: FieldRef<"Installment", 'DateTime'>
    readonly status: FieldRef<"Installment", 'PaymentStatus'>
    readonly bankId: FieldRef<"Installment", 'String'>
    readonly paymentDate: FieldRef<"Installment", 'DateTime'>
    readonly receiptNumber: FieldRef<"Installment", 'String'>
    readonly notes: FieldRef<"Installment", 'String'>
    readonly createdAt: FieldRef<"Installment", 'DateTime'>
    readonly updatedAt: FieldRef<"Installment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Installment findUnique
   */
  export type InstallmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findUniqueOrThrow
   */
  export type InstallmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment findFirst
   */
  export type InstallmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findFirstOrThrow
   */
  export type InstallmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installment to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Installments.
     */
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment findMany
   */
  export type InstallmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter, which Installments to fetch.
     */
    where?: InstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Installments to fetch.
     */
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Installments.
     */
    cursor?: InstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Installments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Installments.
     */
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Installment create
   */
  export type InstallmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Installment.
     */
    data: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
  }

  /**
   * Installment createMany
   */
  export type InstallmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Installment createManyAndReturn
   */
  export type InstallmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Installments.
     */
    data: InstallmentCreateManyInput | InstallmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Installment update
   */
  export type InstallmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Installment.
     */
    data: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
    /**
     * Choose, which Installment to update.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment updateMany
   */
  export type InstallmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Installments.
     */
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyInput>
    /**
     * Filter which Installments to update
     */
    where?: InstallmentWhereInput
  }

  /**
   * Installment upsert
   */
  export type InstallmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Installment to update in case it exists.
     */
    where: InstallmentWhereUniqueInput
    /**
     * In case the Installment found by the `where` argument doesn't exist, create a new Installment with this data.
     */
    create: XOR<InstallmentCreateInput, InstallmentUncheckedCreateInput>
    /**
     * In case the Installment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstallmentUpdateInput, InstallmentUncheckedUpdateInput>
  }

  /**
   * Installment delete
   */
  export type InstallmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    /**
     * Filter which Installment to delete.
     */
    where: InstallmentWhereUniqueInput
  }

  /**
   * Installment deleteMany
   */
  export type InstallmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Installments to delete
     */
    where?: InstallmentWhereInput
  }

  /**
   * Installment.bank
   */
  export type Installment$bankArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    where?: BankWhereInput
  }

  /**
   * Installment without action
   */
  export type InstallmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
  }


  /**
   * Model Bank
   */

  export type AggregateBank = {
    _count: BankCountAggregateOutputType | null
    _min: BankMinAggregateOutputType | null
    _max: BankMaxAggregateOutputType | null
  }

  export type BankMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    logoAsset: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BankMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    logoAsset: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BankCountAggregateOutputType = {
    id: number
    name: number
    code: number
    logoAsset: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BankMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    logoAsset?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BankMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    logoAsset?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BankCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    logoAsset?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BankAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bank to aggregate.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Banks
    **/
    _count?: true | BankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankMaxAggregateInputType
  }

  export type GetBankAggregateType<T extends BankAggregateArgs> = {
        [P in keyof T & keyof AggregateBank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBank[P]>
      : GetScalarType<T[P], AggregateBank[P]>
  }




  export type BankGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankWhereInput
    orderBy?: BankOrderByWithAggregationInput | BankOrderByWithAggregationInput[]
    by: BankScalarFieldEnum[] | BankScalarFieldEnum
    having?: BankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankCountAggregateInputType | true
    _min?: BankMinAggregateInputType
    _max?: BankMaxAggregateInputType
  }

  export type BankGroupByOutputType = {
    id: string
    name: string
    code: string
    logoAsset: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: BankCountAggregateOutputType | null
    _min: BankMinAggregateOutputType | null
    _max: BankMaxAggregateOutputType | null
  }

  type GetBankGroupByPayload<T extends BankGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankGroupByOutputType[P]>
            : GetScalarType<T[P], BankGroupByOutputType[P]>
        }
      >
    >


  export type BankSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    logoAsset?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    installments?: boolean | Bank$installmentsArgs<ExtArgs>
    _count?: boolean | BankCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank"]>

  export type BankSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    logoAsset?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bank"]>

  export type BankSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    logoAsset?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BankInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | Bank$installmentsArgs<ExtArgs>
    _count?: boolean | BankCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BankIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BankPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bank"
    objects: {
      installments: Prisma.$InstallmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      logoAsset: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bank"]>
    composites: {}
  }

  type BankGetPayload<S extends boolean | null | undefined | BankDefaultArgs> = $Result.GetResult<Prisma.$BankPayload, S>

  type BankCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BankFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BankCountAggregateInputType | true
    }

  export interface BankDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bank'], meta: { name: 'Bank' } }
    /**
     * Find zero or one Bank that matches the filter.
     * @param {BankFindUniqueArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankFindUniqueArgs>(args: SelectSubset<T, BankFindUniqueArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bank that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BankFindUniqueOrThrowArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankFindUniqueOrThrowArgs>(args: SelectSubset<T, BankFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindFirstArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankFindFirstArgs>(args?: SelectSubset<T, BankFindFirstArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bank that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindFirstOrThrowArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankFindFirstOrThrowArgs>(args?: SelectSubset<T, BankFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Banks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Banks
     * const banks = await prisma.bank.findMany()
     * 
     * // Get first 10 Banks
     * const banks = await prisma.bank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankWithIdOnly = await prisma.bank.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankFindManyArgs>(args?: SelectSubset<T, BankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bank.
     * @param {BankCreateArgs} args - Arguments to create a Bank.
     * @example
     * // Create one Bank
     * const Bank = await prisma.bank.create({
     *   data: {
     *     // ... data to create a Bank
     *   }
     * })
     * 
     */
    create<T extends BankCreateArgs>(args: SelectSubset<T, BankCreateArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Banks.
     * @param {BankCreateManyArgs} args - Arguments to create many Banks.
     * @example
     * // Create many Banks
     * const bank = await prisma.bank.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankCreateManyArgs>(args?: SelectSubset<T, BankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Banks and returns the data saved in the database.
     * @param {BankCreateManyAndReturnArgs} args - Arguments to create many Banks.
     * @example
     * // Create many Banks
     * const bank = await prisma.bank.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Banks and only return the `id`
     * const bankWithIdOnly = await prisma.bank.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankCreateManyAndReturnArgs>(args?: SelectSubset<T, BankCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bank.
     * @param {BankDeleteArgs} args - Arguments to delete one Bank.
     * @example
     * // Delete one Bank
     * const Bank = await prisma.bank.delete({
     *   where: {
     *     // ... filter to delete one Bank
     *   }
     * })
     * 
     */
    delete<T extends BankDeleteArgs>(args: SelectSubset<T, BankDeleteArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bank.
     * @param {BankUpdateArgs} args - Arguments to update one Bank.
     * @example
     * // Update one Bank
     * const bank = await prisma.bank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankUpdateArgs>(args: SelectSubset<T, BankUpdateArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Banks.
     * @param {BankDeleteManyArgs} args - Arguments to filter Banks to delete.
     * @example
     * // Delete a few Banks
     * const { count } = await prisma.bank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankDeleteManyArgs>(args?: SelectSubset<T, BankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Banks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Banks
     * const bank = await prisma.bank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankUpdateManyArgs>(args: SelectSubset<T, BankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bank.
     * @param {BankUpsertArgs} args - Arguments to update or create a Bank.
     * @example
     * // Update or create a Bank
     * const bank = await prisma.bank.upsert({
     *   create: {
     *     // ... data to create a Bank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bank we want to update
     *   }
     * })
     */
    upsert<T extends BankUpsertArgs>(args: SelectSubset<T, BankUpsertArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Banks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankCountArgs} args - Arguments to filter Banks to count.
     * @example
     * // Count the number of Banks
     * const count = await prisma.bank.count({
     *   where: {
     *     // ... the filter for the Banks we want to count
     *   }
     * })
    **/
    count<T extends BankCountArgs>(
      args?: Subset<T, BankCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankAggregateArgs>(args: Subset<T, BankAggregateArgs>): Prisma.PrismaPromise<GetBankAggregateType<T>>

    /**
     * Group by Bank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankGroupByArgs['orderBy'] }
        : { orderBy?: BankGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bank model
   */
  readonly fields: BankFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    installments<T extends Bank$installmentsArgs<ExtArgs> = {}>(args?: Subset<T, Bank$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallmentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bank model
   */ 
  interface BankFieldRefs {
    readonly id: FieldRef<"Bank", 'String'>
    readonly name: FieldRef<"Bank", 'String'>
    readonly code: FieldRef<"Bank", 'String'>
    readonly logoAsset: FieldRef<"Bank", 'String'>
    readonly isActive: FieldRef<"Bank", 'Boolean'>
    readonly createdAt: FieldRef<"Bank", 'DateTime'>
    readonly updatedAt: FieldRef<"Bank", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bank findUnique
   */
  export type BankFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank findUniqueOrThrow
   */
  export type BankFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank findFirst
   */
  export type BankFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Banks.
     */
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank findFirstOrThrow
   */
  export type BankFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Banks.
     */
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank findMany
   */
  export type BankFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Banks to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank create
   */
  export type BankCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The data needed to create a Bank.
     */
    data: XOR<BankCreateInput, BankUncheckedCreateInput>
  }

  /**
   * Bank createMany
   */
  export type BankCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Banks.
     */
    data: BankCreateManyInput | BankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bank createManyAndReturn
   */
  export type BankCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Banks.
     */
    data: BankCreateManyInput | BankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bank update
   */
  export type BankUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The data needed to update a Bank.
     */
    data: XOR<BankUpdateInput, BankUncheckedUpdateInput>
    /**
     * Choose, which Bank to update.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank updateMany
   */
  export type BankUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Banks.
     */
    data: XOR<BankUpdateManyMutationInput, BankUncheckedUpdateManyInput>
    /**
     * Filter which Banks to update
     */
    where?: BankWhereInput
  }

  /**
   * Bank upsert
   */
  export type BankUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The filter to search for the Bank to update in case it exists.
     */
    where: BankWhereUniqueInput
    /**
     * In case the Bank found by the `where` argument doesn't exist, create a new Bank with this data.
     */
    create: XOR<BankCreateInput, BankUncheckedCreateInput>
    /**
     * In case the Bank was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankUpdateInput, BankUncheckedUpdateInput>
  }

  /**
   * Bank delete
   */
  export type BankDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter which Bank to delete.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank deleteMany
   */
  export type BankDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Banks to delete
     */
    where?: BankWhereInput
  }

  /**
   * Bank.installments
   */
  export type Bank$installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Installment
     */
    select?: InstallmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallmentInclude<ExtArgs> | null
    where?: InstallmentWhereInput
    orderBy?: InstallmentOrderByWithRelationInput | InstallmentOrderByWithRelationInput[]
    cursor?: InstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstallmentScalarFieldEnum | InstallmentScalarFieldEnum[]
  }

  /**
   * Bank without action
   */
  export type BankDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    eventType: string | null
    actorType: string | null
    actorId: string | null
    memberId: string | null
    metadata: string | null
    previousHash: string | null
    currentHash: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    eventType: string | null
    actorType: string | null
    actorId: string | null
    memberId: string | null
    metadata: string | null
    previousHash: string | null
    currentHash: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    eventType: number
    actorType: number
    actorId: number
    memberId: number
    metadata: number
    previousHash: number
    currentHash: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    eventType?: true
    actorType?: true
    actorId?: true
    memberId?: true
    metadata?: true
    previousHash?: true
    currentHash?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    eventType?: true
    actorType?: true
    actorId?: true
    memberId?: true
    metadata?: true
    previousHash?: true
    currentHash?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    eventType?: true
    actorType?: true
    actorId?: true
    memberId?: true
    metadata?: true
    previousHash?: true
    currentHash?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    eventType: string
    actorType: string
    actorId: string | null
    memberId: string | null
    metadata: string | null
    previousHash: string
    currentHash: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    actorType?: boolean
    actorId?: boolean
    memberId?: boolean
    metadata?: boolean
    previousHash?: boolean
    currentHash?: boolean
    createdAt?: boolean
    member?: boolean | AuditLog$memberArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    actorType?: boolean
    actorId?: boolean
    memberId?: boolean
    metadata?: boolean
    previousHash?: boolean
    currentHash?: boolean
    createdAt?: boolean
    member?: boolean | AuditLog$memberArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    eventType?: boolean
    actorType?: boolean
    actorId?: boolean
    memberId?: boolean
    metadata?: boolean
    previousHash?: boolean
    currentHash?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | AuditLog$memberArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | AuditLog$memberArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventType: string
      actorType: string
      actorId: string | null
      memberId: string | null
      metadata: string | null
      previousHash: string
      currentHash: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends AuditLog$memberArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$memberArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly eventType: FieldRef<"AuditLog", 'String'>
    readonly actorType: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly memberId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'String'>
    readonly previousHash: FieldRef<"AuditLog", 'String'>
    readonly currentHash: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.member
   */
  export type AuditLog$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model SecurityEvent
   */

  export type AggregateSecurityEvent = {
    _count: SecurityEventCountAggregateOutputType | null
    _min: SecurityEventMinAggregateOutputType | null
    _max: SecurityEventMaxAggregateOutputType | null
  }

  export type SecurityEventMinAggregateOutputType = {
    id: string | null
    type: string | null
    severity: string | null
    message: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type SecurityEventMaxAggregateOutputType = {
    id: string | null
    type: string | null
    severity: string | null
    message: string | null
    resolvedAt: Date | null
    createdAt: Date | null
  }

  export type SecurityEventCountAggregateOutputType = {
    id: number
    type: number
    severity: number
    message: number
    resolvedAt: number
    createdAt: number
    _all: number
  }


  export type SecurityEventMinAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    message?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type SecurityEventMaxAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    message?: true
    resolvedAt?: true
    createdAt?: true
  }

  export type SecurityEventCountAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    message?: true
    resolvedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SecurityEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityEvent to aggregate.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityEvents
    **/
    _count?: true | SecurityEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityEventMaxAggregateInputType
  }

  export type GetSecurityEventAggregateType<T extends SecurityEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityEvent[P]>
      : GetScalarType<T[P], AggregateSecurityEvent[P]>
  }




  export type SecurityEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityEventWhereInput
    orderBy?: SecurityEventOrderByWithAggregationInput | SecurityEventOrderByWithAggregationInput[]
    by: SecurityEventScalarFieldEnum[] | SecurityEventScalarFieldEnum
    having?: SecurityEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityEventCountAggregateInputType | true
    _min?: SecurityEventMinAggregateInputType
    _max?: SecurityEventMaxAggregateInputType
  }

  export type SecurityEventGroupByOutputType = {
    id: string
    type: string
    severity: string
    message: string
    resolvedAt: Date | null
    createdAt: Date
    _count: SecurityEventCountAggregateOutputType | null
    _min: SecurityEventMinAggregateOutputType | null
    _max: SecurityEventMaxAggregateOutputType | null
  }

  type GetSecurityEventGroupByPayload<T extends SecurityEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityEventGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityEventGroupByOutputType[P]>
        }
      >
    >


  export type SecurityEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["securityEvent"]>

  export type SecurityEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["securityEvent"]>

  export type SecurityEventSelectScalar = {
    id?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
  }


  export type $SecurityEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      severity: string
      message: string
      resolvedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["securityEvent"]>
    composites: {}
  }

  type SecurityEventGetPayload<S extends boolean | null | undefined | SecurityEventDefaultArgs> = $Result.GetResult<Prisma.$SecurityEventPayload, S>

  type SecurityEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SecurityEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SecurityEventCountAggregateInputType | true
    }

  export interface SecurityEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityEvent'], meta: { name: 'SecurityEvent' } }
    /**
     * Find zero or one SecurityEvent that matches the filter.
     * @param {SecurityEventFindUniqueArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityEventFindUniqueArgs>(args: SelectSubset<T, SecurityEventFindUniqueArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SecurityEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SecurityEventFindUniqueOrThrowArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SecurityEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindFirstArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityEventFindFirstArgs>(args?: SelectSubset<T, SecurityEventFindFirstArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SecurityEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindFirstOrThrowArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SecurityEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityEvents
     * const securityEvents = await prisma.securityEvent.findMany()
     * 
     * // Get first 10 SecurityEvents
     * const securityEvents = await prisma.securityEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityEventWithIdOnly = await prisma.securityEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityEventFindManyArgs>(args?: SelectSubset<T, SecurityEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SecurityEvent.
     * @param {SecurityEventCreateArgs} args - Arguments to create a SecurityEvent.
     * @example
     * // Create one SecurityEvent
     * const SecurityEvent = await prisma.securityEvent.create({
     *   data: {
     *     // ... data to create a SecurityEvent
     *   }
     * })
     * 
     */
    create<T extends SecurityEventCreateArgs>(args: SelectSubset<T, SecurityEventCreateArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SecurityEvents.
     * @param {SecurityEventCreateManyArgs} args - Arguments to create many SecurityEvents.
     * @example
     * // Create many SecurityEvents
     * const securityEvent = await prisma.securityEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityEventCreateManyArgs>(args?: SelectSubset<T, SecurityEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityEvents and returns the data saved in the database.
     * @param {SecurityEventCreateManyAndReturnArgs} args - Arguments to create many SecurityEvents.
     * @example
     * // Create many SecurityEvents
     * const securityEvent = await prisma.securityEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityEvents and only return the `id`
     * const securityEventWithIdOnly = await prisma.securityEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SecurityEvent.
     * @param {SecurityEventDeleteArgs} args - Arguments to delete one SecurityEvent.
     * @example
     * // Delete one SecurityEvent
     * const SecurityEvent = await prisma.securityEvent.delete({
     *   where: {
     *     // ... filter to delete one SecurityEvent
     *   }
     * })
     * 
     */
    delete<T extends SecurityEventDeleteArgs>(args: SelectSubset<T, SecurityEventDeleteArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SecurityEvent.
     * @param {SecurityEventUpdateArgs} args - Arguments to update one SecurityEvent.
     * @example
     * // Update one SecurityEvent
     * const securityEvent = await prisma.securityEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityEventUpdateArgs>(args: SelectSubset<T, SecurityEventUpdateArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SecurityEvents.
     * @param {SecurityEventDeleteManyArgs} args - Arguments to filter SecurityEvents to delete.
     * @example
     * // Delete a few SecurityEvents
     * const { count } = await prisma.securityEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityEventDeleteManyArgs>(args?: SelectSubset<T, SecurityEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityEvents
     * const securityEvent = await prisma.securityEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityEventUpdateManyArgs>(args: SelectSubset<T, SecurityEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SecurityEvent.
     * @param {SecurityEventUpsertArgs} args - Arguments to update or create a SecurityEvent.
     * @example
     * // Update or create a SecurityEvent
     * const securityEvent = await prisma.securityEvent.upsert({
     *   create: {
     *     // ... data to create a SecurityEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityEvent we want to update
     *   }
     * })
     */
    upsert<T extends SecurityEventUpsertArgs>(args: SelectSubset<T, SecurityEventUpsertArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SecurityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventCountArgs} args - Arguments to filter SecurityEvents to count.
     * @example
     * // Count the number of SecurityEvents
     * const count = await prisma.securityEvent.count({
     *   where: {
     *     // ... the filter for the SecurityEvents we want to count
     *   }
     * })
    **/
    count<T extends SecurityEventCountArgs>(
      args?: Subset<T, SecurityEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityEventAggregateArgs>(args: Subset<T, SecurityEventAggregateArgs>): Prisma.PrismaPromise<GetSecurityEventAggregateType<T>>

    /**
     * Group by SecurityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityEventGroupByArgs['orderBy'] }
        : { orderBy?: SecurityEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityEvent model
   */
  readonly fields: SecurityEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SecurityEvent model
   */ 
  interface SecurityEventFieldRefs {
    readonly id: FieldRef<"SecurityEvent", 'String'>
    readonly type: FieldRef<"SecurityEvent", 'String'>
    readonly severity: FieldRef<"SecurityEvent", 'String'>
    readonly message: FieldRef<"SecurityEvent", 'String'>
    readonly resolvedAt: FieldRef<"SecurityEvent", 'DateTime'>
    readonly createdAt: FieldRef<"SecurityEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityEvent findUnique
   */
  export type SecurityEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent findUniqueOrThrow
   */
  export type SecurityEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent findFirst
   */
  export type SecurityEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityEvents.
     */
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent findFirstOrThrow
   */
  export type SecurityEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityEvents.
     */
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent findMany
   */
  export type SecurityEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter, which SecurityEvents to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent create
   */
  export type SecurityEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * The data needed to create a SecurityEvent.
     */
    data: XOR<SecurityEventCreateInput, SecurityEventUncheckedCreateInput>
  }

  /**
   * SecurityEvent createMany
   */
  export type SecurityEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityEvents.
     */
    data: SecurityEventCreateManyInput | SecurityEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityEvent createManyAndReturn
   */
  export type SecurityEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SecurityEvents.
     */
    data: SecurityEventCreateManyInput | SecurityEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityEvent update
   */
  export type SecurityEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * The data needed to update a SecurityEvent.
     */
    data: XOR<SecurityEventUpdateInput, SecurityEventUncheckedUpdateInput>
    /**
     * Choose, which SecurityEvent to update.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent updateMany
   */
  export type SecurityEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityEvents.
     */
    data: XOR<SecurityEventUpdateManyMutationInput, SecurityEventUncheckedUpdateManyInput>
    /**
     * Filter which SecurityEvents to update
     */
    where?: SecurityEventWhereInput
  }

  /**
   * SecurityEvent upsert
   */
  export type SecurityEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * The filter to search for the SecurityEvent to update in case it exists.
     */
    where: SecurityEventWhereUniqueInput
    /**
     * In case the SecurityEvent found by the `where` argument doesn't exist, create a new SecurityEvent with this data.
     */
    create: XOR<SecurityEventCreateInput, SecurityEventUncheckedCreateInput>
    /**
     * In case the SecurityEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityEventUpdateInput, SecurityEventUncheckedUpdateInput>
  }

  /**
   * SecurityEvent delete
   */
  export type SecurityEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Filter which SecurityEvent to delete.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent deleteMany
   */
  export type SecurityEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityEvents to delete
     */
    where?: SecurityEventWhereInput
  }

  /**
   * SecurityEvent without action
   */
  export type SecurityEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
  }


  /**
   * Model AppSettings
   */

  export type AggregateAppSettings = {
    _count: AppSettingsCountAggregateOutputType | null
    _min: AppSettingsMinAggregateOutputType | null
    _max: AppSettingsMaxAggregateOutputType | null
  }

  export type AppSettingsMinAggregateOutputType = {
    key: string | null
    value: string | null
    isEncrypted: boolean | null
    updatedAt: Date | null
  }

  export type AppSettingsMaxAggregateOutputType = {
    key: string | null
    value: string | null
    isEncrypted: boolean | null
    updatedAt: Date | null
  }

  export type AppSettingsCountAggregateOutputType = {
    key: number
    value: number
    isEncrypted: number
    updatedAt: number
    _all: number
  }


  export type AppSettingsMinAggregateInputType = {
    key?: true
    value?: true
    isEncrypted?: true
    updatedAt?: true
  }

  export type AppSettingsMaxAggregateInputType = {
    key?: true
    value?: true
    isEncrypted?: true
    updatedAt?: true
  }

  export type AppSettingsCountAggregateInputType = {
    key?: true
    value?: true
    isEncrypted?: true
    updatedAt?: true
    _all?: true
  }

  export type AppSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSettings to aggregate.
     */
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingsOrderByWithRelationInput | AppSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSettings
    **/
    _count?: true | AppSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSettingsMaxAggregateInputType
  }

  export type GetAppSettingsAggregateType<T extends AppSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSettings[P]>
      : GetScalarType<T[P], AggregateAppSettings[P]>
  }




  export type AppSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSettingsWhereInput
    orderBy?: AppSettingsOrderByWithAggregationInput | AppSettingsOrderByWithAggregationInput[]
    by: AppSettingsScalarFieldEnum[] | AppSettingsScalarFieldEnum
    having?: AppSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSettingsCountAggregateInputType | true
    _min?: AppSettingsMinAggregateInputType
    _max?: AppSettingsMaxAggregateInputType
  }

  export type AppSettingsGroupByOutputType = {
    key: string
    value: string
    isEncrypted: boolean
    updatedAt: Date
    _count: AppSettingsCountAggregateOutputType | null
    _min: AppSettingsMinAggregateOutputType | null
    _max: AppSettingsMaxAggregateOutputType | null
  }

  type GetAppSettingsGroupByPayload<T extends AppSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AppSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AppSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    isEncrypted?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSettings"]>

  export type AppSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    isEncrypted?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSettings"]>

  export type AppSettingsSelectScalar = {
    key?: boolean
    value?: boolean
    isEncrypted?: boolean
    updatedAt?: boolean
  }


  export type $AppSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      isEncrypted: boolean
      updatedAt: Date
    }, ExtArgs["result"]["appSettings"]>
    composites: {}
  }

  type AppSettingsGetPayload<S extends boolean | null | undefined | AppSettingsDefaultArgs> = $Result.GetResult<Prisma.$AppSettingsPayload, S>

  type AppSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppSettingsCountAggregateInputType | true
    }

  export interface AppSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppSettings'], meta: { name: 'AppSettings' } }
    /**
     * Find zero or one AppSettings that matches the filter.
     * @param {AppSettingsFindUniqueArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppSettingsFindUniqueArgs>(args: SelectSubset<T, AppSettingsFindUniqueArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppSettingsFindUniqueOrThrowArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AppSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindFirstArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppSettingsFindFirstArgs>(args?: SelectSubset<T, AppSettingsFindFirstArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindFirstOrThrowArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AppSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSettings
     * const appSettings = await prisma.appSettings.findMany()
     * 
     * // Get first 10 AppSettings
     * const appSettings = await prisma.appSettings.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appSettingsWithKeyOnly = await prisma.appSettings.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppSettingsFindManyArgs>(args?: SelectSubset<T, AppSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppSettings.
     * @param {AppSettingsCreateArgs} args - Arguments to create a AppSettings.
     * @example
     * // Create one AppSettings
     * const AppSettings = await prisma.appSettings.create({
     *   data: {
     *     // ... data to create a AppSettings
     *   }
     * })
     * 
     */
    create<T extends AppSettingsCreateArgs>(args: SelectSubset<T, AppSettingsCreateArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppSettings.
     * @param {AppSettingsCreateManyArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSettings = await prisma.appSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppSettingsCreateManyArgs>(args?: SelectSubset<T, AppSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppSettings and returns the data saved in the database.
     * @param {AppSettingsCreateManyAndReturnArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSettings = await prisma.appSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppSettings and only return the `key`
     * const appSettingsWithKeyOnly = await prisma.appSettings.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AppSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppSettings.
     * @param {AppSettingsDeleteArgs} args - Arguments to delete one AppSettings.
     * @example
     * // Delete one AppSettings
     * const AppSettings = await prisma.appSettings.delete({
     *   where: {
     *     // ... filter to delete one AppSettings
     *   }
     * })
     * 
     */
    delete<T extends AppSettingsDeleteArgs>(args: SelectSubset<T, AppSettingsDeleteArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppSettings.
     * @param {AppSettingsUpdateArgs} args - Arguments to update one AppSettings.
     * @example
     * // Update one AppSettings
     * const appSettings = await prisma.appSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppSettingsUpdateArgs>(args: SelectSubset<T, AppSettingsUpdateArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppSettings.
     * @param {AppSettingsDeleteManyArgs} args - Arguments to filter AppSettings to delete.
     * @example
     * // Delete a few AppSettings
     * const { count } = await prisma.appSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppSettingsDeleteManyArgs>(args?: SelectSubset<T, AppSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSettings
     * const appSettings = await prisma.appSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppSettingsUpdateManyArgs>(args: SelectSubset<T, AppSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppSettings.
     * @param {AppSettingsUpsertArgs} args - Arguments to update or create a AppSettings.
     * @example
     * // Update or create a AppSettings
     * const appSettings = await prisma.appSettings.upsert({
     *   create: {
     *     // ... data to create a AppSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSettings we want to update
     *   }
     * })
     */
    upsert<T extends AppSettingsUpsertArgs>(args: SelectSubset<T, AppSettingsUpsertArgs<ExtArgs>>): Prisma__AppSettingsClient<$Result.GetResult<Prisma.$AppSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsCountArgs} args - Arguments to filter AppSettings to count.
     * @example
     * // Count the number of AppSettings
     * const count = await prisma.appSettings.count({
     *   where: {
     *     // ... the filter for the AppSettings we want to count
     *   }
     * })
    **/
    count<T extends AppSettingsCountArgs>(
      args?: Subset<T, AppSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppSettingsAggregateArgs>(args: Subset<T, AppSettingsAggregateArgs>): Prisma.PrismaPromise<GetAppSettingsAggregateType<T>>

    /**
     * Group by AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AppSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppSettings model
   */
  readonly fields: AppSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppSettings model
   */ 
  interface AppSettingsFieldRefs {
    readonly key: FieldRef<"AppSettings", 'String'>
    readonly value: FieldRef<"AppSettings", 'String'>
    readonly isEncrypted: FieldRef<"AppSettings", 'Boolean'>
    readonly updatedAt: FieldRef<"AppSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppSettings findUnique
   */
  export type AppSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where: AppSettingsWhereUniqueInput
  }

  /**
   * AppSettings findUniqueOrThrow
   */
  export type AppSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where: AppSettingsWhereUniqueInput
  }

  /**
   * AppSettings findFirst
   */
  export type AppSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingsOrderByWithRelationInput | AppSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingsScalarFieldEnum | AppSettingsScalarFieldEnum[]
  }

  /**
   * AppSettings findFirstOrThrow
   */
  export type AppSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingsOrderByWithRelationInput | AppSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingsScalarFieldEnum | AppSettingsScalarFieldEnum[]
  }

  /**
   * AppSettings findMany
   */
  export type AppSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingsOrderByWithRelationInput | AppSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSettings.
     */
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    distinct?: AppSettingsScalarFieldEnum | AppSettingsScalarFieldEnum[]
  }

  /**
   * AppSettings create
   */
  export type AppSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a AppSettings.
     */
    data: XOR<AppSettingsCreateInput, AppSettingsUncheckedCreateInput>
  }

  /**
   * AppSettings createMany
   */
  export type AppSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingsCreateManyInput | AppSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSettings createManyAndReturn
   */
  export type AppSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingsCreateManyInput | AppSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSettings update
   */
  export type AppSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a AppSettings.
     */
    data: XOR<AppSettingsUpdateInput, AppSettingsUncheckedUpdateInput>
    /**
     * Choose, which AppSettings to update.
     */
    where: AppSettingsWhereUniqueInput
  }

  /**
   * AppSettings updateMany
   */
  export type AppSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppSettings.
     */
    data: XOR<AppSettingsUpdateManyMutationInput, AppSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AppSettings to update
     */
    where?: AppSettingsWhereInput
  }

  /**
   * AppSettings upsert
   */
  export type AppSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the AppSettings to update in case it exists.
     */
    where: AppSettingsWhereUniqueInput
    /**
     * In case the AppSettings found by the `where` argument doesn't exist, create a new AppSettings with this data.
     */
    create: XOR<AppSettingsCreateInput, AppSettingsUncheckedCreateInput>
    /**
     * In case the AppSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppSettingsUpdateInput, AppSettingsUncheckedUpdateInput>
  }

  /**
   * AppSettings delete
   */
  export type AppSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
    /**
     * Filter which AppSettings to delete.
     */
    where: AppSettingsWhereUniqueInput
  }

  /**
   * AppSettings deleteMany
   */
  export type AppSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSettings to delete
     */
    where?: AppSettingsWhereInput
  }

  /**
   * AppSettings without action
   */
  export type AppSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSettings
     */
    select?: AppSettingsSelect<ExtArgs> | null
  }


  /**
   * Model BannedIp
   */

  export type AggregateBannedIp = {
    _count: BannedIpCountAggregateOutputType | null
    _avg: BannedIpAvgAggregateOutputType | null
    _sum: BannedIpSumAggregateOutputType | null
    _min: BannedIpMinAggregateOutputType | null
    _max: BannedIpMaxAggregateOutputType | null
  }

  export type BannedIpAvgAggregateOutputType = {
    failedAttemptCount: number | null
  }

  export type BannedIpSumAggregateOutputType = {
    failedAttemptCount: number | null
  }

  export type BannedIpMinAggregateOutputType = {
    id: string | null
    ipAddress: string | null
    normalizedIp: string | null
    reason: string | null
    bannedAt: Date | null
    bannedBy: string | null
    failedAttemptCount: number | null
    lastAttemptAt: Date | null
    active: boolean | null
    unbannedAt: Date | null
    unbannedBy: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BannedIpMaxAggregateOutputType = {
    id: string | null
    ipAddress: string | null
    normalizedIp: string | null
    reason: string | null
    bannedAt: Date | null
    bannedBy: string | null
    failedAttemptCount: number | null
    lastAttemptAt: Date | null
    active: boolean | null
    unbannedAt: Date | null
    unbannedBy: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BannedIpCountAggregateOutputType = {
    id: number
    ipAddress: number
    normalizedIp: number
    reason: number
    bannedAt: number
    bannedBy: number
    failedAttemptCount: number
    lastAttemptAt: number
    active: number
    unbannedAt: number
    unbannedBy: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BannedIpAvgAggregateInputType = {
    failedAttemptCount?: true
  }

  export type BannedIpSumAggregateInputType = {
    failedAttemptCount?: true
  }

  export type BannedIpMinAggregateInputType = {
    id?: true
    ipAddress?: true
    normalizedIp?: true
    reason?: true
    bannedAt?: true
    bannedBy?: true
    failedAttemptCount?: true
    lastAttemptAt?: true
    active?: true
    unbannedAt?: true
    unbannedBy?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BannedIpMaxAggregateInputType = {
    id?: true
    ipAddress?: true
    normalizedIp?: true
    reason?: true
    bannedAt?: true
    bannedBy?: true
    failedAttemptCount?: true
    lastAttemptAt?: true
    active?: true
    unbannedAt?: true
    unbannedBy?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BannedIpCountAggregateInputType = {
    id?: true
    ipAddress?: true
    normalizedIp?: true
    reason?: true
    bannedAt?: true
    bannedBy?: true
    failedAttemptCount?: true
    lastAttemptAt?: true
    active?: true
    unbannedAt?: true
    unbannedBy?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BannedIpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BannedIp to aggregate.
     */
    where?: BannedIpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BannedIps to fetch.
     */
    orderBy?: BannedIpOrderByWithRelationInput | BannedIpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BannedIpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BannedIps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BannedIps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BannedIps
    **/
    _count?: true | BannedIpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BannedIpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BannedIpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BannedIpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BannedIpMaxAggregateInputType
  }

  export type GetBannedIpAggregateType<T extends BannedIpAggregateArgs> = {
        [P in keyof T & keyof AggregateBannedIp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBannedIp[P]>
      : GetScalarType<T[P], AggregateBannedIp[P]>
  }




  export type BannedIpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BannedIpWhereInput
    orderBy?: BannedIpOrderByWithAggregationInput | BannedIpOrderByWithAggregationInput[]
    by: BannedIpScalarFieldEnum[] | BannedIpScalarFieldEnum
    having?: BannedIpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BannedIpCountAggregateInputType | true
    _avg?: BannedIpAvgAggregateInputType
    _sum?: BannedIpSumAggregateInputType
    _min?: BannedIpMinAggregateInputType
    _max?: BannedIpMaxAggregateInputType
  }

  export type BannedIpGroupByOutputType = {
    id: string
    ipAddress: string
    normalizedIp: string
    reason: string
    bannedAt: Date
    bannedBy: string
    failedAttemptCount: number
    lastAttemptAt: Date | null
    active: boolean
    unbannedAt: Date | null
    unbannedBy: string | null
    metadata: string | null
    createdAt: Date
    updatedAt: Date
    _count: BannedIpCountAggregateOutputType | null
    _avg: BannedIpAvgAggregateOutputType | null
    _sum: BannedIpSumAggregateOutputType | null
    _min: BannedIpMinAggregateOutputType | null
    _max: BannedIpMaxAggregateOutputType | null
  }

  type GetBannedIpGroupByPayload<T extends BannedIpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BannedIpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BannedIpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BannedIpGroupByOutputType[P]>
            : GetScalarType<T[P], BannedIpGroupByOutputType[P]>
        }
      >
    >


  export type BannedIpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ipAddress?: boolean
    normalizedIp?: boolean
    reason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    failedAttemptCount?: boolean
    lastAttemptAt?: boolean
    active?: boolean
    unbannedAt?: boolean
    unbannedBy?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bannedIp"]>

  export type BannedIpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ipAddress?: boolean
    normalizedIp?: boolean
    reason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    failedAttemptCount?: boolean
    lastAttemptAt?: boolean
    active?: boolean
    unbannedAt?: boolean
    unbannedBy?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bannedIp"]>

  export type BannedIpSelectScalar = {
    id?: boolean
    ipAddress?: boolean
    normalizedIp?: boolean
    reason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    failedAttemptCount?: boolean
    lastAttemptAt?: boolean
    active?: boolean
    unbannedAt?: boolean
    unbannedBy?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BannedIpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BannedIp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ipAddress: string
      normalizedIp: string
      reason: string
      bannedAt: Date
      bannedBy: string
      failedAttemptCount: number
      lastAttemptAt: Date | null
      active: boolean
      unbannedAt: Date | null
      unbannedBy: string | null
      metadata: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bannedIp"]>
    composites: {}
  }

  type BannedIpGetPayload<S extends boolean | null | undefined | BannedIpDefaultArgs> = $Result.GetResult<Prisma.$BannedIpPayload, S>

  type BannedIpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BannedIpFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BannedIpCountAggregateInputType | true
    }

  export interface BannedIpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BannedIp'], meta: { name: 'BannedIp' } }
    /**
     * Find zero or one BannedIp that matches the filter.
     * @param {BannedIpFindUniqueArgs} args - Arguments to find a BannedIp
     * @example
     * // Get one BannedIp
     * const bannedIp = await prisma.bannedIp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BannedIpFindUniqueArgs>(args: SelectSubset<T, BannedIpFindUniqueArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BannedIp that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BannedIpFindUniqueOrThrowArgs} args - Arguments to find a BannedIp
     * @example
     * // Get one BannedIp
     * const bannedIp = await prisma.bannedIp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BannedIpFindUniqueOrThrowArgs>(args: SelectSubset<T, BannedIpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BannedIp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpFindFirstArgs} args - Arguments to find a BannedIp
     * @example
     * // Get one BannedIp
     * const bannedIp = await prisma.bannedIp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BannedIpFindFirstArgs>(args?: SelectSubset<T, BannedIpFindFirstArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BannedIp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpFindFirstOrThrowArgs} args - Arguments to find a BannedIp
     * @example
     * // Get one BannedIp
     * const bannedIp = await prisma.bannedIp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BannedIpFindFirstOrThrowArgs>(args?: SelectSubset<T, BannedIpFindFirstOrThrowArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BannedIps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BannedIps
     * const bannedIps = await prisma.bannedIp.findMany()
     * 
     * // Get first 10 BannedIps
     * const bannedIps = await prisma.bannedIp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bannedIpWithIdOnly = await prisma.bannedIp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BannedIpFindManyArgs>(args?: SelectSubset<T, BannedIpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BannedIp.
     * @param {BannedIpCreateArgs} args - Arguments to create a BannedIp.
     * @example
     * // Create one BannedIp
     * const BannedIp = await prisma.bannedIp.create({
     *   data: {
     *     // ... data to create a BannedIp
     *   }
     * })
     * 
     */
    create<T extends BannedIpCreateArgs>(args: SelectSubset<T, BannedIpCreateArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BannedIps.
     * @param {BannedIpCreateManyArgs} args - Arguments to create many BannedIps.
     * @example
     * // Create many BannedIps
     * const bannedIp = await prisma.bannedIp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BannedIpCreateManyArgs>(args?: SelectSubset<T, BannedIpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BannedIps and returns the data saved in the database.
     * @param {BannedIpCreateManyAndReturnArgs} args - Arguments to create many BannedIps.
     * @example
     * // Create many BannedIps
     * const bannedIp = await prisma.bannedIp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BannedIps and only return the `id`
     * const bannedIpWithIdOnly = await prisma.bannedIp.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BannedIpCreateManyAndReturnArgs>(args?: SelectSubset<T, BannedIpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BannedIp.
     * @param {BannedIpDeleteArgs} args - Arguments to delete one BannedIp.
     * @example
     * // Delete one BannedIp
     * const BannedIp = await prisma.bannedIp.delete({
     *   where: {
     *     // ... filter to delete one BannedIp
     *   }
     * })
     * 
     */
    delete<T extends BannedIpDeleteArgs>(args: SelectSubset<T, BannedIpDeleteArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BannedIp.
     * @param {BannedIpUpdateArgs} args - Arguments to update one BannedIp.
     * @example
     * // Update one BannedIp
     * const bannedIp = await prisma.bannedIp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BannedIpUpdateArgs>(args: SelectSubset<T, BannedIpUpdateArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BannedIps.
     * @param {BannedIpDeleteManyArgs} args - Arguments to filter BannedIps to delete.
     * @example
     * // Delete a few BannedIps
     * const { count } = await prisma.bannedIp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BannedIpDeleteManyArgs>(args?: SelectSubset<T, BannedIpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BannedIps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BannedIps
     * const bannedIp = await prisma.bannedIp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BannedIpUpdateManyArgs>(args: SelectSubset<T, BannedIpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BannedIp.
     * @param {BannedIpUpsertArgs} args - Arguments to update or create a BannedIp.
     * @example
     * // Update or create a BannedIp
     * const bannedIp = await prisma.bannedIp.upsert({
     *   create: {
     *     // ... data to create a BannedIp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BannedIp we want to update
     *   }
     * })
     */
    upsert<T extends BannedIpUpsertArgs>(args: SelectSubset<T, BannedIpUpsertArgs<ExtArgs>>): Prisma__BannedIpClient<$Result.GetResult<Prisma.$BannedIpPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BannedIps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpCountArgs} args - Arguments to filter BannedIps to count.
     * @example
     * // Count the number of BannedIps
     * const count = await prisma.bannedIp.count({
     *   where: {
     *     // ... the filter for the BannedIps we want to count
     *   }
     * })
    **/
    count<T extends BannedIpCountArgs>(
      args?: Subset<T, BannedIpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BannedIpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BannedIp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BannedIpAggregateArgs>(args: Subset<T, BannedIpAggregateArgs>): Prisma.PrismaPromise<GetBannedIpAggregateType<T>>

    /**
     * Group by BannedIp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedIpGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BannedIpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BannedIpGroupByArgs['orderBy'] }
        : { orderBy?: BannedIpGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BannedIpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBannedIpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BannedIp model
   */
  readonly fields: BannedIpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BannedIp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BannedIpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BannedIp model
   */ 
  interface BannedIpFieldRefs {
    readonly id: FieldRef<"BannedIp", 'String'>
    readonly ipAddress: FieldRef<"BannedIp", 'String'>
    readonly normalizedIp: FieldRef<"BannedIp", 'String'>
    readonly reason: FieldRef<"BannedIp", 'String'>
    readonly bannedAt: FieldRef<"BannedIp", 'DateTime'>
    readonly bannedBy: FieldRef<"BannedIp", 'String'>
    readonly failedAttemptCount: FieldRef<"BannedIp", 'Int'>
    readonly lastAttemptAt: FieldRef<"BannedIp", 'DateTime'>
    readonly active: FieldRef<"BannedIp", 'Boolean'>
    readonly unbannedAt: FieldRef<"BannedIp", 'DateTime'>
    readonly unbannedBy: FieldRef<"BannedIp", 'String'>
    readonly metadata: FieldRef<"BannedIp", 'String'>
    readonly createdAt: FieldRef<"BannedIp", 'DateTime'>
    readonly updatedAt: FieldRef<"BannedIp", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BannedIp findUnique
   */
  export type BannedIpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter, which BannedIp to fetch.
     */
    where: BannedIpWhereUniqueInput
  }

  /**
   * BannedIp findUniqueOrThrow
   */
  export type BannedIpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter, which BannedIp to fetch.
     */
    where: BannedIpWhereUniqueInput
  }

  /**
   * BannedIp findFirst
   */
  export type BannedIpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter, which BannedIp to fetch.
     */
    where?: BannedIpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BannedIps to fetch.
     */
    orderBy?: BannedIpOrderByWithRelationInput | BannedIpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BannedIps.
     */
    cursor?: BannedIpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BannedIps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BannedIps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BannedIps.
     */
    distinct?: BannedIpScalarFieldEnum | BannedIpScalarFieldEnum[]
  }

  /**
   * BannedIp findFirstOrThrow
   */
  export type BannedIpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter, which BannedIp to fetch.
     */
    where?: BannedIpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BannedIps to fetch.
     */
    orderBy?: BannedIpOrderByWithRelationInput | BannedIpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BannedIps.
     */
    cursor?: BannedIpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BannedIps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BannedIps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BannedIps.
     */
    distinct?: BannedIpScalarFieldEnum | BannedIpScalarFieldEnum[]
  }

  /**
   * BannedIp findMany
   */
  export type BannedIpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter, which BannedIps to fetch.
     */
    where?: BannedIpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BannedIps to fetch.
     */
    orderBy?: BannedIpOrderByWithRelationInput | BannedIpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BannedIps.
     */
    cursor?: BannedIpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BannedIps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BannedIps.
     */
    skip?: number
    distinct?: BannedIpScalarFieldEnum | BannedIpScalarFieldEnum[]
  }

  /**
   * BannedIp create
   */
  export type BannedIpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * The data needed to create a BannedIp.
     */
    data: XOR<BannedIpCreateInput, BannedIpUncheckedCreateInput>
  }

  /**
   * BannedIp createMany
   */
  export type BannedIpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BannedIps.
     */
    data: BannedIpCreateManyInput | BannedIpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BannedIp createManyAndReturn
   */
  export type BannedIpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BannedIps.
     */
    data: BannedIpCreateManyInput | BannedIpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BannedIp update
   */
  export type BannedIpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * The data needed to update a BannedIp.
     */
    data: XOR<BannedIpUpdateInput, BannedIpUncheckedUpdateInput>
    /**
     * Choose, which BannedIp to update.
     */
    where: BannedIpWhereUniqueInput
  }

  /**
   * BannedIp updateMany
   */
  export type BannedIpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BannedIps.
     */
    data: XOR<BannedIpUpdateManyMutationInput, BannedIpUncheckedUpdateManyInput>
    /**
     * Filter which BannedIps to update
     */
    where?: BannedIpWhereInput
  }

  /**
   * BannedIp upsert
   */
  export type BannedIpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * The filter to search for the BannedIp to update in case it exists.
     */
    where: BannedIpWhereUniqueInput
    /**
     * In case the BannedIp found by the `where` argument doesn't exist, create a new BannedIp with this data.
     */
    create: XOR<BannedIpCreateInput, BannedIpUncheckedCreateInput>
    /**
     * In case the BannedIp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BannedIpUpdateInput, BannedIpUncheckedUpdateInput>
  }

  /**
   * BannedIp delete
   */
  export type BannedIpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
    /**
     * Filter which BannedIp to delete.
     */
    where: BannedIpWhereUniqueInput
  }

  /**
   * BannedIp deleteMany
   */
  export type BannedIpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BannedIps to delete
     */
    where?: BannedIpWhereInput
  }

  /**
   * BannedIp without action
   */
  export type BannedIpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedIp
     */
    select?: BannedIpSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    displayName: 'displayName',
    passwordHash: 'passwordHash',
    failedLoginCount: 'failedLoginCount',
    lockedUntil: 'lockedUntil',
    lastLoginAt: 'lastLoginAt',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const PrivateCredentialScalarFieldEnum: {
    id: 'id',
    passwordHash: 'passwordHash',
    failedAttemptCount: 'failedAttemptCount',
    lockedUntil: 'lockedUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrivateCredentialScalarFieldEnum = (typeof PrivateCredentialScalarFieldEnum)[keyof typeof PrivateCredentialScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    sequenceNumber: 'sequenceNumber',
    memberNumber: 'memberNumber',
    fullName: 'fullName',
    phone: 'phone',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const MemberPrivateFinancialScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    plotSize: 'plotSize',
    downPayment: 'downPayment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberPrivateFinancialScalarFieldEnum = (typeof MemberPrivateFinancialScalarFieldEnum)[keyof typeof MemberPrivateFinancialScalarFieldEnum]


  export const InstallmentPlanScalarFieldEnum: {
    id: 'id',
    privateFinancialId: 'privateFinancialId',
    status: 'status',
    totalInstallments: 'totalInstallments',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InstallmentPlanScalarFieldEnum = (typeof InstallmentPlanScalarFieldEnum)[keyof typeof InstallmentPlanScalarFieldEnum]


  export const InstallmentScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    installmentNumber: 'installmentNumber',
    amount: 'amount',
    dueDate: 'dueDate',
    status: 'status',
    bankId: 'bankId',
    paymentDate: 'paymentDate',
    receiptNumber: 'receiptNumber',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InstallmentScalarFieldEnum = (typeof InstallmentScalarFieldEnum)[keyof typeof InstallmentScalarFieldEnum]


  export const BankScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    logoAsset: 'logoAsset',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BankScalarFieldEnum = (typeof BankScalarFieldEnum)[keyof typeof BankScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    actorType: 'actorType',
    actorId: 'actorId',
    memberId: 'memberId',
    metadata: 'metadata',
    previousHash: 'previousHash',
    currentHash: 'currentHash',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SecurityEventScalarFieldEnum: {
    id: 'id',
    type: 'type',
    severity: 'severity',
    message: 'message',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt'
  };

  export type SecurityEventScalarFieldEnum = (typeof SecurityEventScalarFieldEnum)[keyof typeof SecurityEventScalarFieldEnum]


  export const AppSettingsScalarFieldEnum: {
    key: 'key',
    value: 'value',
    isEncrypted: 'isEncrypted',
    updatedAt: 'updatedAt'
  };

  export type AppSettingsScalarFieldEnum = (typeof AppSettingsScalarFieldEnum)[keyof typeof AppSettingsScalarFieldEnum]


  export const BannedIpScalarFieldEnum: {
    id: 'id',
    ipAddress: 'ipAddress',
    normalizedIp: 'normalizedIp',
    reason: 'reason',
    bannedAt: 'bannedAt',
    bannedBy: 'bannedBy',
    failedAttemptCount: 'failedAttemptCount',
    lastAttemptAt: 'lastAttemptAt',
    active: 'active',
    unbannedAt: 'unbannedAt',
    unbannedBy: 'unbannedBy',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BannedIpScalarFieldEnum = (typeof BannedIpScalarFieldEnum)[keyof typeof BannedIpScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'PlanStatus'
   */
  export type EnumPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanStatus'>
    


  /**
   * Reference to a field of type 'PlanStatus[]'
   */
  export type ListEnumPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    username?: StringFilter<"AdminUser"> | string
    displayName?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    failedLoginCount?: IntFilter<"AdminUser"> | number
    lockedUntil?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    version?: IntFilter<"AdminUser"> | number
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    failedLoginCount?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    displayName?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    failedLoginCount?: IntFilter<"AdminUser"> | number
    lockedUntil?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    version?: IntFilter<"AdminUser"> | number
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }, "id" | "username">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    failedLoginCount?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _avg?: AdminUserAvgOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
    _sum?: AdminUserSumOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    username?: StringWithAggregatesFilter<"AdminUser"> | string
    displayName?: StringWithAggregatesFilter<"AdminUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AdminUser"> | string
    failedLoginCount?: IntWithAggregatesFilter<"AdminUser"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    version?: IntWithAggregatesFilter<"AdminUser"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type PrivateCredentialWhereInput = {
    AND?: PrivateCredentialWhereInput | PrivateCredentialWhereInput[]
    OR?: PrivateCredentialWhereInput[]
    NOT?: PrivateCredentialWhereInput | PrivateCredentialWhereInput[]
    id?: StringFilter<"PrivateCredential"> | string
    passwordHash?: StringFilter<"PrivateCredential"> | string
    failedAttemptCount?: IntFilter<"PrivateCredential"> | number
    lockedUntil?: DateTimeNullableFilter<"PrivateCredential"> | Date | string | null
    createdAt?: DateTimeFilter<"PrivateCredential"> | Date | string
    updatedAt?: DateTimeFilter<"PrivateCredential"> | Date | string
  }

  export type PrivateCredentialOrderByWithRelationInput = {
    id?: SortOrder
    passwordHash?: SortOrder
    failedAttemptCount?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrivateCredentialWhereInput | PrivateCredentialWhereInput[]
    OR?: PrivateCredentialWhereInput[]
    NOT?: PrivateCredentialWhereInput | PrivateCredentialWhereInput[]
    passwordHash?: StringFilter<"PrivateCredential"> | string
    failedAttemptCount?: IntFilter<"PrivateCredential"> | number
    lockedUntil?: DateTimeNullableFilter<"PrivateCredential"> | Date | string | null
    createdAt?: DateTimeFilter<"PrivateCredential"> | Date | string
    updatedAt?: DateTimeFilter<"PrivateCredential"> | Date | string
  }, "id">

  export type PrivateCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    passwordHash?: SortOrder
    failedAttemptCount?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrivateCredentialCountOrderByAggregateInput
    _avg?: PrivateCredentialAvgOrderByAggregateInput
    _max?: PrivateCredentialMaxOrderByAggregateInput
    _min?: PrivateCredentialMinOrderByAggregateInput
    _sum?: PrivateCredentialSumOrderByAggregateInput
  }

  export type PrivateCredentialScalarWhereWithAggregatesInput = {
    AND?: PrivateCredentialScalarWhereWithAggregatesInput | PrivateCredentialScalarWhereWithAggregatesInput[]
    OR?: PrivateCredentialScalarWhereWithAggregatesInput[]
    NOT?: PrivateCredentialScalarWhereWithAggregatesInput | PrivateCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrivateCredential"> | string
    passwordHash?: StringWithAggregatesFilter<"PrivateCredential"> | string
    failedAttemptCount?: IntWithAggregatesFilter<"PrivateCredential"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"PrivateCredential"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PrivateCredential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PrivateCredential"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    sequenceNumber?: IntFilter<"Member"> | number
    memberNumber?: StringNullableFilter<"Member"> | string | null
    fullName?: StringFilter<"Member"> | string
    phone?: StringFilter<"Member"> | string
    isDeleted?: BoolFilter<"Member"> | boolean
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    privateFinancial?: XOR<MemberPrivateFinancialNullableRelationFilter, MemberPrivateFinancialWhereInput> | null
    auditLogs?: AuditLogListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    sequenceNumber?: SortOrder
    memberNumber?: SortOrderInput | SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    privateFinancial?: MemberPrivateFinancialOrderByWithRelationInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberNumber?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    sequenceNumber?: IntFilter<"Member"> | number
    fullName?: StringFilter<"Member"> | string
    phone?: StringFilter<"Member"> | string
    isDeleted?: BoolFilter<"Member"> | boolean
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    privateFinancial?: XOR<MemberPrivateFinancialNullableRelationFilter, MemberPrivateFinancialWhereInput> | null
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "memberNumber">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    sequenceNumber?: SortOrder
    memberNumber?: SortOrderInput | SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _avg?: MemberAvgOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
    _sum?: MemberSumOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    sequenceNumber?: IntWithAggregatesFilter<"Member"> | number
    memberNumber?: StringNullableWithAggregatesFilter<"Member"> | string | null
    fullName?: StringWithAggregatesFilter<"Member"> | string
    phone?: StringWithAggregatesFilter<"Member"> | string
    isDeleted?: BoolWithAggregatesFilter<"Member"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type MemberPrivateFinancialWhereInput = {
    AND?: MemberPrivateFinancialWhereInput | MemberPrivateFinancialWhereInput[]
    OR?: MemberPrivateFinancialWhereInput[]
    NOT?: MemberPrivateFinancialWhereInput | MemberPrivateFinancialWhereInput[]
    id?: StringFilter<"MemberPrivateFinancial"> | string
    memberId?: StringFilter<"MemberPrivateFinancial"> | string
    plotSize?: DecimalNullableFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    downPayment?: DecimalNullableFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"MemberPrivateFinancial"> | Date | string
    updatedAt?: DateTimeFilter<"MemberPrivateFinancial"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    plans?: InstallmentPlanListRelationFilter
  }

  export type MemberPrivateFinancialOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    plotSize?: SortOrderInput | SortOrder
    downPayment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    plans?: InstallmentPlanOrderByRelationAggregateInput
  }

  export type MemberPrivateFinancialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberId?: string
    AND?: MemberPrivateFinancialWhereInput | MemberPrivateFinancialWhereInput[]
    OR?: MemberPrivateFinancialWhereInput[]
    NOT?: MemberPrivateFinancialWhereInput | MemberPrivateFinancialWhereInput[]
    plotSize?: DecimalNullableFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    downPayment?: DecimalNullableFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"MemberPrivateFinancial"> | Date | string
    updatedAt?: DateTimeFilter<"MemberPrivateFinancial"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    plans?: InstallmentPlanListRelationFilter
  }, "id" | "memberId">

  export type MemberPrivateFinancialOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    plotSize?: SortOrderInput | SortOrder
    downPayment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberPrivateFinancialCountOrderByAggregateInput
    _avg?: MemberPrivateFinancialAvgOrderByAggregateInput
    _max?: MemberPrivateFinancialMaxOrderByAggregateInput
    _min?: MemberPrivateFinancialMinOrderByAggregateInput
    _sum?: MemberPrivateFinancialSumOrderByAggregateInput
  }

  export type MemberPrivateFinancialScalarWhereWithAggregatesInput = {
    AND?: MemberPrivateFinancialScalarWhereWithAggregatesInput | MemberPrivateFinancialScalarWhereWithAggregatesInput[]
    OR?: MemberPrivateFinancialScalarWhereWithAggregatesInput[]
    NOT?: MemberPrivateFinancialScalarWhereWithAggregatesInput | MemberPrivateFinancialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberPrivateFinancial"> | string
    memberId?: StringWithAggregatesFilter<"MemberPrivateFinancial"> | string
    plotSize?: DecimalNullableWithAggregatesFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    downPayment?: DecimalNullableWithAggregatesFilter<"MemberPrivateFinancial"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MemberPrivateFinancial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberPrivateFinancial"> | Date | string
  }

  export type InstallmentPlanWhereInput = {
    AND?: InstallmentPlanWhereInput | InstallmentPlanWhereInput[]
    OR?: InstallmentPlanWhereInput[]
    NOT?: InstallmentPlanWhereInput | InstallmentPlanWhereInput[]
    id?: StringFilter<"InstallmentPlan"> | string
    privateFinancialId?: StringFilter<"InstallmentPlan"> | string
    status?: EnumPlanStatusFilter<"InstallmentPlan"> | $Enums.PlanStatus
    totalInstallments?: IntFilter<"InstallmentPlan"> | number
    createdAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
    updatedAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
    privateFinancial?: XOR<MemberPrivateFinancialRelationFilter, MemberPrivateFinancialWhereInput>
    installments?: InstallmentListRelationFilter
  }

  export type InstallmentPlanOrderByWithRelationInput = {
    id?: SortOrder
    privateFinancialId?: SortOrder
    status?: SortOrder
    totalInstallments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    privateFinancial?: MemberPrivateFinancialOrderByWithRelationInput
    installments?: InstallmentOrderByRelationAggregateInput
  }

  export type InstallmentPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstallmentPlanWhereInput | InstallmentPlanWhereInput[]
    OR?: InstallmentPlanWhereInput[]
    NOT?: InstallmentPlanWhereInput | InstallmentPlanWhereInput[]
    privateFinancialId?: StringFilter<"InstallmentPlan"> | string
    status?: EnumPlanStatusFilter<"InstallmentPlan"> | $Enums.PlanStatus
    totalInstallments?: IntFilter<"InstallmentPlan"> | number
    createdAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
    updatedAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
    privateFinancial?: XOR<MemberPrivateFinancialRelationFilter, MemberPrivateFinancialWhereInput>
    installments?: InstallmentListRelationFilter
  }, "id">

  export type InstallmentPlanOrderByWithAggregationInput = {
    id?: SortOrder
    privateFinancialId?: SortOrder
    status?: SortOrder
    totalInstallments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InstallmentPlanCountOrderByAggregateInput
    _avg?: InstallmentPlanAvgOrderByAggregateInput
    _max?: InstallmentPlanMaxOrderByAggregateInput
    _min?: InstallmentPlanMinOrderByAggregateInput
    _sum?: InstallmentPlanSumOrderByAggregateInput
  }

  export type InstallmentPlanScalarWhereWithAggregatesInput = {
    AND?: InstallmentPlanScalarWhereWithAggregatesInput | InstallmentPlanScalarWhereWithAggregatesInput[]
    OR?: InstallmentPlanScalarWhereWithAggregatesInput[]
    NOT?: InstallmentPlanScalarWhereWithAggregatesInput | InstallmentPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InstallmentPlan"> | string
    privateFinancialId?: StringWithAggregatesFilter<"InstallmentPlan"> | string
    status?: EnumPlanStatusWithAggregatesFilter<"InstallmentPlan"> | $Enums.PlanStatus
    totalInstallments?: IntWithAggregatesFilter<"InstallmentPlan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"InstallmentPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InstallmentPlan"> | Date | string
  }

  export type InstallmentWhereInput = {
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    id?: StringFilter<"Installment"> | string
    planId?: StringFilter<"Installment"> | string
    installmentNumber?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumPaymentStatusFilter<"Installment"> | $Enums.PaymentStatus
    bankId?: StringNullableFilter<"Installment"> | string | null
    paymentDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    receiptNumber?: StringNullableFilter<"Installment"> | string | null
    notes?: StringNullableFilter<"Installment"> | string | null
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
    plan?: XOR<InstallmentPlanRelationFilter, InstallmentPlanWhereInput>
    bank?: XOR<BankNullableRelationFilter, BankWhereInput> | null
  }

  export type InstallmentOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    installmentNumber?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    bankId?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: InstallmentPlanOrderByWithRelationInput
    bank?: BankOrderByWithRelationInput
  }

  export type InstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    planId_installmentNumber?: InstallmentPlanIdInstallmentNumberCompoundUniqueInput
    AND?: InstallmentWhereInput | InstallmentWhereInput[]
    OR?: InstallmentWhereInput[]
    NOT?: InstallmentWhereInput | InstallmentWhereInput[]
    planId?: StringFilter<"Installment"> | string
    installmentNumber?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumPaymentStatusFilter<"Installment"> | $Enums.PaymentStatus
    bankId?: StringNullableFilter<"Installment"> | string | null
    paymentDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    receiptNumber?: StringNullableFilter<"Installment"> | string | null
    notes?: StringNullableFilter<"Installment"> | string | null
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
    plan?: XOR<InstallmentPlanRelationFilter, InstallmentPlanWhereInput>
    bank?: XOR<BankNullableRelationFilter, BankWhereInput> | null
  }, "id" | "planId_installmentNumber">

  export type InstallmentOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    installmentNumber?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    bankId?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InstallmentCountOrderByAggregateInput
    _avg?: InstallmentAvgOrderByAggregateInput
    _max?: InstallmentMaxOrderByAggregateInput
    _min?: InstallmentMinOrderByAggregateInput
    _sum?: InstallmentSumOrderByAggregateInput
  }

  export type InstallmentScalarWhereWithAggregatesInput = {
    AND?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    OR?: InstallmentScalarWhereWithAggregatesInput[]
    NOT?: InstallmentScalarWhereWithAggregatesInput | InstallmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Installment"> | string
    planId?: StringWithAggregatesFilter<"Installment"> | string
    installmentNumber?: IntWithAggregatesFilter<"Installment"> | number
    amount?: DecimalWithAggregatesFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Installment"> | $Enums.PaymentStatus
    bankId?: StringNullableWithAggregatesFilter<"Installment"> | string | null
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Installment"> | Date | string | null
    receiptNumber?: StringNullableWithAggregatesFilter<"Installment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Installment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Installment"> | Date | string
  }

  export type BankWhereInput = {
    AND?: BankWhereInput | BankWhereInput[]
    OR?: BankWhereInput[]
    NOT?: BankWhereInput | BankWhereInput[]
    id?: StringFilter<"Bank"> | string
    name?: StringFilter<"Bank"> | string
    code?: StringFilter<"Bank"> | string
    logoAsset?: StringNullableFilter<"Bank"> | string | null
    isActive?: BoolFilter<"Bank"> | boolean
    createdAt?: DateTimeFilter<"Bank"> | Date | string
    updatedAt?: DateTimeFilter<"Bank"> | Date | string
    installments?: InstallmentListRelationFilter
  }

  export type BankOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    logoAsset?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    installments?: InstallmentOrderByRelationAggregateInput
  }

  export type BankWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    code?: string
    AND?: BankWhereInput | BankWhereInput[]
    OR?: BankWhereInput[]
    NOT?: BankWhereInput | BankWhereInput[]
    logoAsset?: StringNullableFilter<"Bank"> | string | null
    isActive?: BoolFilter<"Bank"> | boolean
    createdAt?: DateTimeFilter<"Bank"> | Date | string
    updatedAt?: DateTimeFilter<"Bank"> | Date | string
    installments?: InstallmentListRelationFilter
  }, "id" | "name" | "code">

  export type BankOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    logoAsset?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BankCountOrderByAggregateInput
    _max?: BankMaxOrderByAggregateInput
    _min?: BankMinOrderByAggregateInput
  }

  export type BankScalarWhereWithAggregatesInput = {
    AND?: BankScalarWhereWithAggregatesInput | BankScalarWhereWithAggregatesInput[]
    OR?: BankScalarWhereWithAggregatesInput[]
    NOT?: BankScalarWhereWithAggregatesInput | BankScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bank"> | string
    name?: StringWithAggregatesFilter<"Bank"> | string
    code?: StringWithAggregatesFilter<"Bank"> | string
    logoAsset?: StringNullableWithAggregatesFilter<"Bank"> | string | null
    isActive?: BoolWithAggregatesFilter<"Bank"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Bank"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bank"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    eventType?: StringFilter<"AuditLog"> | string
    actorType?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    memberId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    previousHash?: StringFilter<"AuditLog"> | string
    currentHash?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    member?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    memberId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    previousHash?: SortOrder
    currentHash?: SortOrder
    createdAt?: SortOrder
    member?: MemberOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    eventType?: StringFilter<"AuditLog"> | string
    actorType?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    memberId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    previousHash?: StringFilter<"AuditLog"> | string
    currentHash?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    member?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    memberId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    previousHash?: SortOrder
    currentHash?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    eventType?: StringWithAggregatesFilter<"AuditLog"> | string
    actorType?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    memberId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    previousHash?: StringWithAggregatesFilter<"AuditLog"> | string
    currentHash?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SecurityEventWhereInput = {
    AND?: SecurityEventWhereInput | SecurityEventWhereInput[]
    OR?: SecurityEventWhereInput[]
    NOT?: SecurityEventWhereInput | SecurityEventWhereInput[]
    id?: StringFilter<"SecurityEvent"> | string
    type?: StringFilter<"SecurityEvent"> | string
    severity?: StringFilter<"SecurityEvent"> | string
    message?: StringFilter<"SecurityEvent"> | string
    resolvedAt?: DateTimeNullableFilter<"SecurityEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"SecurityEvent"> | Date | string
  }

  export type SecurityEventOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityEventWhereInput | SecurityEventWhereInput[]
    OR?: SecurityEventWhereInput[]
    NOT?: SecurityEventWhereInput | SecurityEventWhereInput[]
    type?: StringFilter<"SecurityEvent"> | string
    severity?: StringFilter<"SecurityEvent"> | string
    message?: StringFilter<"SecurityEvent"> | string
    resolvedAt?: DateTimeNullableFilter<"SecurityEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"SecurityEvent"> | Date | string
  }, "id">

  export type SecurityEventOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SecurityEventCountOrderByAggregateInput
    _max?: SecurityEventMaxOrderByAggregateInput
    _min?: SecurityEventMinOrderByAggregateInput
  }

  export type SecurityEventScalarWhereWithAggregatesInput = {
    AND?: SecurityEventScalarWhereWithAggregatesInput | SecurityEventScalarWhereWithAggregatesInput[]
    OR?: SecurityEventScalarWhereWithAggregatesInput[]
    NOT?: SecurityEventScalarWhereWithAggregatesInput | SecurityEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityEvent"> | string
    type?: StringWithAggregatesFilter<"SecurityEvent"> | string
    severity?: StringWithAggregatesFilter<"SecurityEvent"> | string
    message?: StringWithAggregatesFilter<"SecurityEvent"> | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"SecurityEvent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SecurityEvent"> | Date | string
  }

  export type AppSettingsWhereInput = {
    AND?: AppSettingsWhereInput | AppSettingsWhereInput[]
    OR?: AppSettingsWhereInput[]
    NOT?: AppSettingsWhereInput | AppSettingsWhereInput[]
    key?: StringFilter<"AppSettings"> | string
    value?: StringFilter<"AppSettings"> | string
    isEncrypted?: BoolFilter<"AppSettings"> | boolean
    updatedAt?: DateTimeFilter<"AppSettings"> | Date | string
  }

  export type AppSettingsOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    isEncrypted?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingsWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppSettingsWhereInput | AppSettingsWhereInput[]
    OR?: AppSettingsWhereInput[]
    NOT?: AppSettingsWhereInput | AppSettingsWhereInput[]
    value?: StringFilter<"AppSettings"> | string
    isEncrypted?: BoolFilter<"AppSettings"> | boolean
    updatedAt?: DateTimeFilter<"AppSettings"> | Date | string
  }, "key">

  export type AppSettingsOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    isEncrypted?: SortOrder
    updatedAt?: SortOrder
    _count?: AppSettingsCountOrderByAggregateInput
    _max?: AppSettingsMaxOrderByAggregateInput
    _min?: AppSettingsMinOrderByAggregateInput
  }

  export type AppSettingsScalarWhereWithAggregatesInput = {
    AND?: AppSettingsScalarWhereWithAggregatesInput | AppSettingsScalarWhereWithAggregatesInput[]
    OR?: AppSettingsScalarWhereWithAggregatesInput[]
    NOT?: AppSettingsScalarWhereWithAggregatesInput | AppSettingsScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppSettings"> | string
    value?: StringWithAggregatesFilter<"AppSettings"> | string
    isEncrypted?: BoolWithAggregatesFilter<"AppSettings"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"AppSettings"> | Date | string
  }

  export type BannedIpWhereInput = {
    AND?: BannedIpWhereInput | BannedIpWhereInput[]
    OR?: BannedIpWhereInput[]
    NOT?: BannedIpWhereInput | BannedIpWhereInput[]
    id?: StringFilter<"BannedIp"> | string
    ipAddress?: StringFilter<"BannedIp"> | string
    normalizedIp?: StringFilter<"BannedIp"> | string
    reason?: StringFilter<"BannedIp"> | string
    bannedAt?: DateTimeFilter<"BannedIp"> | Date | string
    bannedBy?: StringFilter<"BannedIp"> | string
    failedAttemptCount?: IntFilter<"BannedIp"> | number
    lastAttemptAt?: DateTimeNullableFilter<"BannedIp"> | Date | string | null
    active?: BoolFilter<"BannedIp"> | boolean
    unbannedAt?: DateTimeNullableFilter<"BannedIp"> | Date | string | null
    unbannedBy?: StringNullableFilter<"BannedIp"> | string | null
    metadata?: StringNullableFilter<"BannedIp"> | string | null
    createdAt?: DateTimeFilter<"BannedIp"> | Date | string
    updatedAt?: DateTimeFilter<"BannedIp"> | Date | string
  }

  export type BannedIpOrderByWithRelationInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    normalizedIp?: SortOrder
    reason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    failedAttemptCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    active?: SortOrder
    unbannedAt?: SortOrderInput | SortOrder
    unbannedBy?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BannedIpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ipAddress?: string
    normalizedIp?: string
    AND?: BannedIpWhereInput | BannedIpWhereInput[]
    OR?: BannedIpWhereInput[]
    NOT?: BannedIpWhereInput | BannedIpWhereInput[]
    reason?: StringFilter<"BannedIp"> | string
    bannedAt?: DateTimeFilter<"BannedIp"> | Date | string
    bannedBy?: StringFilter<"BannedIp"> | string
    failedAttemptCount?: IntFilter<"BannedIp"> | number
    lastAttemptAt?: DateTimeNullableFilter<"BannedIp"> | Date | string | null
    active?: BoolFilter<"BannedIp"> | boolean
    unbannedAt?: DateTimeNullableFilter<"BannedIp"> | Date | string | null
    unbannedBy?: StringNullableFilter<"BannedIp"> | string | null
    metadata?: StringNullableFilter<"BannedIp"> | string | null
    createdAt?: DateTimeFilter<"BannedIp"> | Date | string
    updatedAt?: DateTimeFilter<"BannedIp"> | Date | string
  }, "id" | "ipAddress" | "normalizedIp">

  export type BannedIpOrderByWithAggregationInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    normalizedIp?: SortOrder
    reason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    failedAttemptCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    active?: SortOrder
    unbannedAt?: SortOrderInput | SortOrder
    unbannedBy?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BannedIpCountOrderByAggregateInput
    _avg?: BannedIpAvgOrderByAggregateInput
    _max?: BannedIpMaxOrderByAggregateInput
    _min?: BannedIpMinOrderByAggregateInput
    _sum?: BannedIpSumOrderByAggregateInput
  }

  export type BannedIpScalarWhereWithAggregatesInput = {
    AND?: BannedIpScalarWhereWithAggregatesInput | BannedIpScalarWhereWithAggregatesInput[]
    OR?: BannedIpScalarWhereWithAggregatesInput[]
    NOT?: BannedIpScalarWhereWithAggregatesInput | BannedIpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BannedIp"> | string
    ipAddress?: StringWithAggregatesFilter<"BannedIp"> | string
    normalizedIp?: StringWithAggregatesFilter<"BannedIp"> | string
    reason?: StringWithAggregatesFilter<"BannedIp"> | string
    bannedAt?: DateTimeWithAggregatesFilter<"BannedIp"> | Date | string
    bannedBy?: StringWithAggregatesFilter<"BannedIp"> | string
    failedAttemptCount?: IntWithAggregatesFilter<"BannedIp"> | number
    lastAttemptAt?: DateTimeNullableWithAggregatesFilter<"BannedIp"> | Date | string | null
    active?: BoolWithAggregatesFilter<"BannedIp"> | boolean
    unbannedAt?: DateTimeNullableWithAggregatesFilter<"BannedIp"> | Date | string | null
    unbannedBy?: StringNullableWithAggregatesFilter<"BannedIp"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"BannedIp"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BannedIp"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BannedIp"> | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    username: string
    displayName: string
    passwordHash: string
    failedLoginCount?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    username: string
    displayName: string
    passwordHash: string
    failedLoginCount?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedLoginCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedLoginCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManyInput = {
    id?: string
    username: string
    displayName: string
    passwordHash: string
    failedLoginCount?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedLoginCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedLoginCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateCredentialCreateInput = {
    id?: string
    passwordHash: string
    failedAttemptCount?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateCredentialUncheckedCreateInput = {
    id?: string
    passwordHash: string
    failedAttemptCount?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateCredentialCreateManyInput = {
    id?: string
    passwordHash: string
    failedAttemptCount?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial?: MemberPrivateFinancialCreateNestedOneWithoutMemberInput
    auditLogs?: AuditLogCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial?: MemberPrivateFinancialUncheckedCreateNestedOneWithoutMemberInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUpdateOneWithoutMemberNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUncheckedUpdateOneWithoutMemberNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberPrivateFinancialCreateInput = {
    id?: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutPrivateFinancialInput
    plans?: InstallmentPlanCreateNestedManyWithoutPrivateFinancialInput
  }

  export type MemberPrivateFinancialUncheckedCreateInput = {
    id?: string
    memberId: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plans?: InstallmentPlanUncheckedCreateNestedManyWithoutPrivateFinancialInput
  }

  export type MemberPrivateFinancialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutPrivateFinancialNestedInput
    plans?: InstallmentPlanUpdateManyWithoutPrivateFinancialNestedInput
  }

  export type MemberPrivateFinancialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: InstallmentPlanUncheckedUpdateManyWithoutPrivateFinancialNestedInput
  }

  export type MemberPrivateFinancialCreateManyInput = {
    id?: string
    memberId: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberPrivateFinancialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberPrivateFinancialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentPlanCreateInput = {
    id?: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial: MemberPrivateFinancialCreateNestedOneWithoutPlansInput
    installments?: InstallmentCreateNestedManyWithoutPlanInput
  }

  export type InstallmentPlanUncheckedCreateInput = {
    id?: string
    privateFinancialId: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutPlanInput
  }

  export type InstallmentPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUpdateOneRequiredWithoutPlansNestedInput
    installments?: InstallmentUpdateManyWithoutPlanNestedInput
  }

  export type InstallmentPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateFinancialId?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type InstallmentPlanCreateManyInput = {
    id?: string
    privateFinancialId: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateFinancialId?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateInput = {
    id?: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: InstallmentPlanCreateNestedOneWithoutInstallmentsInput
    bank?: BankCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateInput = {
    id?: string
    planId: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    bankId?: string | null
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: InstallmentPlanUpdateOneRequiredWithoutInstallmentsNestedInput
    bank?: BankUpdateOneWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateManyInput = {
    id?: string
    planId: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    bankId?: string | null
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankCreateInput = {
    id?: string
    name: string
    code: string
    logoAsset?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentCreateNestedManyWithoutBankInput
  }

  export type BankUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    logoAsset?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutBankInput
  }

  export type BankUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUpdateManyWithoutBankNestedInput
  }

  export type BankUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutBankNestedInput
  }

  export type BankCreateManyInput = {
    id?: string
    name: string
    code: string
    logoAsset?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
    member?: MemberCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    memberId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    memberId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventCreateInput = {
    id?: string
    type: string
    severity: string
    message: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SecurityEventUncheckedCreateInput = {
    id?: string
    type: string
    severity: string
    message: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SecurityEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventCreateManyInput = {
    id?: string
    type: string
    severity: string
    message: string
    resolvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SecurityEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingsCreateInput = {
    key: string
    value: string
    isEncrypted?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingsUncheckedCreateInput = {
    key: string
    value: string
    isEncrypted?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingsUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingsUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingsCreateManyInput = {
    key: string
    value: string
    isEncrypted?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingsUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingsUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BannedIpCreateInput = {
    id?: string
    ipAddress: string
    normalizedIp: string
    reason: string
    bannedAt?: Date | string
    bannedBy?: string
    failedAttemptCount?: number
    lastAttemptAt?: Date | string | null
    active?: boolean
    unbannedAt?: Date | string | null
    unbannedBy?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BannedIpUncheckedCreateInput = {
    id?: string
    ipAddress: string
    normalizedIp: string
    reason: string
    bannedAt?: Date | string
    bannedBy?: string
    failedAttemptCount?: number
    lastAttemptAt?: Date | string | null
    active?: boolean
    unbannedAt?: Date | string | null
    unbannedBy?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BannedIpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    normalizedIp?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    bannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bannedBy?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    unbannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unbannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BannedIpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    normalizedIp?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    bannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bannedBy?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    unbannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unbannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BannedIpCreateManyInput = {
    id?: string
    ipAddress: string
    normalizedIp: string
    reason: string
    bannedAt?: Date | string
    bannedBy?: string
    failedAttemptCount?: number
    lastAttemptAt?: Date | string | null
    active?: boolean
    unbannedAt?: Date | string | null
    unbannedBy?: string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BannedIpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    normalizedIp?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    bannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bannedBy?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    unbannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unbannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BannedIpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    normalizedIp?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    bannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bannedBy?: StringFieldUpdateOperationsInput | string
    failedAttemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    unbannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unbannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    failedLoginCount?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserAvgOrderByAggregateInput = {
    failedLoginCount?: SortOrder
    version?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    failedLoginCount?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    failedLoginCount?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserSumOrderByAggregateInput = {
    failedLoginCount?: SortOrder
    version?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PrivateCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    passwordHash?: SortOrder
    failedAttemptCount?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateCredentialAvgOrderByAggregateInput = {
    failedAttemptCount?: SortOrder
  }

  export type PrivateCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    passwordHash?: SortOrder
    failedAttemptCount?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    passwordHash?: SortOrder
    failedAttemptCount?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateCredentialSumOrderByAggregateInput = {
    failedAttemptCount?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MemberPrivateFinancialNullableRelationFilter = {
    is?: MemberPrivateFinancialWhereInput | null
    isNot?: MemberPrivateFinancialWhereInput | null
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    sequenceNumber?: SortOrder
    memberNumber?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberAvgOrderByAggregateInput = {
    sequenceNumber?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    sequenceNumber?: SortOrder
    memberNumber?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    sequenceNumber?: SortOrder
    memberNumber?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberSumOrderByAggregateInput = {
    sequenceNumber?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type MemberRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type InstallmentPlanListRelationFilter = {
    every?: InstallmentPlanWhereInput
    some?: InstallmentPlanWhereInput
    none?: InstallmentPlanWhereInput
  }

  export type InstallmentPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberPrivateFinancialCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    plotSize?: SortOrder
    downPayment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberPrivateFinancialAvgOrderByAggregateInput = {
    plotSize?: SortOrder
    downPayment?: SortOrder
  }

  export type MemberPrivateFinancialMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    plotSize?: SortOrder
    downPayment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberPrivateFinancialMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    plotSize?: SortOrder
    downPayment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberPrivateFinancialSumOrderByAggregateInput = {
    plotSize?: SortOrder
    downPayment?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusFilter<$PrismaModel> | $Enums.PlanStatus
  }

  export type MemberPrivateFinancialRelationFilter = {
    is?: MemberPrivateFinancialWhereInput
    isNot?: MemberPrivateFinancialWhereInput
  }

  export type InstallmentListRelationFilter = {
    every?: InstallmentWhereInput
    some?: InstallmentWhereInput
    none?: InstallmentWhereInput
  }

  export type InstallmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstallmentPlanCountOrderByAggregateInput = {
    id?: SortOrder
    privateFinancialId?: SortOrder
    status?: SortOrder
    totalInstallments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentPlanAvgOrderByAggregateInput = {
    totalInstallments?: SortOrder
  }

  export type InstallmentPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    privateFinancialId?: SortOrder
    status?: SortOrder
    totalInstallments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentPlanMinOrderByAggregateInput = {
    id?: SortOrder
    privateFinancialId?: SortOrder
    status?: SortOrder
    totalInstallments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentPlanSumOrderByAggregateInput = {
    totalInstallments?: SortOrder
  }

  export type EnumPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.PlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanStatusFilter<$PrismaModel>
    _max?: NestedEnumPlanStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type InstallmentPlanRelationFilter = {
    is?: InstallmentPlanWhereInput
    isNot?: InstallmentPlanWhereInput
  }

  export type BankNullableRelationFilter = {
    is?: BankWhereInput | null
    isNot?: BankWhereInput | null
  }

  export type InstallmentPlanIdInstallmentNumberCompoundUniqueInput = {
    planId: string
    installmentNumber: number
  }

  export type InstallmentCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    installmentNumber?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    bankId?: SortOrder
    paymentDate?: SortOrder
    receiptNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentAvgOrderByAggregateInput = {
    installmentNumber?: SortOrder
    amount?: SortOrder
  }

  export type InstallmentMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    installmentNumber?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    bankId?: SortOrder
    paymentDate?: SortOrder
    receiptNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    installmentNumber?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    bankId?: SortOrder
    paymentDate?: SortOrder
    receiptNumber?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallmentSumOrderByAggregateInput = {
    installmentNumber?: SortOrder
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type BankCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    logoAsset?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BankMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    logoAsset?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BankMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    logoAsset?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberNullableRelationFilter = {
    is?: MemberWhereInput | null
    isNot?: MemberWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    memberId?: SortOrder
    metadata?: SortOrder
    previousHash?: SortOrder
    currentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    memberId?: SortOrder
    metadata?: SortOrder
    previousHash?: SortOrder
    currentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    memberId?: SortOrder
    metadata?: SortOrder
    previousHash?: SortOrder
    currentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AppSettingsCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isEncrypted?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingsMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isEncrypted?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingsMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isEncrypted?: SortOrder
    updatedAt?: SortOrder
  }

  export type BannedIpCountOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    normalizedIp?: SortOrder
    reason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    failedAttemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    active?: SortOrder
    unbannedAt?: SortOrder
    unbannedBy?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BannedIpAvgOrderByAggregateInput = {
    failedAttemptCount?: SortOrder
  }

  export type BannedIpMaxOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    normalizedIp?: SortOrder
    reason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    failedAttemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    active?: SortOrder
    unbannedAt?: SortOrder
    unbannedBy?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BannedIpMinOrderByAggregateInput = {
    id?: SortOrder
    ipAddress?: SortOrder
    normalizedIp?: SortOrder
    reason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    failedAttemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    active?: SortOrder
    unbannedAt?: SortOrder
    unbannedBy?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BannedIpSumOrderByAggregateInput = {
    failedAttemptCount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MemberPrivateFinancialCreateNestedOneWithoutMemberInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutMemberInput
    connect?: MemberPrivateFinancialWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutMemberInput = {
    create?: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput> | AuditLogCreateWithoutMemberInput[] | AuditLogUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMemberInput | AuditLogCreateOrConnectWithoutMemberInput[]
    createMany?: AuditLogCreateManyMemberInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MemberPrivateFinancialUncheckedCreateNestedOneWithoutMemberInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutMemberInput
    connect?: MemberPrivateFinancialWhereUniqueInput
  }

  export type AuditLogUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput> | AuditLogCreateWithoutMemberInput[] | AuditLogUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMemberInput | AuditLogCreateOrConnectWithoutMemberInput[]
    createMany?: AuditLogCreateManyMemberInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MemberPrivateFinancialUpdateOneWithoutMemberNestedInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutMemberInput
    upsert?: MemberPrivateFinancialUpsertWithoutMemberInput
    disconnect?: MemberPrivateFinancialWhereInput | boolean
    delete?: MemberPrivateFinancialWhereInput | boolean
    connect?: MemberPrivateFinancialWhereUniqueInput
    update?: XOR<XOR<MemberPrivateFinancialUpdateToOneWithWhereWithoutMemberInput, MemberPrivateFinancialUpdateWithoutMemberInput>, MemberPrivateFinancialUncheckedUpdateWithoutMemberInput>
  }

  export type AuditLogUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput> | AuditLogCreateWithoutMemberInput[] | AuditLogUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMemberInput | AuditLogCreateOrConnectWithoutMemberInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMemberInput | AuditLogUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AuditLogCreateManyMemberInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMemberInput | AuditLogUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMemberInput | AuditLogUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MemberPrivateFinancialUncheckedUpdateOneWithoutMemberNestedInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutMemberInput
    upsert?: MemberPrivateFinancialUpsertWithoutMemberInput
    disconnect?: MemberPrivateFinancialWhereInput | boolean
    delete?: MemberPrivateFinancialWhereInput | boolean
    connect?: MemberPrivateFinancialWhereUniqueInput
    update?: XOR<XOR<MemberPrivateFinancialUpdateToOneWithWhereWithoutMemberInput, MemberPrivateFinancialUpdateWithoutMemberInput>, MemberPrivateFinancialUncheckedUpdateWithoutMemberInput>
  }

  export type AuditLogUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput> | AuditLogCreateWithoutMemberInput[] | AuditLogUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMemberInput | AuditLogCreateOrConnectWithoutMemberInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMemberInput | AuditLogUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AuditLogCreateManyMemberInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMemberInput | AuditLogUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMemberInput | AuditLogUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MemberCreateNestedOneWithoutPrivateFinancialInput = {
    create?: XOR<MemberCreateWithoutPrivateFinancialInput, MemberUncheckedCreateWithoutPrivateFinancialInput>
    connectOrCreate?: MemberCreateOrConnectWithoutPrivateFinancialInput
    connect?: MemberWhereUniqueInput
  }

  export type InstallmentPlanCreateNestedManyWithoutPrivateFinancialInput = {
    create?: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput> | InstallmentPlanCreateWithoutPrivateFinancialInput[] | InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput[]
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput | InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput[]
    createMany?: InstallmentPlanCreateManyPrivateFinancialInputEnvelope
    connect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
  }

  export type InstallmentPlanUncheckedCreateNestedManyWithoutPrivateFinancialInput = {
    create?: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput> | InstallmentPlanCreateWithoutPrivateFinancialInput[] | InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput[]
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput | InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput[]
    createMany?: InstallmentPlanCreateManyPrivateFinancialInputEnvelope
    connect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type MemberUpdateOneRequiredWithoutPrivateFinancialNestedInput = {
    create?: XOR<MemberCreateWithoutPrivateFinancialInput, MemberUncheckedCreateWithoutPrivateFinancialInput>
    connectOrCreate?: MemberCreateOrConnectWithoutPrivateFinancialInput
    upsert?: MemberUpsertWithoutPrivateFinancialInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutPrivateFinancialInput, MemberUpdateWithoutPrivateFinancialInput>, MemberUncheckedUpdateWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanUpdateManyWithoutPrivateFinancialNestedInput = {
    create?: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput> | InstallmentPlanCreateWithoutPrivateFinancialInput[] | InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput[]
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput | InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput[]
    upsert?: InstallmentPlanUpsertWithWhereUniqueWithoutPrivateFinancialInput | InstallmentPlanUpsertWithWhereUniqueWithoutPrivateFinancialInput[]
    createMany?: InstallmentPlanCreateManyPrivateFinancialInputEnvelope
    set?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    disconnect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    delete?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    connect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    update?: InstallmentPlanUpdateWithWhereUniqueWithoutPrivateFinancialInput | InstallmentPlanUpdateWithWhereUniqueWithoutPrivateFinancialInput[]
    updateMany?: InstallmentPlanUpdateManyWithWhereWithoutPrivateFinancialInput | InstallmentPlanUpdateManyWithWhereWithoutPrivateFinancialInput[]
    deleteMany?: InstallmentPlanScalarWhereInput | InstallmentPlanScalarWhereInput[]
  }

  export type InstallmentPlanUncheckedUpdateManyWithoutPrivateFinancialNestedInput = {
    create?: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput> | InstallmentPlanCreateWithoutPrivateFinancialInput[] | InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput[]
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput | InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput[]
    upsert?: InstallmentPlanUpsertWithWhereUniqueWithoutPrivateFinancialInput | InstallmentPlanUpsertWithWhereUniqueWithoutPrivateFinancialInput[]
    createMany?: InstallmentPlanCreateManyPrivateFinancialInputEnvelope
    set?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    disconnect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    delete?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    connect?: InstallmentPlanWhereUniqueInput | InstallmentPlanWhereUniqueInput[]
    update?: InstallmentPlanUpdateWithWhereUniqueWithoutPrivateFinancialInput | InstallmentPlanUpdateWithWhereUniqueWithoutPrivateFinancialInput[]
    updateMany?: InstallmentPlanUpdateManyWithWhereWithoutPrivateFinancialInput | InstallmentPlanUpdateManyWithWhereWithoutPrivateFinancialInput[]
    deleteMany?: InstallmentPlanScalarWhereInput | InstallmentPlanScalarWhereInput[]
  }

  export type MemberPrivateFinancialCreateNestedOneWithoutPlansInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutPlansInput, MemberPrivateFinancialUncheckedCreateWithoutPlansInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutPlansInput
    connect?: MemberPrivateFinancialWhereUniqueInput
  }

  export type InstallmentCreateNestedManyWithoutPlanInput = {
    create?: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput> | InstallmentCreateWithoutPlanInput[] | InstallmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutPlanInput | InstallmentCreateOrConnectWithoutPlanInput[]
    createMany?: InstallmentCreateManyPlanInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type InstallmentUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput> | InstallmentCreateWithoutPlanInput[] | InstallmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutPlanInput | InstallmentCreateOrConnectWithoutPlanInput[]
    createMany?: InstallmentCreateManyPlanInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type EnumPlanStatusFieldUpdateOperationsInput = {
    set?: $Enums.PlanStatus
  }

  export type MemberPrivateFinancialUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<MemberPrivateFinancialCreateWithoutPlansInput, MemberPrivateFinancialUncheckedCreateWithoutPlansInput>
    connectOrCreate?: MemberPrivateFinancialCreateOrConnectWithoutPlansInput
    upsert?: MemberPrivateFinancialUpsertWithoutPlansInput
    connect?: MemberPrivateFinancialWhereUniqueInput
    update?: XOR<XOR<MemberPrivateFinancialUpdateToOneWithWhereWithoutPlansInput, MemberPrivateFinancialUpdateWithoutPlansInput>, MemberPrivateFinancialUncheckedUpdateWithoutPlansInput>
  }

  export type InstallmentUpdateManyWithoutPlanNestedInput = {
    create?: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput> | InstallmentCreateWithoutPlanInput[] | InstallmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutPlanInput | InstallmentCreateOrConnectWithoutPlanInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutPlanInput | InstallmentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: InstallmentCreateManyPlanInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutPlanInput | InstallmentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutPlanInput | InstallmentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type InstallmentUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput> | InstallmentCreateWithoutPlanInput[] | InstallmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutPlanInput | InstallmentCreateOrConnectWithoutPlanInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutPlanInput | InstallmentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: InstallmentCreateManyPlanInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutPlanInput | InstallmentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutPlanInput | InstallmentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type InstallmentPlanCreateNestedOneWithoutInstallmentsInput = {
    create?: XOR<InstallmentPlanCreateWithoutInstallmentsInput, InstallmentPlanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutInstallmentsInput
    connect?: InstallmentPlanWhereUniqueInput
  }

  export type BankCreateNestedOneWithoutInstallmentsInput = {
    create?: XOR<BankCreateWithoutInstallmentsInput, BankUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: BankCreateOrConnectWithoutInstallmentsInput
    connect?: BankWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type InstallmentPlanUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: XOR<InstallmentPlanCreateWithoutInstallmentsInput, InstallmentPlanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: InstallmentPlanCreateOrConnectWithoutInstallmentsInput
    upsert?: InstallmentPlanUpsertWithoutInstallmentsInput
    connect?: InstallmentPlanWhereUniqueInput
    update?: XOR<XOR<InstallmentPlanUpdateToOneWithWhereWithoutInstallmentsInput, InstallmentPlanUpdateWithoutInstallmentsInput>, InstallmentPlanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type BankUpdateOneWithoutInstallmentsNestedInput = {
    create?: XOR<BankCreateWithoutInstallmentsInput, BankUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: BankCreateOrConnectWithoutInstallmentsInput
    upsert?: BankUpsertWithoutInstallmentsInput
    disconnect?: BankWhereInput | boolean
    delete?: BankWhereInput | boolean
    connect?: BankWhereUniqueInput
    update?: XOR<XOR<BankUpdateToOneWithWhereWithoutInstallmentsInput, BankUpdateWithoutInstallmentsInput>, BankUncheckedUpdateWithoutInstallmentsInput>
  }

  export type InstallmentCreateNestedManyWithoutBankInput = {
    create?: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput> | InstallmentCreateWithoutBankInput[] | InstallmentUncheckedCreateWithoutBankInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutBankInput | InstallmentCreateOrConnectWithoutBankInput[]
    createMany?: InstallmentCreateManyBankInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type InstallmentUncheckedCreateNestedManyWithoutBankInput = {
    create?: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput> | InstallmentCreateWithoutBankInput[] | InstallmentUncheckedCreateWithoutBankInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutBankInput | InstallmentCreateOrConnectWithoutBankInput[]
    createMany?: InstallmentCreateManyBankInputEnvelope
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
  }

  export type InstallmentUpdateManyWithoutBankNestedInput = {
    create?: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput> | InstallmentCreateWithoutBankInput[] | InstallmentUncheckedCreateWithoutBankInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutBankInput | InstallmentCreateOrConnectWithoutBankInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutBankInput | InstallmentUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: InstallmentCreateManyBankInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutBankInput | InstallmentUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutBankInput | InstallmentUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type InstallmentUncheckedUpdateManyWithoutBankNestedInput = {
    create?: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput> | InstallmentCreateWithoutBankInput[] | InstallmentUncheckedCreateWithoutBankInput[]
    connectOrCreate?: InstallmentCreateOrConnectWithoutBankInput | InstallmentCreateOrConnectWithoutBankInput[]
    upsert?: InstallmentUpsertWithWhereUniqueWithoutBankInput | InstallmentUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: InstallmentCreateManyBankInputEnvelope
    set?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    disconnect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    delete?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    connect?: InstallmentWhereUniqueInput | InstallmentWhereUniqueInput[]
    update?: InstallmentUpdateWithWhereUniqueWithoutBankInput | InstallmentUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: InstallmentUpdateManyWithWhereWithoutBankInput | InstallmentUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
  }

  export type MemberCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<MemberCreateWithoutAuditLogsInput, MemberUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutAuditLogsInput
    connect?: MemberWhereUniqueInput
  }

  export type MemberUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<MemberCreateWithoutAuditLogsInput, MemberUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutAuditLogsInput
    upsert?: MemberUpsertWithoutAuditLogsInput
    disconnect?: MemberWhereInput | boolean
    delete?: MemberWhereInput | boolean
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutAuditLogsInput, MemberUpdateWithoutAuditLogsInput>, MemberUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusFilter<$PrismaModel> | $Enums.PlanStatus
  }

  export type NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.PlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanStatusFilter<$PrismaModel>
    _max?: NestedEnumPlanStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type MemberPrivateFinancialCreateWithoutMemberInput = {
    id?: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plans?: InstallmentPlanCreateNestedManyWithoutPrivateFinancialInput
  }

  export type MemberPrivateFinancialUncheckedCreateWithoutMemberInput = {
    id?: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plans?: InstallmentPlanUncheckedCreateNestedManyWithoutPrivateFinancialInput
  }

  export type MemberPrivateFinancialCreateOrConnectWithoutMemberInput = {
    where: MemberPrivateFinancialWhereUniqueInput
    create: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
  }

  export type AuditLogCreateWithoutMemberInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutMemberInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutMemberInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput>
  }

  export type AuditLogCreateManyMemberInputEnvelope = {
    data: AuditLogCreateManyMemberInput | AuditLogCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type MemberPrivateFinancialUpsertWithoutMemberInput = {
    update: XOR<MemberPrivateFinancialUpdateWithoutMemberInput, MemberPrivateFinancialUncheckedUpdateWithoutMemberInput>
    create: XOR<MemberPrivateFinancialCreateWithoutMemberInput, MemberPrivateFinancialUncheckedCreateWithoutMemberInput>
    where?: MemberPrivateFinancialWhereInput
  }

  export type MemberPrivateFinancialUpdateToOneWithWhereWithoutMemberInput = {
    where?: MemberPrivateFinancialWhereInput
    data: XOR<MemberPrivateFinancialUpdateWithoutMemberInput, MemberPrivateFinancialUncheckedUpdateWithoutMemberInput>
  }

  export type MemberPrivateFinancialUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: InstallmentPlanUpdateManyWithoutPrivateFinancialNestedInput
  }

  export type MemberPrivateFinancialUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plans?: InstallmentPlanUncheckedUpdateManyWithoutPrivateFinancialNestedInput
  }

  export type AuditLogUpsertWithWhereUniqueWithoutMemberInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutMemberInput, AuditLogUncheckedUpdateWithoutMemberInput>
    create: XOR<AuditLogCreateWithoutMemberInput, AuditLogUncheckedCreateWithoutMemberInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutMemberInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutMemberInput, AuditLogUncheckedUpdateWithoutMemberInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutMemberInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutMemberInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    eventType?: StringFilter<"AuditLog"> | string
    actorType?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    memberId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    previousHash?: StringFilter<"AuditLog"> | string
    currentHash?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type MemberCreateWithoutPrivateFinancialInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutPrivateFinancialInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutPrivateFinancialInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutPrivateFinancialInput, MemberUncheckedCreateWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanCreateWithoutPrivateFinancialInput = {
    id?: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentCreateNestedManyWithoutPlanInput
  }

  export type InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput = {
    id?: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: InstallmentUncheckedCreateNestedManyWithoutPlanInput
  }

  export type InstallmentPlanCreateOrConnectWithoutPrivateFinancialInput = {
    where: InstallmentPlanWhereUniqueInput
    create: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanCreateManyPrivateFinancialInputEnvelope = {
    data: InstallmentPlanCreateManyPrivateFinancialInput | InstallmentPlanCreateManyPrivateFinancialInput[]
    skipDuplicates?: boolean
  }

  export type MemberUpsertWithoutPrivateFinancialInput = {
    update: XOR<MemberUpdateWithoutPrivateFinancialInput, MemberUncheckedUpdateWithoutPrivateFinancialInput>
    create: XOR<MemberCreateWithoutPrivateFinancialInput, MemberUncheckedCreateWithoutPrivateFinancialInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutPrivateFinancialInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutPrivateFinancialInput, MemberUncheckedUpdateWithoutPrivateFinancialInput>
  }

  export type MemberUpdateWithoutPrivateFinancialInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutPrivateFinancialInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type InstallmentPlanUpsertWithWhereUniqueWithoutPrivateFinancialInput = {
    where: InstallmentPlanWhereUniqueInput
    update: XOR<InstallmentPlanUpdateWithoutPrivateFinancialInput, InstallmentPlanUncheckedUpdateWithoutPrivateFinancialInput>
    create: XOR<InstallmentPlanCreateWithoutPrivateFinancialInput, InstallmentPlanUncheckedCreateWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanUpdateWithWhereUniqueWithoutPrivateFinancialInput = {
    where: InstallmentPlanWhereUniqueInput
    data: XOR<InstallmentPlanUpdateWithoutPrivateFinancialInput, InstallmentPlanUncheckedUpdateWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanUpdateManyWithWhereWithoutPrivateFinancialInput = {
    where: InstallmentPlanScalarWhereInput
    data: XOR<InstallmentPlanUpdateManyMutationInput, InstallmentPlanUncheckedUpdateManyWithoutPrivateFinancialInput>
  }

  export type InstallmentPlanScalarWhereInput = {
    AND?: InstallmentPlanScalarWhereInput | InstallmentPlanScalarWhereInput[]
    OR?: InstallmentPlanScalarWhereInput[]
    NOT?: InstallmentPlanScalarWhereInput | InstallmentPlanScalarWhereInput[]
    id?: StringFilter<"InstallmentPlan"> | string
    privateFinancialId?: StringFilter<"InstallmentPlan"> | string
    status?: EnumPlanStatusFilter<"InstallmentPlan"> | $Enums.PlanStatus
    totalInstallments?: IntFilter<"InstallmentPlan"> | number
    createdAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
    updatedAt?: DateTimeFilter<"InstallmentPlan"> | Date | string
  }

  export type MemberPrivateFinancialCreateWithoutPlansInput = {
    id?: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutPrivateFinancialInput
  }

  export type MemberPrivateFinancialUncheckedCreateWithoutPlansInput = {
    id?: string
    memberId: string
    plotSize?: Decimal | DecimalJsLike | number | string | null
    downPayment?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberPrivateFinancialCreateOrConnectWithoutPlansInput = {
    where: MemberPrivateFinancialWhereUniqueInput
    create: XOR<MemberPrivateFinancialCreateWithoutPlansInput, MemberPrivateFinancialUncheckedCreateWithoutPlansInput>
  }

  export type InstallmentCreateWithoutPlanInput = {
    id?: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bank?: BankCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateWithoutPlanInput = {
    id?: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    bankId?: string | null
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentCreateOrConnectWithoutPlanInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput>
  }

  export type InstallmentCreateManyPlanInputEnvelope = {
    data: InstallmentCreateManyPlanInput | InstallmentCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type MemberPrivateFinancialUpsertWithoutPlansInput = {
    update: XOR<MemberPrivateFinancialUpdateWithoutPlansInput, MemberPrivateFinancialUncheckedUpdateWithoutPlansInput>
    create: XOR<MemberPrivateFinancialCreateWithoutPlansInput, MemberPrivateFinancialUncheckedCreateWithoutPlansInput>
    where?: MemberPrivateFinancialWhereInput
  }

  export type MemberPrivateFinancialUpdateToOneWithWhereWithoutPlansInput = {
    where?: MemberPrivateFinancialWhereInput
    data: XOR<MemberPrivateFinancialUpdateWithoutPlansInput, MemberPrivateFinancialUncheckedUpdateWithoutPlansInput>
  }

  export type MemberPrivateFinancialUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutPrivateFinancialNestedInput
  }

  export type MemberPrivateFinancialUncheckedUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    plotSize?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    downPayment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentUpsertWithWhereUniqueWithoutPlanInput = {
    where: InstallmentWhereUniqueInput
    update: XOR<InstallmentUpdateWithoutPlanInput, InstallmentUncheckedUpdateWithoutPlanInput>
    create: XOR<InstallmentCreateWithoutPlanInput, InstallmentUncheckedCreateWithoutPlanInput>
  }

  export type InstallmentUpdateWithWhereUniqueWithoutPlanInput = {
    where: InstallmentWhereUniqueInput
    data: XOR<InstallmentUpdateWithoutPlanInput, InstallmentUncheckedUpdateWithoutPlanInput>
  }

  export type InstallmentUpdateManyWithWhereWithoutPlanInput = {
    where: InstallmentScalarWhereInput
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyWithoutPlanInput>
  }

  export type InstallmentScalarWhereInput = {
    AND?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    OR?: InstallmentScalarWhereInput[]
    NOT?: InstallmentScalarWhereInput | InstallmentScalarWhereInput[]
    id?: StringFilter<"Installment"> | string
    planId?: StringFilter<"Installment"> | string
    installmentNumber?: IntFilter<"Installment"> | number
    amount?: DecimalFilter<"Installment"> | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFilter<"Installment"> | Date | string
    status?: EnumPaymentStatusFilter<"Installment"> | $Enums.PaymentStatus
    bankId?: StringNullableFilter<"Installment"> | string | null
    paymentDate?: DateTimeNullableFilter<"Installment"> | Date | string | null
    receiptNumber?: StringNullableFilter<"Installment"> | string | null
    notes?: StringNullableFilter<"Installment"> | string | null
    createdAt?: DateTimeFilter<"Installment"> | Date | string
    updatedAt?: DateTimeFilter<"Installment"> | Date | string
  }

  export type InstallmentPlanCreateWithoutInstallmentsInput = {
    id?: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial: MemberPrivateFinancialCreateNestedOneWithoutPlansInput
  }

  export type InstallmentPlanUncheckedCreateWithoutInstallmentsInput = {
    id?: string
    privateFinancialId: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentPlanCreateOrConnectWithoutInstallmentsInput = {
    where: InstallmentPlanWhereUniqueInput
    create: XOR<InstallmentPlanCreateWithoutInstallmentsInput, InstallmentPlanUncheckedCreateWithoutInstallmentsInput>
  }

  export type BankCreateWithoutInstallmentsInput = {
    id?: string
    name: string
    code: string
    logoAsset?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankUncheckedCreateWithoutInstallmentsInput = {
    id?: string
    name: string
    code: string
    logoAsset?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankCreateOrConnectWithoutInstallmentsInput = {
    where: BankWhereUniqueInput
    create: XOR<BankCreateWithoutInstallmentsInput, BankUncheckedCreateWithoutInstallmentsInput>
  }

  export type InstallmentPlanUpsertWithoutInstallmentsInput = {
    update: XOR<InstallmentPlanUpdateWithoutInstallmentsInput, InstallmentPlanUncheckedUpdateWithoutInstallmentsInput>
    create: XOR<InstallmentPlanCreateWithoutInstallmentsInput, InstallmentPlanUncheckedCreateWithoutInstallmentsInput>
    where?: InstallmentPlanWhereInput
  }

  export type InstallmentPlanUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: InstallmentPlanWhereInput
    data: XOR<InstallmentPlanUpdateWithoutInstallmentsInput, InstallmentPlanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type InstallmentPlanUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUpdateOneRequiredWithoutPlansNestedInput
  }

  export type InstallmentPlanUncheckedUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    privateFinancialId?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankUpsertWithoutInstallmentsInput = {
    update: XOR<BankUpdateWithoutInstallmentsInput, BankUncheckedUpdateWithoutInstallmentsInput>
    create: XOR<BankCreateWithoutInstallmentsInput, BankUncheckedCreateWithoutInstallmentsInput>
    where?: BankWhereInput
  }

  export type BankUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: BankWhereInput
    data: XOR<BankUpdateWithoutInstallmentsInput, BankUncheckedUpdateWithoutInstallmentsInput>
  }

  export type BankUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankUncheckedUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    logoAsset?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateWithoutBankInput = {
    id?: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: InstallmentPlanCreateNestedOneWithoutInstallmentsInput
  }

  export type InstallmentUncheckedCreateWithoutBankInput = {
    id?: string
    planId: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentCreateOrConnectWithoutBankInput = {
    where: InstallmentWhereUniqueInput
    create: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput>
  }

  export type InstallmentCreateManyBankInputEnvelope = {
    data: InstallmentCreateManyBankInput | InstallmentCreateManyBankInput[]
    skipDuplicates?: boolean
  }

  export type InstallmentUpsertWithWhereUniqueWithoutBankInput = {
    where: InstallmentWhereUniqueInput
    update: XOR<InstallmentUpdateWithoutBankInput, InstallmentUncheckedUpdateWithoutBankInput>
    create: XOR<InstallmentCreateWithoutBankInput, InstallmentUncheckedCreateWithoutBankInput>
  }

  export type InstallmentUpdateWithWhereUniqueWithoutBankInput = {
    where: InstallmentWhereUniqueInput
    data: XOR<InstallmentUpdateWithoutBankInput, InstallmentUncheckedUpdateWithoutBankInput>
  }

  export type InstallmentUpdateManyWithWhereWithoutBankInput = {
    where: InstallmentScalarWhereInput
    data: XOR<InstallmentUpdateManyMutationInput, InstallmentUncheckedUpdateManyWithoutBankInput>
  }

  export type MemberCreateWithoutAuditLogsInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial?: MemberPrivateFinancialCreateNestedOneWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    sequenceNumber: number
    memberNumber?: string | null
    fullName: string
    phone: string
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    privateFinancial?: MemberPrivateFinancialUncheckedCreateNestedOneWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutAuditLogsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutAuditLogsInput, MemberUncheckedCreateWithoutAuditLogsInput>
  }

  export type MemberUpsertWithoutAuditLogsInput = {
    update: XOR<MemberUpdateWithoutAuditLogsInput, MemberUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<MemberCreateWithoutAuditLogsInput, MemberUncheckedCreateWithoutAuditLogsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutAuditLogsInput, MemberUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MemberUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUpdateOneWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    memberNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    privateFinancial?: MemberPrivateFinancialUncheckedUpdateOneWithoutMemberNestedInput
  }

  export type AuditLogCreateManyMemberInput = {
    id?: string
    eventType: string
    actorType: string
    actorId?: string | null
    metadata?: string | null
    previousHash: string
    currentHash: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: StringFieldUpdateOperationsInput | string
    currentHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentPlanCreateManyPrivateFinancialInput = {
    id?: string
    status?: $Enums.PlanStatus
    totalInstallments: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentPlanUpdateWithoutPrivateFinancialInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUpdateManyWithoutPlanNestedInput
  }

  export type InstallmentPlanUncheckedUpdateWithoutPrivateFinancialInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: InstallmentUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type InstallmentPlanUncheckedUpdateManyWithoutPrivateFinancialInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    totalInstallments?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateManyPlanInput = {
    id?: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    bankId?: string | null
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentCreateManyBankInput = {
    id?: string
    planId: string
    installmentNumber: number
    amount: Decimal | DecimalJsLike | number | string
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    receiptNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstallmentUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: InstallmentPlanUpdateOneRequiredWithoutInstallmentsNestedInput
  }

  export type InstallmentUncheckedUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallmentUncheckedUpdateManyWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MemberCountOutputTypeDefaultArgs instead
     */
    export type MemberCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberPrivateFinancialCountOutputTypeDefaultArgs instead
     */
    export type MemberPrivateFinancialCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberPrivateFinancialCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallmentPlanCountOutputTypeDefaultArgs instead
     */
    export type InstallmentPlanCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallmentPlanCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankCountOutputTypeDefaultArgs instead
     */
    export type BankCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminUserDefaultArgs instead
     */
    export type AdminUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrivateCredentialDefaultArgs instead
     */
    export type PrivateCredentialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrivateCredentialDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberDefaultArgs instead
     */
    export type MemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberPrivateFinancialDefaultArgs instead
     */
    export type MemberPrivateFinancialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberPrivateFinancialDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallmentPlanDefaultArgs instead
     */
    export type InstallmentPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallmentPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallmentDefaultArgs instead
     */
    export type InstallmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankDefaultArgs instead
     */
    export type BankArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SecurityEventDefaultArgs instead
     */
    export type SecurityEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SecurityEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppSettingsDefaultArgs instead
     */
    export type AppSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppSettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BannedIpDefaultArgs instead
     */
    export type BannedIpArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BannedIpDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}