import {
    ProgressContainer,
    ProgressBar,
    ProgressText
} from './styles';

const GlobalProgressBar = ({
    progress,
    totalFiles,
    completedFiles,
    text
}) => {
    if (progress === 0 || progress === 100) return null;

    return (
        <>
            <ProgressContainer
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <ProgressBar $progress={progress} />
            </ProgressContainer>
            <ProgressText>
                {text} {Math.round(progress)}% ({completedFiles}/{totalFiles})
            </ProgressText>
        </>
    );
};

export default GlobalProgressBar;