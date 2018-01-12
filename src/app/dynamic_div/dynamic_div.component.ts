import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ViewChildren, ViewContainerRef, ComponentFactory,
ComponentRef, ComponentFactoryResolver, QueryList, ElementRef, Renderer2, HostBinding} from '@angular/core';

import { DraggableDirective } from '../draggable/draggable.directive';

@Component({
  selector: 'app-dynamic-div',
  templateUrl: './dynamic_div.component.html',
  styleUrls: ['./dynamic_div.component.css']
})
export class DynamicDivComponent implements OnInit, AfterViewInit, OnDestroy {

  componentContainer;
  componentRefs: ComponentRef<any>[] = [];

  @Input() text = '';
  @Input() styles = {};
  @Input() childs = [];

  @ViewChildren('dynamicChildContainer', { read: ViewContainerRef }) components: QueryList<ViewContainerRef>;


  @HostBinding('attr.draggable') draggableHelper = new DraggableDirective(this.elementRef, this.renderer);


  constructor(
    public elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    public renderer: Renderer2) { }

  ngOnInit() {
    console.log('type', this.text);
    this.componentContainer = this.elementRef.nativeElement;

    

  }
  ngOnDestroy() {
    this.componentRefs.map((i) => {
      i.destroy();
    });
  }

  ngAfterViewInit() {
    if (this.styles) {
      for (const property in this.styles) {
        if (this.styles.hasOwnProperty(property)) {
          this.renderer.setStyle(this.componentContainer, property, this.styles[property]);
        }
      }
    }

    this.draggableHelper.ngOnInit();

    const components = this.components.toArray();
    setTimeout(() => {
      for (let i = 0; i < this.childs.length; i++) {
        this.createComponent(components[i], this.childs[i]);
      }
    }, 1);
  }

  createComponent(container: ViewContainerRef, obj) {

    let componentRef: ComponentRef<any>;

    if (obj.tag && obj.tag === 'div') {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DynamicDivComponent);
      componentRef = container.createComponent(factory);
      this.componentRefs.push(componentRef);
    }

    if (componentRef && obj.text) {
      componentRef.instance.text = obj.text;
    }

    if (componentRef && obj.styles) {
      componentRef.instance.styles = obj.styles;
    }


    if (componentRef && obj.content && obj.content instanceof Array) {
      componentRef.instance.childs = obj.content;
    }
  }


  dragEnd($event) {
    console.log('$event', $event)
  }

}
