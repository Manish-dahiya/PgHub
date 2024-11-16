import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
    return (
        <div className="skeleton-card">
            <Skeleton height={200} />
            <div className="mt-4">
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} width="60%" />
            </div>
        </div>
    );
};
export default SkeletonLoader;