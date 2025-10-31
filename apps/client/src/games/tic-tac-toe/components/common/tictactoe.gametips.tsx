import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TTTGameTipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tips</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-2 text-sm">
        <ul>
          <li>• Control the center square for better positioning</li>
          <li>• Watch for two-in-a-row opportunities</li>
          <li>• Block your opponents winning moves</li>
          <li>• Corners are stronger than edges</li>
        </ul>
      </CardContent>
    </Card>
  )
}
