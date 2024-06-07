import { Injectable, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class DynamicFormService {
  private controlPipes: Map<AbstractControl, PipeDescriptor> = new Map();

  constructor() {}

  createFormFromObject<T>(data: PrimitiveOrControlDescriptor<T>): FormGroup {
    return this.createGroup(data);
  }

  private createGroup<P>(data: any): FormGroup {
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
        const control = new FormControl(value.value);

        if (value.hasOwnProperty('validators')) {
          control.setValidators(this.mapValidators(value.validators || []));
        }

        if (value.hasOwnProperty('asyncValidators')) {
          control.setAsyncValidators(
            this.mapValidators(value.asyncValidators || [])
          );
        }

        if (value.hasOwnProperty('pipe') && value.pipe) {
          this.controlPipes.set(control, value.pipe);
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
        switch (validator.name) {
          case 'required':
            return Validators.required;
          case 'email':
            return Validators.email;
          case 'minLength':
            return Validators.minLength(validator.minLength);
          case 'maxLength':
            return Validators.maxLength(validator.maxLength);
          case 'min':
            return Validators.min(validator.min);
          case 'max':
            return Validators.max(validator.max);
          case 'requiredTrue':
            return Validators.requiredTrue;
          case 'pattern':
            return Validators.pattern(validator.pattern);
          case 'nullValidator':
            return Validators.nullValidator;
          case 'compose':
            return this.mapValidators(validator.validators);
          case 'composeAsync':
            return this.mapValidators(validator.validators);
        }

        return null;
      })
      .filter((v) => v !== null);
  }

  private saveControlPipe(control: AbstractControl, pipeDescriptor: PipeDescriptor) {
    this.controlPipes.set(control, pipeDescriptor);
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

  // Function to clone a FormControl
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
  validators?: { name: string; [param: string]: any }[];
  asyncValidators?: { name: string; [param: string]: any }[];
  pipe?: PipeDescriptor;
}

interface PipeDescriptor {
  pipe: PipeTransform | ((value: any, ...args: any[]) => any);
  args?: any[];
}

type PrimitiveOrControlDescriptor<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? Array<PrimitiveOrControlDescriptor<U>> // Recursively apply for array items
    : T[P] extends Function
    ? T[P] // Skip functions
    : T[P] extends object
    ? T[P] extends Date
      ? T[P] | ControlDescriptor<T[P]>
      : PrimitiveOrControlDescriptor<T[P]> // Recursively apply for nested objects
    : T[P] | ControlDescriptor<T[P]>; // Apply for primitives
};
