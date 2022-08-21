import { useRouter } from 'next/router';

export default function useQuery() {
    const router = useRouter();
    const ready = router.asPath !== router.route;
    if (!ready) return null;
    return router.query;
}
