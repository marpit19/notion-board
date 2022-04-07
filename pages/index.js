import reducer, { initialState } from "../context/reducer";
import { StateProvider } from "../context/StateProvider";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<div className={styles.container}>
				<main className={styles.main}>
					<Board />
				</main>
			</div>
		</StateProvider>
	);
}
