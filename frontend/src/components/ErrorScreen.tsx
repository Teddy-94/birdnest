interface Props {
    message: string;
}

const ErrorScreen: React.FC<Props> = ({ message }) => {
    return (
        <div className="error-container">
            <p>An error occurred: {message}</p>
        </div>
    );
}

export default ErrorScreen;