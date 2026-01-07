import { ENV } from '@/config/env'
import jwt from 'jsonwebtoken'
import { User } from '../utils'
import { Socket } from 'socket.io'

export class UserAuthHandler {
    static verifyToken(token: string, jwtSecret: string = ENV.JWT_SECRET): User | null {
        try {
            const decoded = jwt.verify(token, jwtSecret)
            return decoded as User
        } catch (error) {
            return null
        }
    }

    static extractTokenFromRequest(client: Socket): string | null {
        return (
            UserAuthHandler.extractUserFromHandshake(client.handshake) ||
            UserAuthHandler.ExtractTokenFromHeaders(client.request.headers) ||
            UserAuthHandler.ExtractTokenFromCookie(client.request.headers)
        )
    }

    static extractUserFromHandshake(handshake: any): string | null {
        return handshake.auth.token ?? null
    }

    static ExtractTokenFromHeaders(headers: any): string | null {
        const token = headers.authorization?.split(' ')[1]
        return token ?? null
    }

    static ExtractTokenFromCookie(headers: any): string | null {
        const cookie = headers.cookie
        if (!cookie) return null
        const token = cookie
            .split(';')
            .find((cookie: any) => cookie.startsWith('__matrio.atk='))
            ?.split('=')[1]
        return token ?? null
    }
}
