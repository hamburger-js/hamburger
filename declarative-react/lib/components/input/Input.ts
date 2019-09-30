import React from 'react';
import { ViewClass } from '../View';

class InputClass extends ViewClass<HTMLInputElement, null> {
  constructor(value: string, type?: string) {
    super();
    this._props.value = value;
    this._props.type = type;
    this._tag = 'input';
  }

  public onChange(callback: React.ChangeEventHandler<HTMLInputElement>) {
    this._props.onChange = callback;
    return this;
  }
}

export function Input(value: string, type?: string) {
  return new InputClass(value, type);
}