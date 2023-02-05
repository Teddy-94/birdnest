export interface LoadingStatusProps {
    loading: boolean;
}

export const LoadingStatus = ({ loading }: LoadingStatusProps) => {
    if (loading) {
        return (
            <>
                <div className='loading-spinner'></div>
                <p>Loading...</p>
            </>
        );
    } else return <></>;
};
