
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _items:Array<Item> = [];

  constructor(opt:any) {
    super(opt)

    const num = 8
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('item')
      this.getEl().append(el);
      const item = new Item({
        el:el,
        id:i,
      })
      this._items.push(item);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const itemW = this._items[0].itemSize.width;
    const interval = itemW * 1.25
    const line = 4;
    this._items.forEach((val,i) => {
      const ix = ~~(i % line);
      const iy = ~~(i / line);

      Tween.instance.set(val.getEl(), {
        x:ix * interval + sw * 0.5 - interval * line * 0.5,
        y:iy * interval * 0.5 + sh * 0.5 - interval * 2 * 0.25
      })
    });
  }


  protected _resize(): void {
    super._resize();

    const sh = Func.instance.sh();

    Tween.instance.set(document.body, {
      height:sh
    })
  }
}