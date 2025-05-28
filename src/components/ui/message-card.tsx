import { FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MessageCardProps {
  content: string;
  timestamp: string;
  isIncoming: boolean;
  senderImgUrl?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
}

export function MessageCard({ 
  content, 
  timestamp, 
  isIncoming,
  senderImgUrl,
  hasAttachment,
  attachmentName
}: MessageCardProps) {
  return (
    <div className={cn(
      "flex",
      isIncoming ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex max-w-[80%]",
        isIncoming ? "flex-row" : "flex-row-reverse"
      )}>
        {isIncoming && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={senderImgUrl} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <div className={cn(
            "rounded-lg px-4 py-2 text-sm",
            isIncoming 
              ? "bg-muted text-muted-foreground rounded-tl-none" 
              : "bg-primary text-primary-foreground rounded-tr-none"
          )}>
            <p>{content}</p>
            
            {hasAttachment && (
              <div className="mt-2 p-2 bg-background/20 rounded flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs flex-1 truncate">{attachmentName}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  Play
                </Button>
              </div>
            )}
          </div>
          
          <p className={cn(
            "text-xs text-muted-foreground mt-1",
            isIncoming ? "text-left" : "text-right"
          )}>
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}