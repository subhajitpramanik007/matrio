import { Container } from '@/components/common/container'

type DisplayRoomSearchProps = {
  isLoading: boolean
  isSuccess: boolean
  successText: React.ReactNode
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
      <Container className="mx-auto w-full">
        <div>{error}</div>
      </Container>
    )
  }

  if (isSuccess) {
    return (
      <Container className="mx-auto w-full max-w-md">{successText}</Container>
    )
  }

  if (children) {
    return <Container className="mx-auto w-full">{children}</Container>
  }

  return (
    <Container className="mx-auto w-full max-w-3xs">
      <div>Something went wrong</div>
    </Container>
  )
}
