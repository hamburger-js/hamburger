// 兼容 React 和 HTML 元素
export type HElement = Element | JSX.Element | string | null

// 元素的子元素必须是 元素 或 元素的构造器
export type ChildElement = HElement | IBuildable;

export interface IBuildable {
  build(): HElement;
}

export interface IThemeable {
  theme(name: string, when?: boolean): this;
}

export interface IChildIterable<ChildType> {
  mapItem(wrapper: (item: ChildType) => ChildElement)
}

const isReact = true;

export { isReact };
