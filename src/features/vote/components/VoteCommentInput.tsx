import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

export function VoteCommentInput() {
    const [commentText, setCommentText] = useState("");

    return (
        <div className="p-3 border-t bg-background/95 backdrop-blur-sm h-[70px] flex items-center gap-3">
            <Avatar className="w-8 h-8">
                <AvatarFallback>Me</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="댓글을 남겨보세요..."
                    className="w-full bg-muted/50 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                    size="icon"
                    className={cn(
                        "absolute right-1 top-1 h-7 w-7 rounded-full shadow-none transition-all",
                        commentText ? "bg-primary text-white" : "bg-transparent text-muted-foreground hover:bg-muted"
                    )}
                    disabled={!commentText.trim()}
                >
                    <Send className="w-3.5 h-3.5 ml-0.5" />
                </Button>
            </div>
        </div>
    );
}
