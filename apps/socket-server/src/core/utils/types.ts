import { Brand } from '@matrio/shared/types/brand.type'

export enum EGameNamespace {
    TIC_TAC_TOE = 'tic_tac_toe',
    CHECKERS = 'checkers',
}

export type GameNamespace = EGameNamespace

export type User = {
    id: Brand<string, 'UserId'>
    username: string
    avatar?: string
}

export type ToPascalCase<
    T extends string,
    Separator extends string = '_',
> = T extends `${infer Left}${Separator}${infer Right}`
    ? `${Capitalize<Left>}${ToPascalCase<Right, Separator>}`
    : Capitalize<T>
