import type { Component } from "solid-js";
import { Input } from "./components/Input";
import { Textarea } from "./components/Textarea";
import { RadioGroup } from "./components/RadioGroup";
import { Checkbox } from "./components/Checkbox";
import icon from "./assets/images/icon-success-check.svg";

const EMAIL_REGEX =
	/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const App: Component = () => {
	let ref: HTMLDivElement | undefined;
	return (
		<>
			<main>
				<h1>Contact Us</h1>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						ref?.showPopover();
					}}
				>
					<Input
						label="First Name"
						name="firstName"
						type="text"
						autocomplete="given-name"
						rules={[
							{
								validator: (value) => value.length > 0,
								message: "This field is required",
							},
						]}
					/>

					<Input
						label="Last Name"
						name="lastName"
						type="text"
						autocomplete="family-name"
						rules={[
							{
								validator: (value) => value.length > 0,
								message: "This field is required",
							},
						]}
					/>

					<div class="full-width">
						<Input
							label="Email Address"
							name="email"
							type="email"
							autocomplete="family-name"
							rules={[
								{
									validator: (value) => value.length > 0,
									message: "This field is required",
								},
								{
									validator: (value) => EMAIL_REGEX.test(value),
									message: "Please enter a valid email address",
								},
							]}
						/>
					</div>

					<div class="full-width">
						<RadioGroup
							name="query-type"
							label="Query Type"
							options={[
								{
									label: "General Enquiry",
									value: "general-enquiry",
								},
								{
									label: "support-request",
									value: "Support Request",
								},
							]}
							rules={[
								{
									validator: (value) => value.length > 0,
									message: "Please select a query type",
								},
							]}
						/>
					</div>

					<div class="full-width">
						<Textarea
							label="Message"
							name="message"
							rules={[
								{
									validator: (value) => value.length > 0,
									message: "This field is required",
								},
							]}
						/>
					</div>

					<div class="full-width">
						<Checkbox
							label="I consent to being contacted by the team"
							name="consent"
							rules={[
								{
									validator: (value) => value,
									message:
										"To submit this form, please consent to being contacted",
								},
							]}
						/>
					</div>

					<button type="submit" class="full-width">
						Submit
					</button>
				</form>
			</main>

			<div class="success" ref={ref} popover="auto">
				<header>
					<img width="20" src={icon} alt="" />
					<strong>Message Sent!</strong>
				</header>
				<p>Thanks for completing the form. We'll be in touch soon!</p>
			</div>

			<div class="attribution">
				Challenge by{" "}
				<a href="https://www.frontendmentor.io?ref=challenge">
					Frontend Mentor
				</a>
				. Coded by{" "}
				<a href="https://github.com/gustavo-shigueo">Gustavo Shigueo</a>.
			</div>
		</>
	);
};

export default App;
