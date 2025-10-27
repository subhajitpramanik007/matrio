import { cn } from '@/lib/utils'

import {
  CheckersPreviewCardData,
  GamePreviewCard,
  GamePreviewCardContent,
  GamePreviewCardHeader,
  GamePreviewProvider,
  useGamePreview,
} from '@/components/game-preview'

const CheckersArray = Array.from({ length: 16 })

function CheckersPreview() {
  const data = useGamePreview()

  return (
    <GamePreviewCard>
      <GamePreviewCardHeader {...data} />
      <GamePreviewCardContent
        {...data}
        className="mx-auto mb-6 grid max-w-48 grid-cols-4 gap-1"
      >
        {CheckersArray.map((_, i) => (
          <CheckersPreviewCell key={i} idx={i} />
        ))}
      </GamePreviewCardContent>
    </GamePreviewCard>
  )
}

function CheckersPreviewCell({
  idx,
}: React.ComponentProps<'div'> & { idx: number }) {
  const isEven = Math.floor(idx / 4) % 2 === 0
  const isDark = isEven ? idx % 2 === 1 : idx % 2 === 0
  const hasPiece = idx < 6 || idx > 9
  const pieceColor = idx < 6 ? 'bg-red-500' : 'bg-gray-800'
  const isShow = hasPiece && isDark

  return (
    <div
      className={cn(
        'flex aspect-square items-center justify-center',
        isDark ? 'bg-gray-700' : 'bg-gray-200',
      )}
    >
      {isShow && (
        <div
          className={cn(
            'm-1 flex aspect-square w-full items-center justify-center rounded-full',
            pieceColor,
          )}
        />
      )}
    </div>
  )
}

export const CheckersPreviewCard = () => {
  return (
    <GamePreviewProvider defaultValue={CheckersPreviewCardData}>
      <CheckersPreview />
    </GamePreviewProvider>
  )
}
