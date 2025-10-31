import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { DisplayRoomSearch } from '@/games/components/room-search/display-room-search'

import { useCreatePrivateRoom } from '@/games/hooks/room-search'

export const CreatePrivateRoom: React.FC<
  RoomSearchProps<TGameNameSpaceToSocket>
> = (props) => {
  const { roomCode, data: _, ...rest } = useCreatePrivateRoom(props)

  return (
    <DisplayRoomSearch
      key="create-private-room"
      loadingText="Creating Tic Tac Toe room..."
      successText="Room created successfully. Share the room code with your friends."
      {...rest}
    >
      <DisplayCreateRoom roomCode={roomCode} />
    </DisplayRoomSearch>
  )
}

function DisplayCreateRoom({ roomCode }: { roomCode: string }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Field>
        <FieldLabel htmlFor="created-room-code">Your room code</FieldLabel>
        <FieldDescription>
          Share this room code with your friends
        </FieldDescription>
        <Input
          id="created-room-code"
          readOnly
          className="text-muted-foreground text-sm"
          value={roomCode}
        />
      </Field>
      <div className="flex justify-between gap-3">
        <Button className="basis-1/2">Copy as Room Code</Button>
        <Button className="basis-1/2">Copy as Link</Button>
      </div>
    </div>
  )
}
