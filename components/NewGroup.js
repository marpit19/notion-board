import { Dialog, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import styles from "../styles/Components.module.css";
import EditTask from "./EditTask";
import { Button } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const SingleElement = ({ task, type, onClick }) => {
	const handleDragStart = (e, id) => {
		e.dataTransfer.setData("task", JSON.stringify(task));
		e.dataTransfer.setData("taskType", type);
	};

	return (
		<a
			href='#'
			className={styles.outerBox}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
			}}
			draggable
			onDragStart={(e) => handleDragStart(e, task.taskId)}
			onClick={() => onClick()}
		>
			<h2
				className={task !== "" ? styles.newElementWithText : styles.newElement}
			>
				{task !== "" ? task.taskName : "Untitled"}
			</h2>

			{task.taskDescription !== "" && (
				<p className={styles.newElementWithDescription}>
					{task.taskDescription}
				</p>
			)}
		</a>
	);
};

export default function NewGroup({ name }) {
	const [{ tasks }, dispatch] = useStateValue();
	const [newPostToggle, setNewPostToggle] = useState(false);
	const [newPost, setNewPost] = useState("");
	const [editModalToggle, setEditModalToggle] = useState(false);
	const [activeEditTask, setActiveEditTask] = useState({});

	const handleNewElement = (e) => {
		newPostToggle && updateElementValue();
		setNewPostToggle(true);
	};

	const updateElementValue = (e, i) => {
		dispatch({
			type: "SET_TASK",
			tasks: [
				...tasks,
				{
					taskId: Math.round(Math.random() * 1000),
					taskName: newPost,
					taskType: name,
					taskDescription: "",
				},
			],
		});
		setNewPostToggle(false);
		setNewPost("");
	};

	const handleEditDetails = (task, key) => {
		setEditModalToggle(true);
		setActiveEditTask(task);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleOnDrop = (e) => {
		e.preventDefault();
		let droppedTask = JSON.parse(e.dataTransfer.getData("task"));
		const index = tasks.findIndex(
			(item) => Number(item.taskId) === Number(droppedTask.taskId)
		);
		tasks[index].taskType = name;
		dispatch({
			type: "SET_TASK",
			tasks: [...tasks],
		});
	};

	const handleDelete = (deleteId) => {
		setTimeout(() => {
			dispatch({
				type: "SET_TASK",
				tasks: tasks.filter((item) => item.taskId !== deleteId),
			});
		}, 500);
	};

	return (
		<div
			className={styles.group}
			onDragOver={(e) => handleDragOver(e)}
			onDrop={(e) => handleOnDrop(e)}
		>
			<p>
				<span className={styles.groupName}>{name}</span>
				<span className={styles.groupCount}>
					{tasks?.filter((item) => item.taskType === name)?.length}
				</span>

				<span className={styles.groupDot}>
					<BsThreeDots
						className={styles.rightButton}
						style={{
							justifyContent: "flex-start",
							verticalAlign: "middle",
						}}
						onClick={(e) => handleNewElement(e)}
						rounded
						size={20}
					/>
				</span>
				<span className={styles.groupAdd}>
					<button
						className={styles.rightButton}
						style={{
							justifyContent: "flex-start",
							width: "10%",
							verticalAlign: "middle",
						}}
						onClick={(e) => handleNewElement(e)}
						rounded
					>
						<AiOutlinePlus />
					</button>
				</span>
			</p>

			{tasks
				?.filter((item) => item.taskType === name)
				?.map((task, key) => (
					<SingleElement
						key={key}
						task={task}
						type={name}
						onClick={(e) => handleEditDetails(task, key)}
					/>
				))}

			<Dialog open={editModalToggle} onClose={(e) => setEditModalToggle(false)}>
				<DialogContent sx={{ backgroundColor: "white" }}>
					<EditTask
						tasks={tasks}
						task={activeEditTask}
						onDelete={(val) => handleDelete(val)}
						onClose={(e) => setEditModalToggle(false)}
					/>
				</DialogContent>
			</Dialog>

			{newPostToggle && (
				<a href='#' className={styles.outerBox}>
					<input
						autoFocus
						value={newPost}
						className={styles.newElementWithText}
						contentEditable
						onChange={(e) => setNewPost(e.target.value)}
						onBlur={(e) => updateElementValue(e)}
					/>
				</a>
			)}

			<Button
				className={styles.newElementButton}
				style={{ textTransform: "none", justifyContent: "flex-start" }}
				onClick={(e) => handleNewElement(e)}
			>
				+ New{" "}
			</Button>
		</div>
	);
}
