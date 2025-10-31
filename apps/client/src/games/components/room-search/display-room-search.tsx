import { Container } from '@/components/common/container'

type DisplayRoomSearchProps = {
  isLoading: boolean
  isSuccess: boolean
  successText: string
  loadingText: string
  isError: boolean
  error: string | null
  children?: React.ReactNode
}

export function DisplayRoomSearch({
  isLoading,
  loadingText,
  isSuccess,
  successText = 'Waiting for opponent...',
  isError,
  error = 'Something went wrong',
  children,
}: DisplayRoomSearchProps) {
  if (isLoading) {
    return (
      <Container className="mx-auto w-full max-w-3xs">
        <div>{loadingText}</div>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="mx-auto w-full max-w-3xs">
        <div>{error}</div>
      </Container>
    )
  }

  if (isSuccess) {
    const display = children || <div>{successText}</div>

    return <Container className="mx-auto w-full max-w-3xs">{display}</Container>
  }

  return (
    <Container className="mx-auto w-full max-w-3xs">
      <div>Something went wrong</div>
    </Container>
  )
}
