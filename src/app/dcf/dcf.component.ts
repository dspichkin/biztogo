import { Component, OnInit, OnDestroy, Input, ComponentFactoryResolver, ComponentFactory,
ViewChild, ViewContainerRef, ComponentRef  } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { DynamicDivComponent } from '../dynamic_div/dynamic_div.component';

import { IDomNode } from './node';

@Component({
  selector: 'app-dcf',
  templateUrl: './dcf.component.html',
  styleUrls: ['./dcf.component.css']
})
export class DcfComponent implements OnInit, OnDestroy {
  @Input() public source: string;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  componentRef: ComponentRef<any>;
  componentData: IDomNode[];
  elements = [];

  constructor(private http: HttpClient, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.http.get(this.source).subscribe((data: IDomNode) => {
      this.createComponent(data);
    });
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }


  createComponent(obj) {
    this.dynamicComponentContainer.clear();

    if (obj.tag && obj.tag === 'div') {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DynamicDivComponent);
      this.componentRef = this.dynamicComponentContainer.createComponent(factory);
    }

    if (this.componentRef && obj.text) {
      this.componentRef.instance.text = obj.text;
    }

    if (this.componentRef && obj.styles) {
      this.componentRef.instance.styles = obj.styles;
    }

    if (this.componentRef && obj.content && obj.content instanceof Array) {
      this.componentRef.instance.childs = obj.content;
    }
  }



}
