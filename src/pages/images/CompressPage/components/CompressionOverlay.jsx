import { ProcessingOverlay, ProgressBar, ProgressText } from "../../../progressBar";

export default function CompressionOverlay({ progress, completed, total, text }) {
    return (
        <ProcessingOverlay>
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3>{text}</h3>
                <ProgressBar>
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #007bff, #0056b3)',
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                        }}
                    />
                </ProgressBar>
                <ProgressText>
                    {Math.round(progress)}% ({completed}/{total})
                </ProgressText>
            </div>
        </ProcessingOverlay>
    );
}