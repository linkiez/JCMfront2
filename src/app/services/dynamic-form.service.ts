import { Injectable, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private controlPipes: Map<AbstractControl, PipeDescriptor> = new Map();

  constructor(private formBuilder: FormBuilder) {}

  createFormFromObject<T>(data: PrimitiveOrControlDescriptor<T>): FormGroup {
    return this.createGroup(data);
  }

  private createGroup<P>(data: any): FormGroup {
    const group = this.formBuilder.group({});
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
        const control = this.formBuilder.control(value.value);

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
        group.addControl(key, this.formBuilder.control(value));
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
        return this.formBuilder.control(item);
      }
    });
    return this.formBuilder.array(arrayControls);
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

  saveControlPipe(control: AbstractControl, pipeDescriptor: PipeDescriptor) {
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
        value,
        ...(pipeDescriptor.args || [])
      );
    } else {
      // Assuming it's a simple function
      return pipeDescriptor.pipe(value, ...(pipeDescriptor.args || []));
    }
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
  [P in keyof T]: (
    T[P] extends Array<infer U> ? Array<PrimitiveOrControlDescriptor<U>> : // Recursively apply for array items
    T[P] extends Function ? T[P] : // Skip functions
    T[P] extends object ? PrimitiveOrControlDescriptor<T[P]> : // Recursively apply for nested objects
    T[P] | ControlDescriptor<T[P]> // Apply for primitives
  )
};
