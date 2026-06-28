import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

/* Reads the unified FeedItem hub (populated server-side by syncFeed).
   Public read; ordered by createdAt desc. */
async function fetchFeed(limit = 100) {
  return base44.entities.FeedItem.list('-createdAt', limit);
}

export function useFeed(limit = 100) {
  return useQuery({
    queryKey: ['feed-items', limit],
    queryFn: () => fetchFeed(limit),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}