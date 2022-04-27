import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NumberedPagination} from '../numberedPagination';
import { RulerFactoryOption } from '../rulerFactoryOption';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {
  maxPages:number; //lastpage
  index:number=1;//active pag
  @Input() totalItems:number;
  itemsPerPage: number=10;
  rulerLength: number=11;// pager on ruler (...)
  @Output() page: EventEmitter<number> = new EventEmitter<number>();
  pages:number[];


  constructor() {
   }
  
  ngOnInit(): void {
   
  }
  ngOnChanges(){
    console.log("Ukupno fiilmova:"+this.totalItems);
    this.maxPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages=new Array();
    for(let i=0;i<=this.maxPages-1;i++){
      this.pages.push(i+1);
    }
    console.log("pages : "+ this.pages);

    // if(this.maxPages<this.rulerLength){
    //   this.rulerLength=this.maxPages;
    //   this.navigateToPage(1);
     
    // }else if(this.maxPages>=this.rulerLength){
    //   this.rulerLength=11;
    //   this.navigateToPage(1);
    // }
    console.log("Ukupno stranice:"+this.maxPages);
  }
  navigateToPage(pageNumber: number): void {
    if (pageNumber !== this.index && pageNumber > 0 && pageNumber <= this.maxPages){
      this.index = pageNumber;
      this.page.emit(this.index);
      console.log(this.index);
    }
  }
  // get pagination(): NumberedPagination {
  //   const { index, maxPages, rulerLength } = this;
  //   const pages = ruler(index, maxPages, rulerLength);
  //   return { index, maxPages, pages } as NumberedPagination;
  // }
}

// const ruler = (
//   currentIndex: number,
//   maxPages: number,
//   rulerLength: number
// ): number[] => {
//   const array = new Array(rulerLength).fill(null);
//   const min = Math.floor(rulerLength / 2);

//   return array.map((_, index) =>
//     rulerFactory(currentIndex, index, min, maxPages, rulerLength)
//   );
// };
//   const rulerOption = (
//     currentIndex: number,
//     min: number,
//     maxPages: number
//   ): RulerFactoryOption => {
//     return currentIndex <= min
//       ? RulerFactoryOption.Start
//       : currentIndex >= maxPages - min
//       ? RulerFactoryOption.End
//       : RulerFactoryOption.Default;
//   };
  
//   const rulerFactory = (
//     currentIndex: number,
//     index: number,
//     min: number,
//     maxPages: number,
//     rulerLength: number
//   ): number => {
//     const factory = {
//       [RulerFactoryOption.Start]: () => index + 1,
//       [RulerFactoryOption.End]: () => maxPages - rulerLength + index + 1,
//       [RulerFactoryOption.Default]: () => currentIndex + index - min,
//     };
//     return factory[rulerOption(currentIndex, min, maxPages)]();
//   };