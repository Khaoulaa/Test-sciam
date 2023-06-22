import { FormControl } from "@angular/forms";

export interface EditTaskFormGroup {
    name: FormControl<string>;
    description: FormControl<string>;
}