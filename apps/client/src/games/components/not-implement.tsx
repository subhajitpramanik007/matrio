export function GameNotImplement({
  gameSlug,
  mode,
}: {
  gameSlug: string
  mode: string
}) {
  return (
    <div className="flex justify-center pt-8">
      <h1 className="text-2xl">
        Game <span className="font-bold text-orange-500">{gameSlug}</span> mode{' '}
        <span className="font-bold text-orange-500">{mode}</span> is not
        implemented
      </h1>
    </div>
  )
}
