import {
  DummyValuesOfTicTacToe,
  GamePreviewCard,
  GamePreviewCardContent,
  GamePreviewCardHeader,
  GamePreviewProvider,
  TicTacToePreviewCardData,
  useGamePreview,
} from '@/components/game-preview'

const TicTacToeArray = Array.from({ length: 9 })

function TicTacToePreview() {
  const data = useGamePreview()

  return (
    <GamePreviewCard>
      <GamePreviewCardHeader {...data} />
      <GamePreviewCardContent {...data}>
        {TicTacToeArray.map((_, i) => (
          <div
            key={i}
            className="border-border bg-card hover:bg-accent/10 flex aspect-square items-center justify-center rounded-lg border-2 text-2xl font-bold transition-colors"
          >
            {DummyValuesOfTicTacToe[i]}
          </div>
        ))}
      </GamePreviewCardContent>
    </GamePreviewCard>
  )
}

export const TicTacToePreviewCard = () => {
  return (
    <GamePreviewProvider defaultValue={TicTacToePreviewCardData}>
      <TicTacToePreview />
    </GamePreviewProvider>
  )
}
