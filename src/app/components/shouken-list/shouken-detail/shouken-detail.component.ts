import { HttpService } from './../../../core/service/http.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCpnComponent } from '../../../core/base-cpn/base-cpn.component';
import { CommonService } from '../../../core/service/common.service';
import { environment } from 'src/environments/environment';
import * as EXIF from 'exif-js';
import * as $ from 'jquery';
declare var fx: any;

@Component({
  selector: 'app-shouken-detail',
  templateUrl: './shouken-detail.component.html',
  styleUrls: ['./shouken-detail.component.css']
})
export class ShoukenDetailComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  //#region Define variable -----------------------------------------------------------------------
  @ViewChild('canvasEl') canvasEl: ElementRef;
  public context: CanvasRenderingContext2D;
  public groupId: string;
  public fileId: string;
  public status: string;
  public orientation: number;

  headerTitle: string;
  base64: string;
  token = localStorage.getItem('id_token');
  image: any;
  src = '';
  enableMasking = false;
  shapes = [];
  maskings = [];
  imageCanvas: any;
  stage: any;
  layer: any;
  imageObj: any;
  dragok = false;
  img: any;
  widthImage: any;
  heightImage: any;
  divSize: any;
  yellowRect: any;
  miniature: number;
  boxUpLeft: any;
  boxUpRight: any;
  boxDownLeft: any;
  boxDownRight: any;
  dynamicWidth: number;
  dynamicHeight: number;
  canvas: any;
  offsetX: any;
  offsetY: any;
  startX: any;
  startY: any;
  realWidth: any;
  realHeight: any;
  enablePolygon = false;
  isMobile = false;
  isCropDone = false;
  enableButton = false;
  enableGoToRotate = false;
  enableGoToCrop = false;
  enableGoToMasking = false;
  enableBackToList = false;
  enableBackToImage = false;
  enableCrop = false;
  dragPointMasking = false;
  enableAccept = false;
  maskingFocus: number;
  enablePointMasking = false;
  enableRotate = false;
  croped = false;
  upLeftX: number;
  upLeftY: number;
  upRightX: number;
  upRightY: number;
  downLeftX: number;
  downLeftY: number;
  downRightX: number;
  downRightY: number;
  beginWidth: number;
  margin: number;
  firstOffsetY: number;
  beginShapesBeforeRotate = [];
  beginMaskingBeforeRotate = [];
  beginRotateDegreeBeforeRotate = 0;
  rotateDegree = 0;
  pointMaskings = [];
  coordinatesMasking = [];
  blankHeight = 0;
  iphoneRotate = 0;
  user_no = localStorage.getItem('user_no');
  urlAPI = environment.apiUrl;
  numberZoomIn = 1.2;
  numberZoomOut = 0.8;
  numberZoom = 1;

  listPointCrop = [];
  fileExtention = '';
  isIos = false;
  //#endregion
  
  constructor(
    public commonService: CommonService,
    public httpService: HttpService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(translate, 'shouken-list');
  }

  ngOnInit() {
    if (
      localStorage.getItem('url-before-detail').includes('falseInfo') || 
      localStorage.getItem('url-before-detail').includes('relation') || 
      localStorage.getItem('url-before-detail').includes('insurance-contract')
    ) {
      this.enableBackToList = true;
    } else {
      this.enableButton = true;
      this.enableGoToRotate = true;
      this.enableGoToCrop = true;
      this.enableGoToMasking = true;
      this.enableBackToList = true;
      this.enableAccept = true;
    }
  }

  ngAfterViewInit() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const random = Math.floor((Math.random() * 100000) + 1);

    this.groupId = this.route.snapshot.params['id1'];
    this.fileId = this.route.snapshot.params['id2'];
    this.status = this.route.snapshot.params['status'];
    
    this.beginWidth = document.getElementById('inner').clientWidth;

    if (this.status === 'true') {
      if (this.groupId.toString() !== '0') {
        this.src = this.urlAPI + 'api/getFileImg?group_id=' + this.groupId + '&file_id=' + this.fileId + '&token=' + this.token + '&' + random;
      }
      else {
        let lsFileTemp = JSON.parse(localStorage.getItem("listFileNameTemp"));
        for (let i = 0; i < lsFileTemp.length; i++) {
          if (lsFileTemp[i].id === this.fileId) {
            this.fileExtention = lsFileTemp[i].fileName.split('.').pop();
            this.src = this.urlAPI + 'api/getFileImgTemp?file_name=' + lsFileTemp[i].fileName.substring(2, lsFileTemp[i].fileName.length) + '&token=' + this.token + '&' + random;
            break;
          }
        }
      }
      
      this.img = new Image();
      this.toDataURL(this.src, this, function(dataUrl, _cpn) {
        let imageUrl = dataUrl.replace('data:text/xml;base64', 'data:image/png;base64');
        _cpn.img.src = imageUrl;
      });

      this.img.onload = () => {
        EXIF.getData(this.img, () => {
          this.orientation = EXIF.getTag(this.img, 'Orientation');

          this.widthImage = this.img.width;
          this.heightImage = this.img.height;
          this.realWidth = this.img.width;
          this.realHeight = this.img.height;
          this.initCanvas();
          
          if (this.orientation === 1) {
            this.iphoneRotate = 0;
          }
          if (this.orientation === 6) {
            this.iphoneRotate = 90;
            this.rotateRightImage();
            const BB = this.canvas.getBoundingClientRect();
            this.offsetX = BB.left;
            this.offsetY = BB.top;
          }
          if (this.orientation === 3) {
            this.iphoneRotate = 180;
            this.rotateRightImage();
            this.rotateRightImage();
          }
          if (this.orientation === 8) {
            this.iphoneRotate = 270;
            this.rotateLeftImage();
            const BB = this.canvas.getBoundingClientRect();
            this.offsetX = BB.left;
            this.offsetY = BB.top;
          }
        });
      };
      this.callApigetImageDetail(Number(this.groupId), Number(this.fileId));
    }

    //#region view file relation -----------------------------------------------------------------------
    if (this.status === 'false') {
      this.enableButton = false;
      this.src = this.urlAPI + 'api/getFileRelation?user_no=' + this.groupId + '&file_name=' + this.fileId + '&token=' + this.token + '&' + random;
      this.img = new Image();
      this.img.src = this.src;
      this.img.onload = () => {
        this.widthImage = this.img.width;
        this.heightImage = this.img.height;
        this.realWidth = this.img.width;
        this.realHeight = this.img.height;
        this.initCanvas();
      };
      this.headerTitle = '関連画像表示';
    }
    //#endregion
  }

  onResize(event: any) {
    if (this.beginWidth !== document.getElementById('contents').clientWidth) {
      this.beginWidth = document.getElementById('contents').clientWidth;
      if (document.getElementById('contents').clientWidth < 600) {
        this.enablePolygon = false;
        this.isCropDone = false;
        this.initImage();
        this.getMarginOfCanvas();
        this.setSizeCanvas();
        this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
        const BB = this.canvas.getBoundingClientRect();
        this.offsetX = BB.left;
        this.offsetY = BB.top;
        this.context.drawImage(this.img, 0, 0, this.widthImage, this.heightImage);
        
        this.resolveOrientation();
      } else {
        const BB = this.canvas.getBoundingClientRect();
        this.offsetX = BB.left;
        this.offsetY = BB.top;
      }
    }
  }

  initCanvas(): void {
    this.initImage();
    this.getMarginOfCanvas();
    this.setSizeCanvas();
    this.createContext();
  }

  initImage() {
    let clientWidth = document.getElementById('inner').clientWidth;
    // change width in size mobile
    if (clientWidth > 1000) {
      clientWidth = 600;
    }
    if (clientWidth < 1000 && clientWidth > 350) {
      clientWidth = clientWidth - 40;
    }
    if (clientWidth <= 320) {
      clientWidth = clientWidth - 60;
    }
    // create miniature in 2 case
    if (this.realWidth >= this.realHeight) {
      this.divSize = clientWidth;
      this.miniature = this.divSize / this.realWidth;
      this.widthImage = this.divSize;
      this.heightImage = this.realHeight * this.miniature;
      this.dynamicWidth = this.widthImage;
      this.dynamicHeight = this.heightImage;
    } else {
      this.divSize = clientWidth;
      this.miniature = this.divSize / this.realHeight;
      this.heightImage = this.divSize;
      this.widthImage = this.realWidth * this.miniature;
      this.dynamicWidth = this.widthImage;
      this.dynamicHeight = this.heightImage;
    }
  }

  getMarginOfCanvas() {
    if (this.realWidth >= this.realHeight) {
      this.margin = Math.round((this.divSize - this.realHeight * this.miniature) / 2);
      if (this.rotateDegree === 0 || this.rotateDegree === 180) {
        this.blankHeight = this.margin;
      } else {
        this.blankHeight = 0;
      }
    } else {
      this.margin = Math.round((this.divSize - this.realHeight * this.miniature) / 2);
      if (this.rotateDegree === 90 || this.rotateDegree === 270) {
        this.blankHeight = this.margin;
      } else {
        this.blankHeight = 0;
      }
    }
  }

  setSizeCanvas(): void {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = this.dynamicWidth;
    this.canvas.height = this.dynamicHeight;
  }

  createContext() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    const BB = this.canvas.getBoundingClientRect();
    this.offsetX = BB.left;
    this.offsetY = BB.top;
    this.calculateOffsetY();
    this.firstOffsetY = this.offsetY;
    this.context.drawImage(this.img, 0, 0, this.widthImage, this.heightImage);
  }

  calculateOffsetY() {
    if (this.canvas.width > this.canvas.height) {
      this.offsetY = this.offsetY + this.margin;
    }
    if (this.canvas.width < this.canvas.height) {
      this.offsetY = this.offsetY - this.margin;
    }
  }

  rotateRightImage() {
    if (this.shapes.length > 0) {
        const listCircle0 = this.changePositionToRotate0(true, this.shapes);
        this.shapes = listCircle0;
    }
    if (this.maskings.length > 0) {
        const listMarsking0 = [];
        for (let i = 0; i < this.maskings.length; i++) {
          listMarsking0.push(this.changePositionToRotate0(false, this.maskings[i]));
        }
        this.maskings = listMarsking0;
    }
    this.rotateDegree += 90;
    if (this.rotateDegree > 270) {
      this.rotateDegree = 0;
    }
    this.getMarginOfCanvas();
    this.changeWidthHeight();
    this.setSizeCanvas();
    this.rotateImage();
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    const BB = this.canvas.getBoundingClientRect();
    this.offsetX = BB.left;
    this.offsetY = BB.top;
    this.calculateOffsetY();
    if (this.shapes.length > 0 ) {
      if (this.rotateDegree !== 0) {
        const listCircle = this.changePositionWhenRotateFrom0(true, this.shapes);
        this.shapes = listCircle;
      }
      this.mapDataBox();
      this.reDrawMasking(1);
    }
    if (this.maskings.length > 0) {
      if (this.rotateDegree !== 0) {
        const listMasking = [];
        for (let i = 0; i < this.maskings.length; i++) {
          listMasking.push(this.changePositionWhenRotateFrom0(false, this.maskings[i]));
        }
        this.maskings = listMasking;
      }
      for (let i = 0; i < this.maskings.length; i++) {
        this.drawRect(this.maskings[i]);
      }
    }
  }

  changePositionToRotate0(isCircle: boolean, shapes: any) {
    if (isCircle) {
      const shapesRotate = [];
      if (this.rotateDegree === 0) {
        shapesRotate.push({
          x: shapes[0].x,
          y: shapes[0].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[1].x,
          y: shapes[1].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[2].x,
          y: shapes[2].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[3].x,
          y: shapes[3].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }
      if (this.rotateDegree === 90) {
        shapesRotate.push({
          x: shapes[1].y,
          y: this.canvas.width - shapes[1].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[2].y,
          y: this.canvas.width - shapes[2].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[3].y,
          y: this.canvas.width - shapes[3].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[0].y,
          y: this.canvas.width - shapes[0].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }
      if (this.rotateDegree === 270) {
        shapesRotate.push({
          x: this.canvas.height - shapes[3].y,
          y: shapes[3].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.height - shapes[0].y,
          y: shapes[0].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.height - shapes[1].y,
          y: shapes[1].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.height - shapes[2].y,
          y: shapes[2].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }

      if (this.rotateDegree === 180) {
        shapesRotate.push({
          x: this.canvas.width - shapes[2].x,
          y: this.canvas.height - shapes[2].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[3].x,
          y: this.canvas.height - shapes[3].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[0].x,
          y: this.canvas.height - shapes[0].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[1].x,
          y: this.canvas.height - shapes[1].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }
    } else {
      if (this.rotateDegree === 0) {
        let shapesRotate;
        shapesRotate = {
          x: shapes.x,
          y: shapes.y,
          width: shapes.width, height: shapes.height, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
      if (this.rotateDegree === 90) {
        let shapesRotate;
        shapesRotate = {
          x: shapes.y,
          y: this.canvas.width - shapes.x - shapes.width,
          width: shapes.height, height: shapes.width, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
      if (this.rotateDegree === 270) {
        let shapesRotate;
        shapesRotate = {
          x: this.canvas.height - shapes.y - shapes.height,
          y: shapes.x,
          width: shapes.height, height: shapes.width, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
      if (this.rotateDegree === 180) {
        let shapesRotate;
        shapesRotate = {
          x: this.canvas.width - shapes.x - shapes.width,
          y: this.canvas.height - shapes.y - shapes.height,
          width: shapes.width, height: shapes.height, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
    }

  }

  changeWidthHeight() {
    const temp = this.dynamicWidth;
    this.dynamicWidth = this.dynamicHeight;
    this.dynamicHeight = temp;
  }

  rotateImage() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate(this.rotateDegree * Math.PI / 180);
    this.context.drawImage(this.img, -this.widthImage / 2, -this.heightImage / 2, this.widthImage, this.heightImage);
    this.context.restore();
  }

  changePositionWhenRotateFrom0(isCircle: boolean, shapes: any) {
    if (isCircle) {
      const shapesRotate = [];
      if (this.rotateDegree === 90) {
        shapesRotate.push({
          x: this.canvas.width - shapes[3].y,
          y: shapes[3].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[0].y,
          y: shapes[0].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[1].y,
          y: shapes[1].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[2].y,
          y: shapes[2].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }
      if (this.rotateDegree === 270) {
        shapesRotate.push({
          x: shapes[1].y,
          y: this.canvas.height - shapes[1].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[2].y,
          y: this.canvas.height - shapes[2].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[3].y,
          y: this.canvas.height - shapes[3].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: shapes[0].y,
          y: this.canvas.height - shapes[0].x,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }

      if (this.rotateDegree === 180) {
        shapesRotate.push({
          x: this.canvas.width - shapes[2].x,
          y: this.canvas.height - shapes[2].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[3].x,
          y: this.canvas.height - shapes[3].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[0].x,
          y: this.canvas.height - shapes[0].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        shapesRotate.push({
          x: this.canvas.width - shapes[1].x,
          y: this.canvas.height - shapes[1].y,
          r: 5,
          fill: 'red', isDragging: false
        });
        return shapesRotate;
      }
    } else {
      if (this.rotateDegree === 90) {
        let shapesRotate;
        shapesRotate = {
          x: this.canvas.width - shapes.y - shapes.height,
          y: shapes.x,
          width: shapes.height, height: shapes.width, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
      if (this.rotateDegree === 270) {
        let shapesRotate;
        shapesRotate = {
          x: shapes.y,
          y: this.canvas.height - shapes.x - shapes.width,
          width: shapes.height, height: shapes.width, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
      if (this.rotateDegree === 180) {
        let shapesRotate;
        shapesRotate = {
          x: this.canvas.width - shapes.x - shapes.width,
          y: this.canvas.height - shapes.y - shapes.height,
          width: shapes.width, height: shapes.height, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        };
        return shapesRotate;
      }
    }

  }

  mapDataBox() {
    this.boxUpLeft = this.shapes[0];
    this.boxUpRight = this.shapes[1];
    this.boxDownRight = this.shapes[2];
    this.boxDownLeft = this.shapes[3];
  }

  reDrawMasking(opacity: number) {
    this.context.globalAlpha = opacity;
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.boxUpLeft.x, this.boxUpLeft.y);
    this.context.lineTo(this.boxDownLeft.x, this.boxDownLeft.y);
    this.context.lineTo(0, this.canvas.height);
    if (opacity === 1) {
      this.context.strokeStyle = 'white';
      this.context.stroke();
    }
    this.context.fillStyle = 'white';
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.boxUpLeft.x, this.boxUpLeft.y);
    this.context.lineTo(this.boxUpRight.x, this.boxUpRight.y);
    this.context.lineTo(this.canvas.width, 0);
    if (opacity === 1) {
      this.context.strokeStyle = 'white';
      this.context.stroke();
    }
    this.context.fillStyle = 'white';
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(this.canvas.width, 0);
    this.context.lineTo(this.boxUpRight.x, this.boxUpRight.y);
    this.context.lineTo(this.boxDownRight.x, this.boxDownRight.y);
    this.context.lineTo(this.canvas.width, this.canvas.height);
    if (opacity === 1) {
      this.context.strokeStyle = 'white';
      this.context.stroke();
    }
    this.context.fillStyle = 'white';
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(this.canvas.width, this.canvas.height);
    this.context.lineTo(this.boxDownRight.x, this.boxDownRight.y);
    this.context.lineTo(this.boxDownLeft.x, this.boxDownLeft.y);
    this.context.lineTo(0, this.canvas.height);
    if (opacity === 1) {
      this.context.strokeStyle = 'white';
      this.context.stroke();
    }
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.globalAlpha = 1.0;
  }

  drawRect(r) {
    this.context.fillStyle = r.fill;
    this.context.fillRect(r.x, r.y, r.width, r.height);
  }

  close() {
    const url = localStorage.getItem('url-before-detail');
    this.router.navigate([url]);
  }

  zoomIn(zNumber?) {
    if (this.numberZoom > 2) {
      return;
    }
    if (typeof zNumber !== 'undefined') {
      this.dynamicWidth = this.canvas.width * zNumber;
      this.dynamicHeight = this.canvas.height * zNumber;
      this.numberZoom = this.numberZoom * zNumber;
    }
    else {
      this.dynamicWidth = this.canvas.width * this.numberZoomIn;
      this.dynamicHeight = this.canvas.height * this.numberZoomIn;
      this.numberZoom = this.numberZoom * this.numberZoomIn;
    }
    
    this.setSizeCanvas();

    if (this.rotateDegree === 0 || this.rotateDegree === 180) {
      this.widthImage = this.canvas.width;
      this.heightImage = this.canvas.height;
    } else {
      this.widthImage = this.canvas.height;
      this.heightImage = this.canvas.width;
    }
    if (typeof zNumber !== 'undefined') {
      this.miniature = this.miniature * zNumber;
    }
    else {
      this.miniature = this.miniature * this.numberZoomIn;
    }

    this.rotateImage();

    if (this.shapes.length) {
      for (let i = 0; i < this.shapes.length; i++) {
        const circle = this.shapes[i];
        if (typeof zNumber !== 'undefined') {
          circle.x = circle.x * zNumber;
          circle.y = circle.y * zNumber;
        }
        else {
          circle.x = circle.x * this.numberZoomIn;
          circle.y = circle.y * this.numberZoomIn;
        }
      }
      this.draw();
      if (this.enableCrop) {
        this.mapDataBox();
        this.reDrawFrame();
        this.reDrawMasking(0.7);
      }
    }
    
    if (this.maskings.length > 0) {
      for (let i = 0; i < this.maskings.length; i++) {
        const mask = this.maskings[i];
        if (typeof zNumber !== 'undefined') {
          mask.x = mask.x * zNumber;
          mask.y = mask.y * zNumber;
          mask.width = mask.width * zNumber;
          mask.height = mask.height * zNumber;
        }
        else {
          mask.x = mask.x * this.numberZoomIn;
          mask.y = mask.y * this.numberZoomIn;
          mask.width = mask.width * this.numberZoomIn;
          mask.height = mask.height * this.numberZoomIn;
        }
      }
      this.draw();
      if (this.enableCrop) {
        this.mapDataBox();
        this.reDrawFrame();
        this.reDrawMasking(0.7);
      }
    }
  }

  acceptCrop(): void {
    this.croped = true;
    this.enableCrop = false;
    this.enableBackToImage = false;
    this.enableGoToRotate = true;
    this.enableGoToCrop = true;
    this.enableGoToMasking = true;
    this.enableBackToList = true;
    this.enableAccept = true;
    
    this.acceptEdit();

    if (this.listPointCrop.length > 0) {
      let canvas: any;
      try {
        canvas = fx.canvas();
      } catch (e) {
        alert(e);
        return;
      }
      
      // convert the image to a texture
      const image = new Image();
      image.src = this.img.src;
      image.onload = () => {
        const texture = canvas.texture(image);

        EXIF.getData(this.img, () => {
          if (this.isIos) {
            canvas.draw(texture).perspective(
              this.listPointCrop,
              [
                0, this.realHeight,
                this.realWidth, this.realHeight, 
                0,0,
                this.realWidth, 0
              ]
            ).update();
          }
          else {
            canvas.draw(texture).perspective(
              this.listPointCrop,
              [0, 0, this.realWidth, 0, 0, this.realHeight, this.realWidth, this.realHeight]
            ).update();
          }
        });
        // apply the perspective filter
        const imageRedraw = new Image();
        this.img.src = canvas.toDataURL('image/png');
        imageRedraw.src = canvas.toDataURL('image/png');
        imageRedraw.onload = () => {
          let context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
          EXIF.getData(this.img, () => {
            context.drawImage(imageRedraw, 0, 0, this.widthImage, this.heightImage);
            this.reDrawMasking(1);
            this.draw();
  
            this.shapes = [];

            this.resolveOrientation();
          });
        }
      }
    }
  }

  goToRotate(): void {
    this.beginRotateDegreeBeforeRotate = this.rotateDegree;
    this.beginShapesBeforeRotate = this.shapes;
    this.beginMaskingBeforeRotate = this.maskings;
    this.enableRotate = true;
    this.enableBackToImage = true;
    this.enableGoToRotate = false;
    this.enableGoToCrop = false;
    this.enableGoToMasking = false;
    this.enableBackToList = false;
    this.enableAccept = false;
  }

  acceptRotate(): void {
    this.enableRotate = false;
    this.enableBackToImage = false;
    this.enableGoToRotate = true;
    this.enableGoToCrop = true;
    this.enableGoToMasking = true;
    this.enableBackToList = true;
    this.enableAccept = true;
  }

  goToCrop(): void {
    this.enableCrop = true;
    this.enableBackToImage = true;
    this.enableGoToRotate = false;
    this.enableGoToCrop = false;
    this.enableGoToMasking = false;
    this.enableBackToList = false;
    this.enableAccept = false;
    this.rotateImage();
    this.drawCirclePolygon();
  }

  toDataURL(url, cpn, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result, cpn);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  goToMasking(): void {
    if (!this.croped) {
      
      this.initCircle();
      
      this.shapes[0].x = 0;
      this.shapes[0].y = 0;
      this.shapes[1].x = this.canvas.width;
      this.shapes[1].y = 0;
      this.shapes[2].x = this.canvas.width;
      this.shapes[2].y = this.canvas.height;
      this.shapes[3].x = 0;
      this.shapes[3].y = this.canvas.height;
      
      this.mapDataBox();
      this.rotateImage();
      this.draw();
      this.mapDataBox();
      //this.reDrawFrame();
      this.reDrawMasking(0.7);
    }
    
    this.enableMasking = true;
    this.enableBackToImage = true;
    this.enableGoToRotate = false;
    this.enableGoToCrop = false;
    this.enableGoToMasking = false;
    this.enableBackToList = false;
    this.enableAccept = false;
  }

  acceptMasking() {
    for (let i = 0; i < this.maskings.length; i++) {
      const s = this.maskings[i];
      s.enablePoint = false;
      this.draw();
    }
    this.enableMasking = false;
    this.enableBackToImage = false;
    this.enableGoToRotate = true;
    this.enableGoToCrop = true;
    this.enableGoToMasking = true;
    this.enableBackToList = true;
    this.enableAccept = true;
  }

  zoomOut() {
    if (this.numberZoom < 0.11) {
      return;
    }
    this.dynamicWidth = this.canvas.width * this.numberZoomOut;
    this.dynamicHeight = this.canvas.height * this.numberZoomOut;
    this.numberZoom = this.numberZoom * this.numberZoomOut;
    this.setSizeCanvas();
    if (this.rotateDegree === 0 || this.rotateDegree === 180) {
      this.widthImage = this.canvas.width;
      this.heightImage = this.canvas.height;
    } else {
      this.widthImage = this.canvas.height;
      this.heightImage = this.canvas.width;
    }
    this.miniature = this.miniature * this.numberZoomOut;
    this.rotateImage();
    if (this.shapes.length) {
      for (let i = 0; i < this.shapes.length; i++) {
        const circle = this.shapes[i];
        circle.x = circle.x * this.numberZoomOut;
        circle.y = circle.y * this.numberZoomOut;
      }
      this.draw();
      if (this.enableCrop) {
        this.mapDataBox();
        this.reDrawFrame();
        this.reDrawMasking(0.7);
      }
    }

    if (this.maskings.length > 0) {
      for (let i = 0; i < this.maskings.length; i++) {
        const mask = this.maskings[i];
        mask.x = mask.x * this.numberZoomOut;
        mask.y = mask.y * this.numberZoomOut;
        mask.width = mask.width * this.numberZoomOut;
        mask.height = mask.height * this.numberZoomOut;
      }
      this.draw();
      if (this.enableCrop) {
        this.mapDataBox();
        this.reDrawFrame();
        this.reDrawMasking(0.7);
      }
    }
  }

  /**
   *set value for rotateDegree when rotate left and rotate image
   *
   * @memberof ShoukenDetailComponent
   */
  rotateLeftImage() {
    if (this.shapes.length > 0) {
      if (this.rotateDegree !== 0) {
        const listCircle0 = this.changePositionToRotate0(true, this.shapes);
        this.shapes = listCircle0;
      }
    }
    if (this.maskings.length > 0) {
      if (this.rotateDegree !== 0) {
        const listMarsking0 = [];
        for (let i = 0; i < this.maskings.length; i++) {
          listMarsking0.push(this.changePositionToRotate0(false, this.maskings[i]));
        }
        this.maskings = listMarsking0;
      }
    }
    if (this.rotateDegree === 0) {
      this.rotateDegree = 360;
    }
    this.rotateDegree = this.rotateDegree - 90;
    this.getMarginOfCanvas();
    this.changeWidthHeight();
    this.setSizeCanvas();
    this.rotateImage();
    const BB = this.canvas.getBoundingClientRect();
    this.offsetX = BB.left;
    this.offsetY = BB.top;
    this.calculateOffsetY();
    if (this.shapes.length > 0 ) {
      if (this.rotateDegree !== 0) {
        const listCircle = this.changePositionWhenRotateFrom0(true, this.shapes);
        this.shapes = listCircle;
      } else {
        const listCircle = this.changePositionToRotate0(true, this.shapes);
        this.shapes = listCircle;
      }
      this.mapDataBox();
      this.reDrawMasking(1);
    }
    if (this.maskings.length > 0) {
      if (this.rotateDegree !== 0) {
        const listMasking = [];
        for (let i = 0; i < this.maskings.length; i++) {
          listMasking.push(this.changePositionWhenRotateFrom0(false, this.maskings[i]));
        }
        this.maskings = listMasking;
      } else {
        const listMarsking0 = [];
        for (let i = 0; i < this.maskings.length; i++) {
          listMarsking0.push(this.changePositionToRotate0(false, this.maskings[i]));
        }
        this.maskings = listMarsking0;
      }
      for (let i = 0; i < this.maskings.length; i++) {
        this.drawRect(this.maskings[i]);
      }
    }
  }

  /**
   * reset canvas and lag enable button when back to image
   *
   * @memberof ShoukenDetailComponent
   */
  backToImage() {
    if (this.enableRotate) {
      if (this.shapes.length === 0 && this.maskings.length === 0) {
        if (this.rotateDegree !== 180 && this.rotateDegree !== 0) {
          this.changeWidthHeight();
        }
        this.rotateDegree = 0;
        this.getMarginOfCanvas();
        this.setSizeCanvas();
        this.rotateImage();
        this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
        const BB = this.canvas.getBoundingClientRect();
        this.offsetX = BB.left;
        this.offsetY = BB.top;
        this.calculateOffsetY();
        this.acceptRotate();
      } else {
        if (((this.rotateDegree - this.beginRotateDegreeBeforeRotate) / 90) % 2 !== 0) {
          this.changeWidthHeight();
        }
        this.rotateDegree = this.beginRotateDegreeBeforeRotate;
        this.shapes = this.beginShapesBeforeRotate;
        this.maskings = this.beginMaskingBeforeRotate;
        this.getMarginOfCanvas();
        this.setSizeCanvas();
        this.rotateImage();
        this.mapDataBox();
        this.reDrawMasking(1);
        for (let i = 0; i < this.maskings.length; i++) {
          this.drawRect(this.maskings[i]);
        }
        this.acceptRotate();
        this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
        const BB = this.canvas.getBoundingClientRect();
        this.offsetX = BB.left;
        this.offsetY = BB.top;
        this.calculateOffsetY();
      }
    }
    if (this.enableCrop) {
      this.getMarginOfCanvas();
      this.setSizeCanvas();
      this.rotateImage();
      this.shapes = [];
      for (let i = 0; i < this.maskings.length; i++) {
        this.drawRect(this.maskings[i]);
      }
      this.enableCrop = false;
      this.enableBackToImage = false;
      this.enableGoToRotate = true;
      this.enableGoToCrop = true;
      this.enableGoToMasking = true;
      this.enableBackToList = true;
      this.enableAccept = true;
      this.croped = false;
    }

    if (this.enableMasking) {
      this.getMarginOfCanvas();
      this.setSizeCanvas();
      this.enableMasking = false;
      this.enableBackToImage = false;
      this.enableGoToRotate = true;
      this.enableGoToCrop = true;
      this.enableGoToMasking = true;
      this.enableBackToList = true;
      this.enableAccept = true;
      this.maskings = [];
      this.rotateImage();
      this.reDrawMasking(1);
      for (let i = 0; i < this.maskings.length; i++) {
        this.drawRect(this.maskings[i]);
      }
    }
    // this.maskings = [];
    // this.rotateDegree = 0;
    // this.enablePolygon = false;
    // this.enableMasking = false;
    // this.initImage();
    // this.getMarginOfCanvas();
    // this.setSizeCanvas();
    // this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    // const BB = this.canvas.getBoundingClientRect();
    // this.offsetX = BB.left;
    // this.offsetY = this.firstOffsetY;
    // this.context.drawImage(this.img, 0, 0, this.widthImage, this.heightImage);
  }

  /**
   * draw circle
   *
   * @param {*} c
   * @memberof ShoukenDetailComponent
   */
  drawCircle(c) {
    this.context.fillStyle = c.fill;
    this.context.beginPath();
    this.context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }

  /**
   * draw all point circle or all masking
   *
   * @memberof ShoukenDetailComponent
   */
  draw() {
    this.rotateImage();
    if (!this.enableMasking && this.enableCrop) {
      for (let i = 0; i < this.shapes.length; i++) {
        this.drawCircle(this.shapes[i]);
      }
    } else {
      //this.reDrawMasking(1);
      for (let i = 0; i < this.maskings.length; i++) {
        this.drawRect(this.maskings[i]);
      }
    }
  }

  /**
   * init array point circle of polygon crop
   *
   * @memberof ShoukenDetailComponent
   */
  initCircle() {
    this.shapes = [];
    this.shapes.push({ x: this.canvas.width / 5, y: this.canvas.height / 5, r: 5, fill: 'red', isDragging: false });
    this.shapes.push({ x: this.canvas.width - this.canvas.width / 5, y: this.canvas.height / 5, r: 5, fill: 'red', isDragging: false });
    this.shapes.push({
      x: this.canvas.width - this.canvas.width / 5,
      y: this.canvas.height - this.canvas.height / 5, r: 5, fill: 'red', isDragging: false
    });
    this.shapes.push({ x: this.canvas.width / 5, y: this.canvas.height - this.canvas.height / 5, r: 5, fill: 'red', isDragging: false });
  }

  /**
   * init array and draw point circle of masking rectangle
   *
   * @param {*} p
   * @memberof ShoukenDetailComponent
   */
  initPointMasking(p: any) {
    this.pointMaskings = [];
    this.pointMaskings.push({ x: p.x, y: p.y, r: 3, fill: 'red', isDragging: false });
    this.pointMaskings.push({ x: p.x + p.width, y: p.y, r: 3, fill: 'red', isDragging: false });
    this.pointMaskings.push({ x: p.x + p.width, y: p.y + p.height, r: 3, fill: 'red', isDragging: false });
    this.pointMaskings.push({ x: p.x, y: p.y + p.height, r: 3, fill: 'red', isDragging: false });
    for (let i = 0; i < this.pointMaskings.length; i++) {
      this.drawCircle(this.pointMaskings[i]);
    }
  }

  /**
   * redraw polygon crop
   *
   * @memberof ShoukenDetailComponent
   */
  reDrawFrame() {
    this.context.beginPath();
    this.context.moveTo(this.boxUpLeft.x, this.boxUpLeft.y);
    this.context.lineTo(this.boxUpRight.x, this.boxUpRight.y);
    this.context.lineTo(this.boxDownRight.x, this.boxDownRight.y);
    this.context.lineTo(this.boxDownLeft.x, this.boxDownLeft.y);
    this.context.lineTo(this.boxUpLeft.x, this.boxUpLeft.y);
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 1;
    this.context.stroke();
  }

  /**
   * create the first masking and draw it
   *
   * @memberof ShoukenDetailComponent
   */
  initMasking() {
    this.maskings.push({
      x: 0, y: 0, width: 100, height: 50, fill: 'black', isDragging: false, enablePoint: false,
      dragTL: false, dragTR: false, dragBL: false, dragBR: false
    });
    this.drawRect(this.maskings[0]);
  }

  /**
   * add new masking and draw it
   *
   * @memberof ShoukenDetailComponent
   */
  addMasking() {
    const lastIndex = this.maskings.length - 1;
    if (this.maskings[lastIndex].y + this.maskings[lastIndex].height + 60 < this.canvas.height) {
      this.maskings.push({
        x: this.maskings[lastIndex].x, y: this.maskings[lastIndex].y + this.maskings[lastIndex].height + 10,
        width: this.maskings[lastIndex].width, height: this.maskings[lastIndex].height, fill: 'black', isDragging: false, enablePoint: false,
        dragTL: false, dragTR: false, dragBL: false, dragBR: false
      });
    } else {
      if (this.maskings[lastIndex].x + this.maskings[lastIndex].width + 110 < this.canvas.width) {
        this.maskings.push({
          x: this.maskings[lastIndex].x + this.maskings[lastIndex].width + 10, y: this.maskings[0].y,
          width: this.maskings[lastIndex].width, height: this.maskings[lastIndex].height, fill: 'black', isDragging: false, enablePoint: false,
          dragTL: false, dragTR: false, dragBL: false, dragBR: false
        });
      }
    }
    this.drawRect(this.maskings[this.maskings.length - 1]);
  }

  /**
   * draw masking when click button
   *
   * @memberof ShoukenDetailComponent
   */
  drawMasking() {
    if (this.maskings.length === 0) {
      this.initMasking();
    } else {
      this.addMasking();
    }
  }

  /**
   *remove the last masking
   *
   * @memberof ShoukenDetailComponent
   */
  removeMasking() {
    this.maskings.pop();
    this.rotateImage();
    //this.reDrawMasking(1);
    for (let i = 0; i < this.maskings.length; i++) {
      this.drawRect(this.maskings[i]);
    }
  }

  /**
   * check position of mouse and point of masking close enough or not
   *
   * @param {*} p1
   * @param {*} p2
   * @returns
   * @memberof ShoukenDetailComponent
   */
  checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < 15;
  }

  /**
   * event when mouse up or touch end
   *
   * @param {*} e
   * @memberof ShoukenDetailComponent
   */
  myUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragok = false;
    this.dragPointMasking = false;
    // if enableMasking = false , disable drag when mouse up or touch end
    if (!this.enableMasking) {
      for (let i = 0; i < this.shapes.length; i++) {
        this.shapes[i].isDragging = false;
      }
    } else {
      // if enableMasking = true, disable drag 4 point of rectangle when mouse up or touch end
      for (let i = 0; i < this.maskings.length; i++) {
        this.maskings[i].dragTL = false;
        this.maskings[i].dragTR = false;
        this.maskings[i].dragBL = false;
        this.maskings[i].dragBR = false;
        if (this.maskings[i].enablePoint) {
          this.initPointMasking(this.maskings[i]);
        }
        this.maskings[i].isDragging = false;
      }
    }
  }

  /**
   * event when mouse down or touch start
   *
   * @param {*} e
   * @memberof ShoukenDetailComponent
   */
  myDown(e) {
    let mx, my;
    if (this.isMobile) {
      // get position of hand in mobile
      mx = Math.round(e.touches[0].clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
      my = Math.round(e.touches[0].clientY - $('canvas#vnext-editor').offset().top  + window.pageYOffset);
    } else {
      mx = Math.round(e.clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
      my = Math.round(e.clientY - $('canvas#vnext-editor').offset().top + window.pageYOffset);
    }
    this.dragok = false;
    this.dragPointMasking = false;
    if (!this.enableMasking) {
      // if enableMasking = false, can drag 4 point of polygon crop
      for (let i = 0; i < this.shapes.length; i++) {
        const s = this.shapes[i];
        const dx = s.x;
        const dy = s.y;
        let twoPointDistance = Math.sqrt(Math.pow((mx - dx), 2) + Math.pow((my - dy), 2));
        if (this.isMobile) { twoPointDistance -= 8; }
        // test if the mouse is inside this circle
        if (twoPointDistance <= s.r) {
          this.dragok = true;
          s.isDragging = true;
        }
      }
    } else {
      for (let i = 0; i < this.maskings.length; i++) {
        const s = this.maskings[i];
        // if enableMasking = true, can drag masking when mouse down in masking
        if (mx > s.x - 10 && mx < s.x + s.width + 10 && my > s.y - 10 && my < s.y + s.height + 10) {
          // change enablePoint = true, show 4 point of masking when mouse up
          s.enablePoint = true;
          this.dragok = true;
          this.maskingFocus = i;
          s.isDragging = true;
        } else {
          s.enablePoint = false;
          this.draw();
        }
        // check position of mouse close enough with point
        if (this.checkCloseEnough(mx, this.maskings[i].x) && this.checkCloseEnough(my, this.maskings[i].y)) {
          this.maskings[i].dragTL = true;
        } else if (this.checkCloseEnough(mx, this.maskings[i].x + this.maskings[i].width)
          && this.checkCloseEnough(my, this.maskings[i].y)) {
          this.maskings[i].dragTR = true;
        } else if (this.checkCloseEnough(mx, this.maskings[i].x)
          && this.checkCloseEnough(my, this.maskings[i].y + this.maskings[i].height)) {
          this.maskings[i].dragBL = true;
        } else if (this.checkCloseEnough(mx, this.maskings[i].x + this.maskings[i].width)
          && this.checkCloseEnough(my, this.maskings[i].y + this.maskings[i].height)) {
          this.maskings[i].dragBR = true;
        }
      }
      for (let i = 0; i < this.pointMaskings.length; i++) {
        const s = this.pointMaskings[i];
        const dx = s.x;
        const dy = s.y;
        let twoPointDistance = Math.sqrt(Math.pow((mx - dx), 2) + Math.pow((my - dy), 2));
        if (this.isMobile) { twoPointDistance -= 8; }
        // test if the mouse is inside this circle
        if (twoPointDistance <= s.r) {
          // cannot drag masking, only drag point of masking
          this.dragok = false;
          this.dragPointMasking = true;
          s.isDragging = true;
        }
      }
    }
    this.startX = mx;
    this.startY = my;
  }

  changePositionShape(arrayShape: any, dx: number, dy: number) {
    for (let i = 0; i < arrayShape.length; i++) {
      const s = arrayShape[i];
      if (s.isDragging) {
        s.x += dx;
        s.y += dy;
      }
      if (s.r) {
        s.width = 0;
        s.height = 0;
      }
      if (s.x >= this.canvas.width - s.width) {
        s.x = this.canvas.width - s.width;
        // s.isDragging = false;
      }
      if (s.y >= this.canvas.height - s.height) {
        s.y = this.canvas.height - s.height;
        // s.isDragging = false;
      }
      if (s.x < 0) {
        s.x = 0;
        // s.isDragging = false;
      }
      if (s.y < 0) {
        s.y = 0;
        // s.isDragging = false;
      }
    }
  }

  /**
   *event when mouse move or touch move
   *
   * @param {*} e
   * @memberof ShoukenDetailComponent
   */
  myMove(e) {
    if ((this.dragok && this.enableCrop) || (this.dragok && this.enableMasking)) {
      e.preventDefault();
      e.stopPropagation();
      let mx, my;
      if (this.isMobile) {
        // get position of hand in mobile
        mx = Math.round(e.touches[0].clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
        my = Math.round(e.touches[0].clientY - $('canvas#vnext-editor').offset().top  + window.pageYOffset);
      } else {
        mx = Math.round(e.clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
        my = Math.round(e.clientY - $('canvas#vnext-editor').offset().top + window.pageYOffset);
      }
      const dx = mx - this.startX;
      const dy = my - this.startY;
      if (!this.enableMasking) {
        this.changePositionShape(this.shapes, dx, dy);
        this.draw();
        this.startX = mx;
        this.startY = my;
        this.mapDataBox();
        this.reDrawFrame();
        this.reDrawMasking(0.7);
      } else {
        this.changePositionShape(this.maskings, dx, dy);
        this.draw();
        this.startX = mx;
        this.startY = my;
      }
    }
    if (this.dragPointMasking) {
      e.preventDefault();
      e.stopPropagation();
      let mx, my;
      if (this.isMobile) {
        // get position of hand in mobile
        mx = Math.round(e.touches[0].clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
        my = Math.round(e.touches[0].clientY - $('canvas#vnext-editor').offset().top  + window.pageYOffset);
      } else {
        mx = Math.round(e.clientX - $('canvas#vnext-editor').offset().left + window.pageXOffset);
        my = Math.round(e.clientY - $('canvas#vnext-editor').offset().top + window.pageYOffset);
      }
      const dx = mx - this.startX;
      const dy = my - this.startY;
      let i;
      // check flag = true, get point moving
      if (this.maskings[this.maskingFocus].dragTL) {
        i = 0;
      } else if (this.maskings[this.maskingFocus].dragTR) {
        i = 1;
      } else if (this.maskings[this.maskingFocus].dragBR) {
        i = 2;
      } else if (this.maskings[this.maskingFocus].dragBL) {
        i = 3;
      }
      // set new value of point in masking
      const s = this.pointMaskings[i];
      if (s.isDragging) {
        s.x += dx;
        s.y += dy;
      }
      if (s.x >= this.canvas.width - 10) {
        s.x = this.canvas.width - 10;
        this.pointMaskings[i].isDragging = false;
      }
      if (s.x < 10) {
        s.x = 10;
        this.pointMaskings[i].isDragging = false;
      }
      if (s.y >= this.canvas.height - 10) {
        s.y = this.canvas.height - 10;
        this.pointMaskings[i].isDragging = false;
      }
      if (s.y < 10) {
        s.y = 10;
        this.pointMaskings[i].isDragging = false;
      }
      // set new value of x, y, height, width of rect
      if (i === 0) {
        const widthIcre = this.maskings[this.maskingFocus].x - s.x;
        const heightIcre = this.maskings[this.maskingFocus].y - s.y;
        this.maskings[this.maskingFocus].x = s.x;
        this.maskings[this.maskingFocus].y = s.y;
        this.maskings[this.maskingFocus].width = this.maskings[this.maskingFocus].width + widthIcre;
        this.maskings[this.maskingFocus].height = this.maskings[this.maskingFocus].height + heightIcre;
      }
      if (i === 1) {
        const widthIcre = s.x - this.maskings[this.maskingFocus].x - this.maskings[this.maskingFocus].width;
        const heightIcre = this.maskings[this.maskingFocus].y - s.y;
        this.maskings[this.maskingFocus].y = s.y;
        this.maskings[this.maskingFocus].width = this.maskings[this.maskingFocus].width + widthIcre;
        this.maskings[this.maskingFocus].height = this.maskings[this.maskingFocus].height + heightIcre;
      }
      if (i === 2) {
        const widthIcre = s.x - this.maskings[this.maskingFocus].x - this.maskings[this.maskingFocus].width;
        const heightIcre = s.y - this.maskings[this.maskingFocus].y - this.maskings[this.maskingFocus].height;
        this.maskings[this.maskingFocus].width = this.maskings[this.maskingFocus].width + widthIcre;
        this.maskings[this.maskingFocus].height = this.maskings[this.maskingFocus].height + heightIcre;
      }
      if (i === 3) {
        const widthIcre = this.maskings[this.maskingFocus].x - s.x;
        const heightIcre = s.y - this.maskings[this.maskingFocus].y - this.maskings[this.maskingFocus].height;
        this.maskings[this.maskingFocus].x = s.x;
        this.maskings[this.maskingFocus].width = this.maskings[this.maskingFocus].width + widthIcre;
        this.maskings[this.maskingFocus].height = this.maskings[this.maskingFocus].height + heightIcre;
      }
      this.draw();
      this.startX = mx;
      this.startY = my;
    }
  }

  /**
   * draw circle point of polygon
   *
   * @memberof ShoukenDetailComponent
   */
  drawCirclePolygon() {
    this.enablePolygon = true;
    this.isCropDone = false;

    this.initCircle();
    /*
    if (this.shapes.length === 0) {
      this.initCircle();
    }
    */
    this.draw();
    this.mapDataBox();
    this.reDrawFrame();
    this.reDrawMasking(0.7);
  }

  acceptEdit() {
    if (this.shapes.length > 0 || this.maskings.length > 0) {
      this.mapDataBox();
      if (this.dynamicWidth >= this.dynamicHeight) {
        this.upLeftX = this.boxUpLeft.x;
        this.upLeftY = this.boxUpLeft.y;
        this.upRightX = this.boxUpRight.x;
        this.upRightY = this.boxUpRight.y;
        this.downLeftX = this.boxDownLeft.x;
        this.downLeftY = this.boxDownLeft.y;
        this.downRightX = this.boxDownRight.x;
        this.downRightY = this.boxDownRight.y;
      }
      if (this.dynamicWidth < this.dynamicHeight) {
        this.upLeftX = this.boxUpLeft.x;
        this.upLeftY = this.boxUpLeft.y;
        this.upRightX = this.boxUpRight.x;
        this.upRightY = this.boxUpRight.y;
        this.downLeftX = this.boxDownLeft.x;
        this.downLeftY = this.boxDownLeft.y;
        this.downRightX = this.boxDownRight.x;
        this.downRightY = this.boxDownRight.y;
      }
      this.setPosition(true, this.upLeftX, this.upLeftY, this.upRightX, this.upRightY,
        this.downLeftX, this.downLeftY, this.downRightX, this.downRightY);
      this.coordinatesMasking = [];
      /*
      for (let i = 0; i < this.maskings.length; i++) {
        const m = this.maskings[i];
        let upLeftX;
        let upLeftY;
        let upRightX;
        let upRightY;
        let downLeftX;
        let downLeftY;
        let downRightX;
        let downRightY;
        if (this.dynamicWidth >= this.dynamicHeight) {
          upLeftX = m.x;
          upLeftY = m.y;
          upRightX = m.x + m.width;
          upRightY = m.y;
          downLeftX = m.x;
          downLeftY = m.y + m.height;
          downRightX = m.x + m.width;
          downRightY = m.y + m.height;
        } else {
          upLeftX = m.x;
          upLeftY = m.y;
          upRightX = m.x + m.width;
          upRightY = m.y;
          downLeftX = m.x;
          downLeftY = m.y + m.height;
          downRightX = m.x + m.width;
          downRightY = m.y + m.height;
        }
        this.setPosition(false, upLeftX, upLeftY, upRightX, upRightY, downLeftX, downLeftY, downRightX, downRightY);
      }
      */
      //this.close();
    } else {
      //this.close();
    }
  }

  /**
   * set value of x, y when rotate image
   *
   * @param {*} upLeftX
   * @param {*} upLeftY
   * @param {*} upRightX
   * @param {*} upRightY
   * @param {*} downLeftX
   * @param {*} downLeftY
   * @param {*} downRightX
   * @param {*} downRightY
   * @memberof ShoukenDetailComponent
   */
  setPosition(isCrop: boolean, upLeftX, upLeftY, upRightX, upRightY, downLeftX, downLeftY, downRightX, downRightY) {
    let upLeft_x;
    let upLeft_y;
    let upRight_x;
    let upRight_y;
    let bottomLeft_x;
    let bottomLeft_y;
    let bottomRight_x;
    let bottomRight_y;
    if (this.rotateDegree === 0) {
        upLeft_x = Math.round(upLeftX / this.miniature);
        upLeft_y = Math.round(upLeftY / this.miniature);
        upRight_x = Math.round(upRightX / this.miniature);
        upRight_y = Math.round(upRightY / this.miniature);
        bottomLeft_x = Math.round(downLeftX / this.miniature);
        bottomLeft_y = Math.round(downLeftY / this.miniature);
        bottomRight_x = Math.round(downRightX / this.miniature);
        bottomRight_y = Math.round(downRightY / this.miniature);
    }
    if (this.rotateDegree === 90) {
        upLeft_x = Math.round(upRightY / this.miniature);
        upLeft_y = this.realHeight - Math.round(upRightX / this.miniature);
        upRight_x = Math.round(downRightY / this.miniature);
        upRight_y = this.realHeight - Math.round(downRightX / this.miniature);
        bottomLeft_x = Math.round(upLeftY / this.miniature);
        bottomLeft_y = this.realHeight - Math.round(upLeftX / this.miniature);
        bottomRight_x = Math.round(downLeftY / this.miniature);
        bottomRight_y = this.realHeight - Math.round(downLeftX / this.miniature);
    }
    if (this.rotateDegree === 180) {
        upLeft_x = this.realWidth - Math.round(downRightX / this.miniature);
        upLeft_y = this.realHeight - Math.round(downRightY / this.miniature);
        upRight_x = this.realWidth - Math.round(downLeftX / this.miniature);
        upRight_y = this.realHeight - Math.round(downLeftY / this.miniature);
        bottomLeft_x = this.realWidth - Math.round(upRightX / this.miniature);
        bottomLeft_y = this.realHeight - Math.round(upRightY / this.miniature);
        bottomRight_x = this.realWidth - Math.round(upLeftX / this.miniature);
        bottomRight_y = this.realHeight - Math.round(upLeftY / this.miniature);
    }
    if (this.rotateDegree === 270) {
        upLeft_x = this.realWidth - Math.round(downLeftY / this.miniature);
        upLeft_y = Math.round(downLeftX / this.miniature);
        upRight_x = this.realWidth - Math.round(upLeftY / this.miniature);
        upRight_y = Math.round(upLeftX / this.miniature);
        bottomLeft_x = this.realWidth - Math.round(downRightY / this.miniature);
        bottomLeft_y = Math.round(downRightX / this.miniature);
        bottomRight_x = this.realWidth - Math.round(upRightY / this.miniature);
        bottomRight_y = Math.round(upRightX / this.miniature);
    }
    let formData = [upLeft_x, upLeft_y, upRight_x, upRight_y, bottomLeft_x, bottomLeft_y, bottomRight_x, bottomRight_y];
    this.listPointCrop = formData;

    //this.setPositionIphone(isCrop, upLeft_x, upLeft_y, upRight_x, upRight_y, bottomLeft_x, bottomLeft_y, bottomRight_x, bottomRight_y);
  }

  setPositionIphone(isCrop: boolean, upLeftX, upLeftY, upRightX, upRightY, downLeftX, downLeftY, downRightX, downRightY) {
    let formData;
    if (this.iphoneRotate === 0) {
      const rotate = this.rotateDegree - this.iphoneRotate;
      formData = {
        group_id: Number(this.groupId),
        file_id: Number(this.fileId),
        rotate: rotate,
        upLeft_x: Math.round(upLeftX),
        upLeft_y: Math.round(upLeftY ),
        upRight_x: Math.round(upRightX),
        upRight_y: Math.round(upRightY),
        bottomLeft_x: Math.round(downLeftX),
        bottomLeft_y: Math.round(downLeftY),
        bottomRight_x: Math.round(downRightX),
        bottomRight_y: Math.round(downRightY)
      };
  }
    if (this.iphoneRotate === 90) {
      let rotate = this.rotateDegree - this.iphoneRotate;
      if (rotate === -90) {
        rotate = 270;
      }
      formData = {
        group_id: Number(this.groupId),
        file_id: Number(this.fileId),
        rotate: rotate,
        upLeft_x: this.realHeight - Math.round(downLeftY),
        upLeft_y: Math.round(downLeftX),
        upRight_x: this.realHeight - Math.round(upLeftY),
        upRight_y: Math.round(upLeftX),
        bottomLeft_x: this.realHeight - Math.round(downRightY),
        bottomLeft_y: Math.round(downRightX),
        bottomRight_x: this.realHeight - Math.round(upRightY),
        bottomRight_y: Math.round(upRightX),
      };
    }
    if (this.iphoneRotate === 180) {
      let rotate = this.rotateDegree - this.iphoneRotate;
      if (rotate === -90) {
        rotate = 270;
      }
      if (rotate === -180) {
        rotate = 180;
      }
      formData = {
        group_id: Number(this.groupId),
        file_id: Number(this.fileId),
        rotate: rotate,
        upLeft_x: this.realWidth - Math.round(downRightX),
        upLeft_y: this.realHeight - Math.round(downRightY),
        upRight_x: this.realWidth - Math.round(downLeftX),
        upRight_y: this.realHeight - Math.round(downLeftY),
        bottomLeft_x: this.realWidth - Math.round(upRightX),
        bottomLeft_y: this.realHeight - Math.round(upRightY),
        bottomRight_x: this.realWidth - Math.round(upLeftX),
        bottomRight_y: this.realHeight - Math.round(upLeftY),
      };
    }
    if (this.iphoneRotate === 270) {
      let rotate = this.rotateDegree - this.iphoneRotate;
      if (rotate === -270) {
        rotate = 90;
      }
      if (rotate === -180) {
        rotate = 180;
      }
      if (rotate === -270) {
        rotate = 90;
      }
      formData = {
        group_id: Number(this.groupId),
        file_id: Number(this.fileId),
        rotate: rotate,
        upLeft_x: Math.round(upRightY),
        upLeft_y: this.realWidth - Math.round(upRightX),
        upRight_x: Math.round(downRightY),
        upRight_y: this.realWidth - Math.round(downRightX),
        bottomLeft_x: Math.round(downLeftY),
        bottomLeft_y: this.realWidth - Math.round(downLeftX),
        bottomRight_x: Math.round(upLeftY),
        bottomRight_y: this.realWidth - Math.round(upLeftX),
      };
    }
    if (isCrop) {
      this.callApiUpdatePositionImage(formData);
    } else {
      this.coordinatesMasking.push(formData);
    }
  }

  /**
   * call API update area of polygon
   *
   * @param {*} formData
   * @memberof ShoukenDetailComponent
   */
  callApiUpdatePositionImage(formData: any) {
    if (this.groupId.toString() === "0") {
      let lsFileTemp = JSON.parse(localStorage.getItem("listFileNameTemp"));
      for (let i = 0; i < lsFileTemp.length; i++) {
        if (lsFileTemp[i].id === this.fileId) {
          lsFileTemp[i].editInfo = formData;
          break;
        }
      }
      localStorage.setItem('listFileNameTemp', JSON.stringify(lsFileTemp));
    }
    else {
      this.httpService.post(this.API_URLS.createArea, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.enableMasking = true;
          this.rotateImage();
          this.reDrawMasking(1);
        } else {
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    }
  }

  /**
   * call API get data detail of image
   *
   * @param {number} groupID
   * @param {number} fileID
   * @memberof ShoukenDetailComponent
   */
  callApigetImageDetail(groupID: number, fileID: number) {
    const imageID = {
      group_id: groupID,
      file_id: fileID
    };
    this.httpService.post(this.API_URLS.getFileUpload, imageID).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.headerTitle = res.data.MenuFileName;
        this.image = res.data;
        this.fileExtention = res.data.ImgFileName.split('.').pop();
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  disableDrag() {
    this.dragok = false;
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].isDragging = false;
    }
  }

  async doComplate() {
    $("#vnext-editor").hide();
    this.zoomIn(this.realWidth/$(this.canvas).width());
    let formData = new FormData();
    formData.append('group_id', this.groupId);
    formData.append('file_id', this.fileId);
    if (this.groupId.toString() !== '0') {
      formData.append('type', 'ROOT');
    }
    else {
      formData.append('type', 'TEMP');
      let lsFileTemp = JSON.parse(localStorage.getItem("listFileNameTemp"));
      for (let i = 0; i < lsFileTemp.length; i++) {
        if (lsFileTemp[i].id === this.fileId) {
          formData.append('file_name', lsFileTemp[i].fileName);
          break;
        }
      }
    }
    var blobBin = atob(this.canvas.toDataURL('image/' + this.fileExtention).split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {type: 'image/' + this.fileExtention});
    formData.append('file_img', file);

    let result = await this.commonService.editImage(formData);
    if (result.code === this.RESULT_CODE.success) {
      this.close();
    } else {
      console.log(result);
    }
  }

  resolveOrientation() {
    if (this.orientation === 1) {
      this.rotateDegree = 0;
    }
    if (this.orientation === 6) {
      this.rotateDegree = 90;
      this.rotateImage();
    }
    if (this.orientation === 3) {
      this.rotateDegree = 180;
      this.rotateImage();
    }
    if (this.orientation === 8) {
      this.rotateDegree = 270;
      this.rotateImage();
    }
  }
}