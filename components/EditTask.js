import React, { useEffect, useState } from "react";
import styles from "../styles/Components.module.css";
import { useStateValue } from "../context/StateProvider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";

export default function EditTask({ tasks1, task, onClose, onDelete }) {
	const [{ tasks }, dispatch] = useStateValue();
	const [activeEditable, setActiveEditable] = useState("");
	const [editedTask, setEditedTask] = useState({
		taskName: task.taskName,
		taskId: task.taskId,
		taskType: task.taskType,
		taskDescription: task.taskDescription,
	});

	useEffect(() => {
		return () => {
			const index = tasks.findIndex(
				(item) => Number(item.taskId) === Number(task.taskId)
			);
			tasks[index] = editedTask;
			dispatch({
				type: "SET_TASK",
				tasks: [...tasks],
			});
		};
	}, [editedTask]);

	const handleDelete = (e) => {
		//   e.preventDefault()
		onDelete(task.taskId);
		onClose();
	};

	return (
		<div style={{ width: "30vw", height: "65vh" }}>
			<div>
				<p>Title</p>
				<h2
					contentEditable='true'
					style={{ width: "100%", margin: 0 }}
					className={styles.outerBox}
					suppressContentEditableWarning
					onBlur={(e) =>
						setEditedTask({
							...editedTask,
							taskName: e.currentTarget.textContent,
						})
					}
				>
					<span className={styles.newElementWithText}>
						{editedTask.taskName}
					</span>
				</h2>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "20px 0px",
				}}
			>
				<p>Status</p>
				<p
					contentEditable='true'
					className={styles.outerBox}
					suppressContentEditableWarning
					onBlur={(e) =>
						setEditedTask({
							...editedTask,
							taskType: e.currentTarget.textContent,
						})
					}
				>
					<MenuItem value={editedTask.taskType}>{editedTask.taskType}</MenuItem>
				</p>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "20px 0px",
				}}
			>
				{/*<p>Status Test</p>
				<Select
					contentEditable='true'
					className={styles.outerBox}
					suppressContentEditableWarning
					onBlur={(e) =>
						setEditedTask({
							...editedTask,
							taskType: e.currentTarget.textContent,
						})
					}
				>
					<span className={styles.newElementWithText}>
						{editedTask.taskType}
					</span>
				</Select>*/}
			</div>
			<div>
				<p>Description</p>
				<p
					contentEditable='true'
					className={styles.outerBox}
					suppressContentEditableWarning
					style={{ minHeight: "20vh", alignItems: "start" }}
					onBlur={(e) =>
						setEditedTask({
							...editedTask,
							taskDescription: e.currentTarget.textContent,
						})
					}
				>
					<span className={styles.newElementWithText}>
						{editedTask.taskDescription}
					</span>
				</p>
			</div>

			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					className={styles.newElementButton}
					style={{
						width: "auto",
						marginTop: "30px",
						display: "flex",
						justifyContent: "center",
					}}
					onClick={(e) => handleDelete(e)}
				>
					<AiFillDelete size={35} />
				</Button>
			</div>
		</div>
	);
}
