import { BaseClass } from '../lifecycle/BaseClass'
import { GameNamespace, Logger } from '../utils'
import { GameBaseService } from './GameBaseService'

type GameService<T extends GameNamespace> = GameBaseService<T>

export class GameServiceRegistry extends BaseClass {
    private logger = new Logger('GameServiceRegistry')
    private map: Record<GameNamespace, GameService<GameNamespace>> = {} as any

    register<T extends GameNamespace>(nameSpace: T, service: GameService<T>) {
        this.logger.verbose(`Registering service for namespace: ${nameSpace}`)
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
