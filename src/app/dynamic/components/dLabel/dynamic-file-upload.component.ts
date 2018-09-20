import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, Input} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-file-upload',
  styleUrls: ['./dynamic-file-upload.component.scss'],
  template: `
<label
       class="uploader small"
       ondragover="return false;"
       [class.loaded]="loaded"
       [style.outlineColor]="dragging ? activeColor : baseColor"
       (dragenter)="handleDragEnter()"
       (dragleave)="handleDragLeave()"
       (drop)="handleDrop($event)">

  <i class="icon icon-upload" *ngIf="!loaded"
     [style.color]="dragging
            ? (context.file ? overlayColor : activeColor)
            : (!context.file ? overlayColor : baseColor)"></i>

  <img
    [src]="context.file"
    (load)="handleImageLoad()"
    [class.loaded]="imageLoaded"/>
  <input type="file" name="file" accept="image/*"
         (click)="handleClick($event)"
         (change)="handleInputChange($event)">
</label>   
`
})
export class DynamicFileUploadComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  @Input() extraClass: string;
  @Input() isDisabled: any;


  public fileClass: string ='uploader';
  borderColor: string = '#ccc';
  iconColor: string = '#ccc';
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;



  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super();
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
    // try {
    //   if (this.context) {
    //     this.imageSrc = this.context.file;
    //   }
    // }
    // catch (ex)
    // {
    //   console.log(ex);
    // }

  }

  isCtrlDisabled()
  {
    return this.isDisabled === true || this.isDisabled == 'true';
  }

  handleDragEnter() {
    if(this.isCtrlDisabled()){
      return;
    }
    this.dragging = true;
  }

  handleDragLeave() {
    if(this.isCtrlDisabled())
    {
      return;
    }
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    if(this.isCtrlDisabled()){
      return;
    }

    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
    this.iconColor = this.overlayColor;
  }

  handleClick(e){
    if(this.isCtrlDisabled() )
    {
      e.preventDefault();
      return;
    }

  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.context.file =  file;
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.loaded = true;
    this.context.file = reader.result;
  }

  _setActive() {
    this.borderColor = this.activeColor;
    if (!this.context.file) {
      this.iconColor = this.activeColor;
    }
  }

  _setInactive() {
    this.borderColor = this.baseColor;
    if (!this.context.file) {
      this.iconColor = this.baseColor;
    }
  }

}
