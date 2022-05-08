
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Update } from "../libs/update";
import { Val } from "../libs/val";
import { Expo } from "gsap";
import { Rect } from "../libs/rect";
import { Color } from 'three/src/math/Color';

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _txt:HTMLElement;
  private _slider:any;
  private _rate:Val = new Val();
  private _isPlaying:boolean = false;
  private _isRollover:boolean = false;

  public itemSize:Rect = new Rect();

  constructor(opt:any) {
    super(opt)

    // テキスト
    this._txt = document.createElement('p');
    this._txt.innerHTML = 'ROLLOVER';
    this.getEl().append(this._txt);

    // スライダー
    this._slider = document.createElement('input');
    this._slider.setAttribute('type', 'range');
    this._slider.setAttribute('min', '0');
    this._slider.setAttribute('max', '100');
    this._slider.setAttribute('step', '1');
    this.getEl().append(this._slider);

    this._setHover();
  }


  //
  protected _eRollOver() {
    this._isRollover = true;

    if(this._isPlaying) return;
    this._isPlaying = true;

    Tween.instance.a(this._rate, {
      val:[0, 1]
    }, 0.5, 0, Expo.easeOut, null, null, () => {
      this._eCompRollOver();
    })
  }


  //
  // ------------------------------------
  private _eCompRollOver():void {
    this._isPlaying = false;
    if(!this._isRollover) {
        this._eRollOut();
    }
  }


  //
  protected _eRollOut() {
    this._isRollover = false;

    if(this._isPlaying) return;
    this._isPlaying = true

    Tween.instance.a(this._rate, {
        val:0
    }, 0.75, 0, Expo.easeInOut, null, null, () => {
        this._eCompRollOut()
    })
  }


  //
  // ------------------------------------
  private _eCompRollOut():void {
    this._isPlaying = false
    if(this._isRollover) {
      this._eRollOver()
    }
  }


  protected _update(): void {
    super._update();

    if(Update.instance.cnt % 10 == 0) {
      const txtW = this.getWidth(this._txt);
      const txtH = this.getHeight(this._txt);
      Tween.instance.set(this._slider, {
        width:txtW,
        y:txtH * 1.2,
      })
      this.itemSize.width = txtW;
      this.itemSize.height = txtH;
    }

    this._slider.value = this._rate.val * 100

    // テキストの色
    const colA = new Color(0x000000);
    const colB = new Color(0x3478f6);
    colA.lerp(colB, this._rate.val);
    Tween.instance.set(this._txt, {
      color:colA.getStyle(),
    })
  }
}