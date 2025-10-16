import {
    SpinnerContainer,
    SpinnerElement,
    LoadingText
} from "./styles";

const LoadingSpinner = ({ text = "Loading..." }) => (
    <SpinnerContainer>
        <SpinnerElement />
        <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
);

export default LoadingSpinner;