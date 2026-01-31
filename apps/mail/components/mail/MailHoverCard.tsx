import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { format } from 'date-fns'
import type { ParsedMessage } from '@/types'
import { cleanHtml } from '@/lib/email-utils'

interface MailHoverCardProps {
  children: React.ReactNode
  message: ParsedMessage
}

export function MailHoverCard({ children, message }: MailHoverCardProps) {
  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        className="w-[420px] max-h-[320px] overflow-hidden p-4"
      >
        <div className="space-y-2">
          <div className="text-sm font-semibold truncate">
            {message.subject || 'No subject'}
          </div>

          <div className="text-xs text-muted-foreground">
            From: {message.sender?.name} &lt;{message.sender?.email}&gt;
          </div>

          <div className="text-xs text-muted-foreground">
            {format(new Date(message.receivedOn), 'PPpp')}
          </div>

          <div className="border-t pt-2 text-sm line-clamp-5">
            <div
              dangerouslySetInnerHTML={{
                __html: cleanHtml(message.decodedBody ?? ''),
              }}
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
