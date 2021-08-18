import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TestPatternService } from '@libraries/redux/testpattern/testpattern.service';
import { ComponentLifetime } from '@libraries/utils/component-lifetime';
import { takeUntil } from 'rxjs/operators/';

@Component({
  selector: 'app-test-redux',
  templateUrl: './test-redux.component.html',
  styleUrls: ['./test-redux.component.css']
})
export class TestReduxComponent implements OnInit, OnDestroy {

  private _componentLifetime = new ComponentLifetime();

  componentresult: any[];
  proccessing: boolean = false;
  lastpage: boolean = false;

  minIndex: number = 0;
  rowAmount: number = 50;

  constructor(
    private _testPatternService: TestPatternService, 
    private _changeDetector: ChangeDetectorRef
  ) {
    this.componentresult = []
   }

  ngOnInit(): void {

    this._testPatternService.getTestCall$()
      .pipe(
        takeUntil(this._componentLifetime.isDestroyed$)
      )
      .subscribe(
        result => {
          if(result){
            console.log("Detected change for testCall in State, from component level", result);
            this.proccessing = false;
            this.componentresult = result
          } 
          this._changeDetector.markForCheck();
        }
    );

    this._testPatternService.getTestCallCount$()
      .pipe(
        takeUntil(this._componentLifetime.isDestroyed$)
      )
      .subscribe(
        result => {
          if(result){
            console.log("TestCall count increment detected: ", result);
            this._changeDetector.markForCheck();
          } 
        }
    );

    this._testPatternService.getTestCallFailedMessage$()
      .pipe(
        takeUntil(this._componentLifetime.isDestroyed$)
      )
      .subscribe(
        result => {
          if(result){
            console.log(result);
            this.proccessing = false;
            this._changeDetector.markForCheck();
          } 
        }
    );

  }

  ngOnDestroy() {
    this._componentLifetime.onDestroy();
  }

  startTestCall() {
    console.log("Start call");
    this.componentresult = [];
    this.proccessing = true;
    this._testPatternService.testCall();
  }

  Previous() {
    (this.minIndex-this.rowAmount >= 0) ? this.minIndex -= this.rowAmount : this.minIndex = 0;
    this.lastpage = false;
  }

  Next() {
    if(!this.lastpage){
      if(this.minIndex+this.rowAmount < this.componentresult.length) this.minIndex += this.rowAmount;
      else{
        this.minIndex += 1;
        this.lastpage = true;
      } 
    }
  }

  paginatedTable() {
    return this.componentresult.filter((item, index) => index > this.minIndex && index < this.minIndex+this.rowAmount )
  }

}
