import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useResendVerificationEmail } from '@/hooks/auth'

export function ResendEmail({ email }: { email: string }) {
  const { onResendEmail, isPending, coolDown, isCanResend } =
    useResendVerificationEmail()

  return (
    <div className="flex">
      <Button
        variant="link"
        type="button"
        size="none"
        className="text-orange-400"
        onClick={() => onResendEmail({ email })}
        disabled={!isCanResend || isPending}
      >
        {isPending && <Spinner className="mr-2" />}
        <span>Resend Email</span>
      </Button>
      {coolDown ? (
        <span className="text-muted-foreground ml-2 text-sm">
          {coolDown} seconds
        </span>
      ) : null}
    </div>
  )
}
