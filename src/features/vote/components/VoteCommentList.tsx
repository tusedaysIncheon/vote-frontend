import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart } from "lucide-react";
import type { Comment } from "@/types/vote";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

// 🟢 MOCK DATA GENERATORS (Moved from Modal)
const generateMockComments = (count: number): Comment[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        writer: {
            id: 100 + i,
            nickname: `User${i + 1}`,
            handle: `@user${i + 1}`,
            avatarUrl: `https://i.pravatar.cc/150?u=${100 + i}`,
            isFollowing: false,
        },
        content: i % 2 === 0
            ? "정말 좋은 의견이네요! 저도 동의합니다. 😄"
            : "저는 조금 다르게 생각해요. 이런 점도 고려해야 하지 않을까요? 🤔",
        createdAt: new Date(Date.now() - 1000 * 60 * (i + 1) * 10).toISOString(),
        likeCount: Math.floor(Math.random() * 50),
        isLiked: false,
        replyCount: Math.floor(Math.random() * 5),
    }));
};

interface VoteCommentListProps {
    commentCount: number;
}

export function VoteCommentList({ commentCount }: VoteCommentListProps) {
    const comments = useMemo(() => generateMockComments(commentCount || 5), [commentCount]);

    return (
        <div>
            {/* Comments Header */}
            <div className="px-5 py-4 flex items-center justify-between">
                <h3 className="font-bold text-base">댓글 {commentCount}</h3>
                <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0 hover:bg-transparent">
                    전체보기
                </Button>
            </div>

            {/* Comments List */}
            <div className="px-5 space-y-5 pb-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <Avatar className="w-8 h-8 mt-1 border">
                            <AvatarImage src={comment.writer.avatarUrl || undefined} />
                            <AvatarFallback>{comment.writer.nickname[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">{comment.writer.nickname}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })}
                                </span>
                            </div>
                            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                {comment.content}
                            </p>
                            <div className="flex items-center gap-4 pt-1">
                                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                                    <Heart className="w-3.5 h-3.5" />
                                    {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
                                </button>
                                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    답글달기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
