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
            const errorMsg = `GameServiceRegistry already registered for ${nameSpace}`
            this.logger.error(errorMsg)
            throw new Error(errorMsg)
        }
        this.map[nameSpace] = service
    }

    get<T extends GameNamespace>(nameSpace: T): GameService<T> {
        const service = this.map[nameSpace]
        if (!service) {
            const errorMsg = `No service registered for namespace: ${nameSpace}`
            this.logger.error(errorMsg)
            throw new Error(errorMsg)
        }
        return service as GameService<T>
    }
}
