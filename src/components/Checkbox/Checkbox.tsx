import type { JSX } from "solid-js/jsx-runtime";
import {
	createUniqueId,
	splitProps,
	For,
	Show,
	createSignal,
	onMount,
} from "solid-js";

type Rule = {
	message: string;
	validator: (value: boolean) => boolean;
};

type CheckboxProps = Omit<
	JSX.InputHTMLAttributes<HTMLInputElement>,
	"value" | "type"
> & {
	label: string;
	name: string;
	rules?: Rule[];
};

export const Checkbox = (props: CheckboxProps) => {
	const [local, rest] = splitProps(props, [
		"label",
		"rules",
		"ref",
		"checked",
		"onChange",
	]);

	let ref: HTMLInputElement | undefined;
	const id = createUniqueId();
	const [checked, setChecked] = createSignal(local.checked ?? false);

	onMount(() => {
		if (ref && local.rules) {
			for (const rule of local.rules) {
				validate(rule, ref, checked());
			}
		}
	});

	function validate(rule: Rule, input: HTMLInputElement, value: boolean) {
		const valid = rule.validator(value);
		input.setCustomValidity(valid ? "" : rule.message);
		return valid;
	}

	return (
		<div class="field">
			<label for={id} class="checkbox">
				<input
					id={id}
					checked={local.checked ?? checked()}
					onChange={(e) => {
						setChecked(e.currentTarget.checked);

						if (typeof local.onChange === "function") {
							local.onChange(e);
						}
					}}
					ref={(element) => {
						ref = element;

						if (typeof local.ref === "function") {
							local.ref(element);
						}
					}}
					type="checkbox"
					{...rest}
				/>
				{local.label}
			</label>

			<Show when={local.rules && local.rules.length > 0}>
				<ul class="errors" data-name={rest.name}>
					<For each={local.rules}>
						{(rule) => (
							<Show
								when={ref && !validate(rule, ref, local.checked ?? checked())}
							>
								<li>
									<span aria-live="polite">{rule.message}</span>
								</li>
							</Show>
						)}
					</For>
				</ul>
			</Show>
		</div>
	);
};
