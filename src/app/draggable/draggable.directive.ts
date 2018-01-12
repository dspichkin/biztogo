import {Component, Directive, HostListener, EventEmitter, ElementRef, OnInit, Renderer2} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';


@Directive({
    selector: '[draggable]',
})
export class DraggableDirective implements OnInit {

    mouseup = new EventEmitter();
    mousedown = new EventEmitter();
    mousemove = new EventEmitter();
    mouseout = new EventEmitter();
    mousedrag;

    constructor(
      public element: ElementRef,
      public renderer: Renderer2) {

        renderer.listen(element.nativeElement, 'mousedown', (event) => {
          event.stopPropagation();
          this.onMousedown(event);
        });

        renderer.listen(element.nativeElement, 'mouseup', (event) => {
          event.stopPropagation();
          this.onMouseup(event);
        });

        renderer.listen(element.nativeElement, 'mousemove', (event) => {
          event.stopPropagation();
          this.onMousemove(event);
        });

        renderer.listen(element.nativeElement, 'mouseout', (event) => {
          event.stopPropagation();
          this.onMouseout(event);
        });

    }

      ngOnInit() {
      }


      onMouseup(event) {
        this.stopMoving();
        console.log('onMouseup');
        return false;
      }

      onMousedown(event) {
        this.startMoving();
        console.log('onMousedown');
        return false;
      }

      onMousemove(event) {
        console.log('onMousemove');
        return false;
      }

      onMouseout(event) {
        console.log('onMouseout');
        this.stopMoving();
        return false;
      }

      startMoving() {
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '0.5');
      }
      stopMoving() {
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
      }

}
