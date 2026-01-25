import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castVoteApi } from "../api/vote.api";
import type { VoteData } from "@/types/vote";

export function useVoteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ voteId, optionId }: { voteId: number; optionId: number }) =>
            castVoteApi(voteId, optionId),

        onMutate: async ({ voteId, optionId }) => {
            // 1. Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["votes"] });

            // 2. Snapshot previous values
            // We need to snapshot ALL queries starting with "votes"
            const previousVotes = queryClient.getQueriesData<VoteData[]>({ queryKey: ["votes"] });

            // 3. Optimistically update users' caches
            queryClient.setQueriesData<VoteData[]>({ queryKey: ["votes"] }, (old) => {
                if (!old) return [];

                return old.map((vote) => {
                    if (vote.id !== voteId) return vote;

                    // Calculate new counts
                    const oldVotedOptionId = vote.votedOptionId;
                    const isReVote = oldVotedOptionId !== null;
                    const isSameOption = oldVotedOptionId === optionId;

                    if (isSameOption) return vote;

                    const newOptions = vote.options.map((opt) => {
                        if (opt.id === optionId) {
                            return { ...opt, count: opt.count + 1 };
                        }
                        if (opt.id === oldVotedOptionId) {
                            return { ...opt, count: Math.max(0, opt.count - 1) };
                        }
                        return opt;
                    });

                    return {
                        ...vote,
                        votedOptionId: optionId,
                        options: newOptions,
                        totalVotes: isReVote ? vote.totalVotes : vote.totalVotes + 1,
                    };
                });
            });

            // Return context with the snapped value
            return { previousVotes };
        },

        onError: (err, newVote, context) => {
            // Rollback all queries
            if (context?.previousVotes) {
                context.previousVotes.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },

        onSettled: () => {
            // ⚠️ MOCK MODE: 실제 서버가 없어서 refetch하면 초기값으로 돌아가버립니다.
            // 그래서 Mock 모드일 때는 invalidateQueries를 막아둬야 낙관적 업데이트가 유지됩니다.
            // TODO: 백엔드 연결 후 주석 해제하세요 (필수)
            // queryClient.invalidateQueries({ queryKey: ["votes"] });
        },
    });
}
