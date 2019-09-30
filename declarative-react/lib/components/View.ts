import React from 'react';

interface MarginModel {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
}
interface PaddingModel {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
}

interface SizeModel {
  height?: number;
  width?: number;
}

interface BorderModel {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

export class ViewClass<T extends HTMLElement, CT> {
  protected _tag: string;
  protected _props: { style: React.CSSProperties } & React.HTMLProps<T>; // with default empty style
  protected _children: CT | null;
  protected constructor() {
    this._tag = 'div';
    this._props = { style: {} };
    this._children = null;
  }

  public tag(tag: string, when?: boolean) {
    if (when !== false) this._tag = tag;
    return this;
  }

  private static getBoxModelObj(type: 'margin' | 'padding', value: number | PaddingModel) {
    let result: any = {};
    if (typeof value === 'number') {
      result = { [type]: value };
    } else {
      if ('horizontal' in value) result[`${type}Left`] = result[`${type}Right`] = value.horizontal;
      if ('vertical' in value) result[`${type}Top`] = result[`${type}Bottom`] = value.vertical;
      if ('top' in value) result[`${type}Top`] = value.top;
      if ('bottom' in value) result[`${type}Bottom`] = value.bottom;
      if ('left' in value) result[`${type}Left`] = value.left;
      if ('right' in value) result[`${type}Right`] = value.right;
    }
    return result;
  }

  public padding(value: number | PaddingModel, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('padding', value));
    return this;
  }

  public margin(value: number | MarginModel, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('margin', value));
    return this;
  }

  public size(size: SizeModel, when?: boolean) {
    if (when === false) return this;
    this._props.style.width = size.width;
    this._props.style.height = size.height;
    return this;
  }

  public border(border: BorderModel, when?: boolean) {
    if (when === false) return this;
    this._props.style.border = !!border.borderWidth ? 'solid' : '';
    this._props.style.borderRadius = border.borderRadius;
    this._props.style.borderColor = border.borderColor;
    this._props.style.borderWidth = border.borderWidth;
    return this;
  }

  public class(className: string, when?: boolean) {
    if (when === false) return this;
    if (!this._props.className) this._props.className = className;
    else this._props.className += ' ' + className;
    return this;
  }

  public style(styleObject: React.CSSProperties, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, styleObject);
    return this;
  }

  public id(idName: string) {
    this._props.id = idName;
    return this;
  }

  public props(props: React.HTMLProps<T>, when?: boolean) {
    if (when === false) return this;
    this._props = Object.assign(this._props, props);
    return this;
  }

  public build() {
    return React.createElement(this._tag, this._props, this._children);
  }
}
