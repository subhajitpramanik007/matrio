export enum EGameNamespace {
    TIC_TAC_TOE = 'tic_tac_toe',
    CHECKERS = 'checkers',
}

export type GameNamespace = EGameNamespace

export type User = {
    id: string
    username: string
    avatar?: string
}

declare const __brand: unique symbol
export type Brand<T, B extends string> = T & { [__brand]: B }
