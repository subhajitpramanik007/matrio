import * as React from 'react'
import { useJoinPrivateRoomSearch } from '../../hooks/useRoomSearch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const JoinPrivateRoomSearch: React.FC<{}> = () => {
  const { roomCode, setRoomCode, handleSubmit, isLoading, error, isError } =
    useJoinPrivateRoomSearch()

  if (isError) {
    return <p>{error ?? 'Failed to join room '}</p>
  }

  if (isLoading) {
    return <div>Joining room...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-2 pt-8">
      <Label htmlFor="roomCode">Room Code</Label>
      <Input
        id="roomCode"
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <Button type="submit" className="mt-4 w-full">
        Join Room
      </Button>
    </form>
  )
}
