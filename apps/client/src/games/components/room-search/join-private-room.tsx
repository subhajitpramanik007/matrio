import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { TJoinRoomSchema } from '@/games/game.schema'
import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { joinRoomSchema } from '@/games/game.schema'
import { useJoinPrivateRoom } from '@/games/hooks/room-search'

import { Form } from '@/components/ui/form'
import { FieldGroup } from '@/components/ui/field'
import { FormInput, SubmitButton } from '@/components/form'
import { DisplayRoomSearch } from '@/games/components/room-search/display-room-search'

export const JoinPrivateRoom: React.FC<
  RoomSearchProps<TGameNameSpaceToSocket>
> = (props) => {
  const { onJoinRoom, data: _, ...rest } = useJoinPrivateRoom(props)

  return (
    <DisplayRoomSearch
      key="join-private-room"
      loadingText="Joining Tic Tac Toe room..."
      successText="Room joined successfully. Please wait for the opponent to join..."
      {...rest}
    >
      <div className="flex w-full gap-3">
        <JoinRoomForm onSubmit={onJoinRoom} />
      </div>
    </DisplayRoomSearch>
  )
}

function JoinRoomForm({
  onSubmit,
}: {
  onSubmit: (data: TJoinRoomSchema) => void
}) {
  const form = useForm<TJoinRoomSchema>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: { roomCode: '' },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full space-x-4"
      >
        <FieldGroup>
          <FormInput
            control={form.control}
            name="roomCode"
            label="Room Code"
            placeholder="Enter room code"
          />
        </FieldGroup>

        <SubmitButton color="orange" className="mt-auto w-auto">
          Join Room
        </SubmitButton>
      </form>
    </Form>
  )
}
