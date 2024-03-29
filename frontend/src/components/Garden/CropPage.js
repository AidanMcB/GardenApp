import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
	Modal,
	Header,
	Form,
	Label,
	Grid,
	Button,
	Input,
} from "semantic-ui-react";

export default function CropPage(props) {
	//calendar framework

	//consider adding when you planted it, how longs its been growing, other info
	//on the right side of the page
	let user = useSelector((state) => state.user);
	// let crops = useSelector(state => state.crops)

	let history = useHistory();
	let dispatch = useDispatch();
	let params = useParams();

	let [crop, setCrop] = React.useState();
	let [form, openForm] = React.useState(false);
	let [editedCrop, editCrop] = React.useState({});

	let crops = useSelector((state) => state.crops);
	// let crop = crops.find(crop => crop.id == params.id)

	const openWindow = () => {
		openForm(true);
	};

	const closeWindow = () => {
		openForm(false);
	};

	let setValue = (key, value) => {
		editCrop({ ...editedCrop, [key]: value });
	};

	React.useEffect(() => {
		fetch(`http://localhost:3000/crops/${params.id}`)
			.then((res) => res.json())
			.then((crop) => {
				setCrop({
					...crop,
				});
				setValue("id", crop.id);
			});
		//rerender when crops is changed(not needed because of history.push)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	const updateCrop = (cropInfo) => {
		closeWindow();
		fetch(`http://localhost:3000/crops/${cropInfo.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ cropInfo }),
		})
			.then((res) => res.json())
			.then((newCrop) => {
				console.log(newCrop);
				dispatch({ type: "UPDATE_CROPS", crop: newCrop });
				setCrop({
					...crop,
					...newCrop,
				});
			});
	};

	const handleDelete = (crop) => {
		fetch(`http://localhost:3000/crops/${crop.id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((deleteResp) => {
				if (deleteResp.success) {
					dispatch({ type: "DELETE_A_CROP", crop });
					history.push("/my_garden");
				}
			});
	};

	//build these logos out on figma.com
	//full sun => sun outline
	//partials sun =>
	//full shade

	// let today = new Date();
	// let dd = today.getDate();
	// let mm = today.getMonth() + 1; //As January is 0.
	// let yyyy = today.getFullYear();

	// if (dd < 10) dd = '0' + dd;
	// if (mm < 10) mm = '0' + mm;
	// let curday = (yyyy + '-' + mm + '-' + dd);

	const daysGrowing = (plantedDay) => {
		let today = new Date();
		let planted = new Date(plantedDay);
		let diffTime = Math.abs(today - planted);
		let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	if (crop === undefined || user === null || crop.garden === undefined) {
		return <h1>loading...</h1>;
	}
	return (
		// console.log(crop, user),
		<div className="crop show page">
			<Grid
				style={{
					// padding:"10px",
					margin: "auto",
					// backgroundColor:"rgb(34,139,34,0.15)"
				}}
				columns={2}
				divided
			>
				<Grid.Column>
					<div
						className="ui card"
						style={{ margin: "auto", border: "1px solid black" }}
					>
						<div className="image">
							<img alt={crop.name} src={crop.image_path} />
						</div>
						<div className="content">
							<div className="header">{crop.name}</div>
							<div className="meta">
								<br />
								<Label>Date Planted:</Label>
								<br />
								{crop.day_planted.substr(0, 10)}
							</div>
							<div className="description">
								<Label>Description:</Label>
								<br />
								{crop.description}
							</div>{" "}
							<br />
							<div>
								<Label>Sowing Method:</Label>
								<br />
								{crop.sowing_method}
							</div>{" "}
							<br />
							<div>
								<Label>Height: </Label>
								{crop.height != null
									? crop.height + " inches"
									: "(not available)"}
							</div>{" "}
							<br />
							<div>
								<Label>Days to full grown: </Label>
								{crop.growing_days == null
									? 80
									: crop.growing_days}
							</div>{" "}
							<br />
						</div>
						<div className="extra content">
							<i aria-hidden="true" className="sun outline icon">
								{" "}
							</i>
							{crop.sun_requirements}
						</div>
					</div>
				</Grid.Column>
				<Grid.Column>
					<div>
						<Header
							style={{
								color: "white",
								fontSize: "3em",
								textShadow: "1px 1px black",
							}}
							as="h1"
						>
							Details:
						</Header>
						<Label size="big" color="blue">
							Days I've been growing:
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;{daysGrowing(crop.day_planted)}
							{daysGrowing(crop.day_planted) > 1
								? " days"
								: " day"}
						</p>
						<br /> <br />
						<Label size="big" color="blue">
							Amount Planted:
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;{crop.number_planted}
						</p>
						<br /> <br />
						<Label size="big" color="blue">
							Days Until Expected Harvest:
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;
							{crop.growing_days == null
								? 80 - daysGrowing(crop.day_planted)
								: crop.growing_days -
								  daysGrowing(crop.day_planted)}{" "}
							days
						</p>
						<br /> <br />
						<Label size="big" color="blue">
							Current Height:
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;
							{crop.current_height == null
								? 0 + " inches"
								: crop.current_height + " inches"}
						</p>
						<br /> <br />
						<Label size="big" color="blue">
							Quantity Returned
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;
							{crop.quantity_returned == null
								? 0
								: crop.quantity_returned}
						</p>
						<br /> <br />
						<Label size="big" color="blue">
							Current Status of Crop
						</Label>
						<p
							style={{
								display: "inline",
								fontSize: "18px",
							}}
						>
							&emsp;{crop.status_of_plant}
						</p>
						<br /> <br />
						{user.id === crop.garden.user_id ? (
							<div>
								<Button style={{}} onClick={openWindow}>
									Update Crop Info
								</Button>
							</div>
						) : null}
						<br />
						<Button onClick={() => history.push("/my_garden")}>
							Back to My Garden
						</Button>
						<br /> <br />
						{user.id === crop.garden.user_id ? (
							<Button
								color="red"
								onClick={() => handleDelete(crop)}
								style={{}}
							>
								Remove Crop From My Garden{" "}
							</Button>
						) : null}
						<Modal open={form}>
							<Form
								style={{
									textAlign: "center",
									marginLeft: "60px",
									marginRight: "60px",
									marginTop: "20px",
									marginBottom: "20px",
								}}
							>
								<Form.Field style={{ textAlign: "center" }}>
									<Label size="large" color="blue">
										Current Height:
									</Label>
									<br /> <br />
									<Input
										onChange={(e) =>
											setValue(
												"current_height",
												e.target.value
											)
										}
										placeholder={crop.current_height}
									/>
								</Form.Field>
								<Form.Field style={{ textAlign: "center" }}>
									<Label size="large" color="blue">
										Quantity Returned
									</Label>
									<br />
									<br />
									<Input
										onChange={(e) =>
											setValue(
												"quantity_returned",
												e.target.value
											)
										}
										placeholder={crops.qunatity_returned}
									/>
								</Form.Field>
								<Form.Field>
									<Label size="large" color="blue">
										Current Status of Crop
									</Label>
									<br />
									<br />
									<Input
										onChange={(e) =>
											setValue(
												"status_of_plant",
												e.target.value
											)
										}
										placeholder={crops.status_of_plant}
									/>
								</Form.Field>
								<Button
									color="green"
									onClick={() => updateCrop(editedCrop)}
									type="submit"
								>
									Submit
								</Button>
								<Button
									color="black"
									onClick={() => openForm(false)}
								>
									Nope
								</Button>
							</Form>
						</Modal>
					</div>
				</Grid.Column>
			</Grid>
		</div>
	);
}
