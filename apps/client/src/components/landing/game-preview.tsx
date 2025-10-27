import * as React from 'react'

import {
  CheckersPreviewCard,
  TicTacToePreviewCard,
} from '@/components/game-preview'

export const GamePreview: React.FC = () => {
  return (
    <section className="from-primary/10 to-primary/5 container flex min-h-screen flex-col items-center bg-gradient-to-tl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Choose Your Game
        </h2>
        <p className="text-muted-foreground text-lg">
          Pick from our collection of beloved classic games
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-8 md:flex-row">
        <TicTacToePreviewCard />
        <CheckersPreviewCard />
      </div>
    </section>
  )
}
