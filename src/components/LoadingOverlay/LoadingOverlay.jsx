import Spinner from "../Spinner/Spinner";
import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
    return (
        <div className={styles.loadingContainer}>
            <Spinner />
        </div>
    );
}