import { useState } from 'react'
import { CopyIcon, Share2Icon } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'
import type { RoomSearchProps, TGameNameSpaceToSocket } from '@/games/types'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { DisplayRoomSearch } from '@/games/components/room-search/display-room-search'

import { useCreatePrivateRoom } from '@/games/hooks/room-search'
import { showGameNotification } from '@/games/components/show-game-notification'

export const CreatePrivateRoom = <T extends TGameNameSpaceToSocket>(
  props: RoomSearchProps<T>,
) => {
  const { roomCode, data: _, ...rest } = useCreatePrivateRoom<T>(props)

  return (
    <DisplayRoomSearch
      key="create-private-room"
      loadingText="Creating Tic Tac Toe room..."
      successText={<DisplayCreateRoom roomCode={roomCode} />}
      {...rest}
    />
  )
}

function DisplayCreateRoom({ roomCode }: { roomCode: string }) {
  const router = useRouter()
  const { game } = useParams({ from: '/games/$game/$mode' })

  const [isRoomCodeCopied, setIsRoomCodeCopied] = useState(false)
  const [isRoomLinkCopied, setIsRoomLinkCopied] = useState(false)

  async function handleCopyRoomCode() {
    await navigator.clipboard.writeText(roomCode)
    const inputElement = document.getElementById(
      'created-room-code',
    ) as HTMLInputElement
    inputElement.select()

    setIsRoomCodeCopied(true)
    showGameNotification(
      'Room code copied',
      'You can share this code with your friends',
      5000,
    )
    setTimeout(() => {
      setIsRoomCodeCopied(false)
      inputElement.blur()
    }, 3000)
  }

  function handleCopyRoomLink() {
    const baseUrl = router.origin
    const joinLink = `${baseUrl}?game=${game}&roomCode=${roomCode}`

    navigator.clipboard.writeText(joinLink)

    setIsRoomLinkCopied(true)
    showGameNotification(
      'Room link copied',
      'You can share this link with your friends',
      5000,
    )

    setTimeout(() => setIsRoomLinkCopied(false), 3000)
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-3 px-8 sm:w-md">
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
      <div className="flex flex-col justify-between gap-3">
        <Button
          className="basis-1/2"
          color="orange"
          onClick={handleCopyRoomCode}
          disabled={isRoomCodeCopied}
        >
          <CopyIcon />
          Copy as Room Code
        </Button>
        <Button
          className="basis-1/2"
          onClick={handleCopyRoomLink}
          disabled={isRoomLinkCopied}
        >
          <Share2Icon />
          Copy as Link
        </Button>
      </div>
    </div>
  )
}
