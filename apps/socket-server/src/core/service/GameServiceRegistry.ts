import { CheckersService } from '../../games/checkers/CheckersService'
import { TicTacToeService } from '../../games/tic_tac_toe/TicTacToeService'
import { BaseClass } from '../lifecycle/BaseClass'
import { GameNamespace, Logger } from '../utils'

type GameService<T extends GameNamespace> = T extends 'tic_tac_toe'
    ? TicTacToeService
    : T extends 'checkers'
      ? CheckersService
      : never

export class GameServiceRegistry extends BaseClass {
    private logger = new Logger('GameServiceRegistry')
    private map: Record<string, GameService<GameNamespace>> = {}

    register<T extends GameNamespace>(nameSpace: T, service: GameService<T>) {
        if (this.map[nameSpace]) {
            this.logger.error(`GameServiceRegistry already register for ${nameSpace}`)
            return
        }
        this.logger.log(`GameServiceRegistry register for ${service.constructor.name}`)
        this.map[nameSpace] = service
    }

    get<T extends GameNamespace>(nameSpace: T): GameService<T> {
        return this.map[nameSpace] as GameService<T>
    }
}
