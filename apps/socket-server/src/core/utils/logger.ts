import chalk from 'chalk'

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose'

export class Logger {
    constructor(private readonly context: string = 'Logger') {}

    emptyLine() {
        console.log()
    }

    log(message?: any, ...optionalParams: any[]) {
        this.print('log', message, ...optionalParams)
    }

    error(error?: any, ...optionalParams: any[]) {
        this.print('error', chalk.red(typeof error === 'string' ? error : (error?.message ?? error)))
    }

    warn(message?: any, ...optionalParams: any[]) {
        this.print('warn', message, ...optionalParams)
    }

    debug(message?: any, ...optionalParams: any[]) {
        this.print('debug', message, ...optionalParams)
    }

    verbose(message?: any, ...optionalParams: any[]) {
        this.print('verbose', message, ...optionalParams)
    }

    private print(level: LogLevel, message?: any, ...optionalParams: any[]) {
        const formatted = this.formatMessage(level)
        const writer = this.getConsoleMethod(level)

        if (typeof message === 'undefined' && optionalParams.length === 0) {
            writer(formatted)
            return
        }

        writer(formatted, message, ...optionalParams)
    }

    private getConsoleMethod(level: LogLevel) {
        switch (level) {
            case 'error':
                return console.error.bind(console)
            case 'warn':
                return console.warn.bind(console)
            case 'debug':
                return (console.debug ?? console.log).bind(console)
            case 'verbose':
                return console.log.bind(console)
            default:
                return console.log.bind(console)
        }
    }

    private formatMessage(level: LogLevel) {
        const timestamp = chalk.gray(
            `${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: 'numeric' })}`,
        )
        const context = this.colorizeLevel(level)(`[${this.context}]`)
        const currentLabelTag = levelTags[level] ?? levelTags['default']

        const levelTag = this.colorizeLevel(level)(`[${currentLabelTag}]`)

        return `${levelTag} ${timestamp} : ${context}`
    }

    private colorizeLevel(level: LogLevel) {
        switch (level) {
            case 'error':
                return chalk.red.bold
            case 'warn':
                return chalk.yellow.bold
            case 'debug':
                return chalk.magenta.bold
            case 'verbose':
                return chalk.cyan.bold
            default:
                return chalk.green.bold
        }
    }
}

const levelTags: Record<LogLevel | 'default', string> = {
    error: 'ERROR',
    warn: 'WARN ',
    debug: 'DEBUG',
    verbose: 'VERBO',
    log: 'INFO ',
    default: 'INFO ',
}

export const logger = new Logger('Matrio')
