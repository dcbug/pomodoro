export class Component {
  constructor(el) {
    this._el = el;
  }
  
  attach(node) {
    node.append(this._el);
  }
  
  remove() {
      this._el.remove();
  }
};
