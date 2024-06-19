import { PipeTransform } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class DynamicFormService {
  private controlPipes: Map<AbstractControl, PipeDescriptor> = new Map();
  private validators: Map<string, ValidatorFn | AsyncValidatorFn> = new Map();

  constructor() {}

  createFormFromObject<T>(data: PrimitiveOrControlDescriptor<T>): FormGroup {
    return this.createGroup(data);
  }

  private createGroup(data: any): FormGroup {
    const group = new FormGroup({});
    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (Array.isArray(value)) {
        group.addControl(key, this.createArray(value));
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !this.isControlDescriptor(value)
      ) {
        group.addControl(key, this.createGroup(value));
      } else if (this.isControlDescriptor(value)) {
        let control;
        if (Array.isArray(value.value)) {
          control = this.createArray(value.value);
        } else if (
          typeof value.value === 'object' &&
          value.value !== null &&
          !(value.value instanceof Date)
        ) {
          control = this.createGroup(value.value);
        } else {
          control = new FormControl(value.value);
          if (value.hasOwnProperty('pipe') && value.pipe) {
            this.controlPipes.set(control, value.pipe);
          }
        }

        if (value.hasOwnProperty('validators')) {
          control.setValidators(this.mapValidators(value.validators || []));
        }

        if (value.hasOwnProperty('asyncValidators')) {
          control.setAsyncValidators(
            this.mapValidators(value.asyncValidators || [])
          );
        }

        group.addControl(key, control);
      } else {
        group.addControl(key, new FormControl(value));
      }
    });
    return group;
  }

  private createArray(data: any[]): FormArray {
    const arrayControls = data.map((item) => {
      if (Array.isArray(item)) {
        return this.createArray(item);
      } else if (typeof item === 'object' && item !== null) {
        return this.createGroup(item);
      } else {
        return new FormControl(item);
      }
    });
    return new FormArray(arrayControls);
  }

  private isControlDescriptor(obj: any): obj is ControlDescriptor<any> {
    return (
      obj &&
      obj.hasOwnProperty('value') &&
      (obj.hasOwnProperty('validators') ||
        obj.hasOwnProperty('asyncValidators') ||
        obj.hasOwnProperty('pipe'))
    );
  }

  private mapValidators(validators: any[]): any[] {
    if (!validators) return [];
    return validators
      .map((validator) => {
        if (Validators.hasOwnProperty(validator.name)) {
          if (validator.hasOwnProperty(validator.name))
            return (Validators as any)[validator.name](
              validator[validator.name]
            );
          else return (Validators as any)[validator.name];
        }
        const validatorFn = this.validators.get(validator.name);
        if (!validatorFn) {
          throw new Error(`Validator ${validator.name} não encontrado`);
        }
        if (validator.hasOwnProperty(validator.name))
          return validatorFn(validator[validator.name]);
        else return validatorFn;
      })
      .filter((v) => v !== null);
  }

  addValidator(name: string, validator: ValidatorFn | AsyncValidatorFn) {
    this.validators.set(name, validator);
  }

  addValidators(
    validators: { name: string; validator: ValidatorFn | AsyncValidatorFn }[]
  ) {
    validators.forEach((validador) => {
      this.validators.set(validador.name, validador.validator);
    });
  }

  getFormattedValue(control: AbstractControl): any {
    const pipeDescriptor: PipeDescriptor | undefined =
      this.controlPipes.get(control);
    if (!pipeDescriptor) {
      // If no special formatting is defined, return raw value
      return control.value;
    }
    return this.applyPipe(control.value, pipeDescriptor);
  }

  getAllErrors(form: FormGroup) {
    const errors = {};
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      if (control instanceof FormArray) {
        const arrayErrors = this.getArrayErrors(control);
        if (arrayErrors) {
          (errors as any)[key] = arrayErrors;
        }
      } else if (control instanceof FormGroup) {
        const groupErrors = this.getGroupErrors(control);
        if (groupErrors) {
          (errors as any)[key] = groupErrors;
        }
      } else if (control instanceof FormControl) {
        const controlErrors = this.getControlErrors(control);
        if (controlErrors) {
          (errors as any)[key] = controlErrors;
        }
      }
    });
    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  }

  private getArrayErrors(formArray: FormArray): ValidationErrors[] | null {
    const errors: ValidationErrors[] = [];
    if (formArray.errors) {
      Object.keys(formArray.errors).forEach((key) => {
        errors.push(formArray.errors[key]);
      });
    }
    Object.keys(formArray.controls).forEach((key) => {
      const control = formArray.controls[+key];
      if (control instanceof FormArray) {
        const arrayErrors = this.getArrayErrors(control);
        if (arrayErrors) {
          (errors as any)[key] = arrayErrors;
        }
      } else if (control instanceof FormGroup) {
        const groupErrors = this.getGroupErrors(control);
        if (groupErrors) {
          (errors as any)[key] = groupErrors;
        }
      } else if (control instanceof FormControl) {
        const controlErrors = this.getControlErrors(control);
        if (controlErrors) {
          (errors as any)[key] = controlErrors;
        }
      }
    });
    if (errors.length > 0) {
      return errors;
    } else {
      return null;
    }
  }

  private getGroupErrors(formGroup: FormGroup): ValidationErrors {
    const errors: ValidationErrors = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      if (control instanceof FormArray) {
        const arrayErrors = this.getArrayErrors(control);
        if (arrayErrors) {
          (errors as any)[key] = arrayErrors;
        }
      } else if (control instanceof FormGroup) {
        const groupErrors = this.getGroupErrors(control);
        if (groupErrors) {
          (errors as any)[key] = groupErrors;
        }
      } else if (control instanceof FormControl) {
        const controlErrors = this.getControlErrors(control);
        if (controlErrors) {
          (errors as any)[key] = controlErrors;
        }
      }
    });
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return null;
    }
  }

  private getControlErrors(control: AbstractControl): ValidationErrors {
    const errors: ValidationErrors = {};
    const controlErrors: ValidationErrors | null = control.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((key) => {
        (errors as any)[key] = controlErrors[key];
      });
    } else {
      return null;
    }
    return errors;
  }

  private applyPipe(value: any, pipeDescriptor: PipeDescriptor): any {
    if ('transform' in pipeDescriptor.pipe) {
      // Checks if it's an Angular pipe
      return pipeDescriptor.pipe.transform(
        value instanceof Date ? value.toISOString() : value,
        ...(pipeDescriptor.args || [])
      );
    } else {
      // Assuming it's a simple function
      return pipeDescriptor.pipe(value, ...(pipeDescriptor.args || []));
    }
  }

  resizeForm(form: FormGroup, data: any): FormGroup {
    Object.keys(data)
      .sort()
      .forEach((dataKey) => {
        let control = form.get(dataKey);
        if (!control) {
          return;
        } else if (control instanceof FormArray) {
          const array = this.resizeArray(control, data[dataKey]);
          form.setControl(dataKey, array);
        } else if (control instanceof FormGroup) {
          const group = this.resizeForm(control, data[dataKey]);
          form.setControl(dataKey, group);
        } else {
          form.setControl(dataKey, control);
        }
      });
    return form;
  }

  private resizeArray(formArray: FormArray, dataArray: any[]): FormArray {
    if (formArray.controls.length === 0) {
      return formArray;
    }

    const controlModel = (): FormGroup => {
      const originalControl = formArray.at(0) as FormGroup;
      return this.cloneFormGroup(originalControl);
    };

    while (formArray.controls.length > dataArray.length) {
      formArray.removeAt(formArray.controls.length - 1);
    }

    for (let i = formArray.controls.length; i < dataArray.length; i++) {
      formArray.push(controlModel());
    }

    dataArray.forEach((item, index) => {
      if (Array.isArray(item)) {
        const formArrayControl = formArray.controls[index] as FormArray;
        formArray.controls[index] = this.resizeArray(formArrayControl, item);
      } else if (typeof item === 'object' && item !== null) {
        const control = formArray.controls[index] as FormGroup;
        formArray.controls[index] = this.resizeForm(control, item);
      }
    });
    return formArray;
  }

  private cloneFormControl(control: FormControl): FormControl {
    const newControl = new FormControl(
      control.value,
      control.validator,
      control.asyncValidator
    );

    const pipe = this.controlPipes.get(control);
    this.controlPipes.set(newControl, pipe);

    return newControl;
  }

  private cloneFormGroup(original: FormGroup): FormGroup {
    const cloned = new FormGroup({});

    Object.keys(original.controls).forEach((key) => {
      const originalControl = original.controls[key];
      if (originalControl instanceof FormGroup) {
        cloned.registerControl(key, this.cloneFormGroup(originalControl));
      } else if (originalControl instanceof FormControl) {
        cloned.registerControl(key, this.cloneFormControl(originalControl));
      }
    });

    return cloned;
  }
}

interface ControlDescriptor<T> {
  value: T;
  validators?: ValidatorDescriptor[];
  asyncValidators?: ValidatorDescriptor[];
  pipe?: PipeDescriptor;
}

interface PipeDescriptor {
  pipe: PipeTransform | ((value: any, ...args: any[]) => any);
  args?: any[];
}

interface ValidatorDescriptor {
  name: string;
  [param: string]: any;
}

type PrimitiveOrControlDescriptor<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ?
        | Array<PrimitiveOrControlDescriptor<U>>
        | ControlDescriptor<Array<PrimitiveOrControlDescriptor<U>>> // Recursively apply for array items
    : T[P] extends Function
    ? T[P] // Skip functions
    : T[P] extends object
    ? T[P] extends Date
      ? T[P] | ControlDescriptor<T[P]>
      : PrimitiveOrControlDescriptor<T[P]> // Recursively apply for nested objects
    : T[P] | ControlDescriptor<T[P]>; // Apply for primitives
};
