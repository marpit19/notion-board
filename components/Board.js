import React, { useState } from "react";
import NewGroup from "./NewGroup";
import styles from "../styles/Components.module.css";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { AiOutlinePlus } from "react-icons/ai";

export default function Board() {
	const [differentGroups, setDifferentGroups] = useState([
		"Not Started",
		"In progress",
		"Completed",
	]);
	const [openAddNewGroupDialog, setOpenAddNewGroupDialog] = useState(false);
	const [newGroup, setNewGroup] = useState("");
	return (
		<div
			style={{
				display: "flex",
				marginTop: "2rem",
				flexWrap: "wrap",
				overflow: "auto",
			}}
		>
			{differentGroups.map((item, index) => (
				<NewGroup key={index} name={item} />
			))}
			<div style={{ position: "relative" }}>
				<Button
					className={styles.newElementButton}
					style={{ textTransform: "none" }}
					onClick={(e) => setOpenAddNewGroupDialog(true)}
				>
					+ New Status
				</Button>
				{openAddNewGroupDialog && (
					<ClickAwayListener
						onClickAway={() => setOpenAddNewGroupDialog(false)}
					>
						<div className={styles.outerBox} style={{ margin: "0.83em" }}>
							<input
								autoFocus
								className={styles.newElementWithText}
								margin='dense'
								id='name'
								placeholder='Add New Status'
								onChange={(e) => setNewGroup(e.target.value)}
								type='text'
								fullWidth
								variant='standard'
							/>
							<Button
								className={styles.newElementButton}
								style={{ marginRight: "10px" }}
								onClick={() =>
									differentGroups.indexOf(newGroup) === -1 &&
									setDifferentGroups([...differentGroups, newGroup])
								}
							>
								<AiOutlinePlus />
							</Button>
						</div>
					</ClickAwayListener>
				)}
			</div>
		</div>
	);
}
