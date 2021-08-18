import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TestPatternService } from '@libraries/redux/testpattern/testpattern.service';

@Component({
  selector: 'app-test-redux',
  templateUrl: './test-redux.component.html',
  styleUrls: ['./test-redux.component.css']
})
export class TestReduxComponent implements OnInit {

  componentresult:any;
  proccessing: boolean = false;

  constructor(
    private _testPatternService: TestPatternService, 
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this._testPatternService.getTestCall$()
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
    .subscribe(
      result => {
        if(result){
          console.log("TestCall count increment detected: ", result);
          this._changeDetector.markForCheck();
        } 
      }
    );

    this._testPatternService.getTestCallFailedMessage$()
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

  startTestCall() {
    console.log("Start call");
    this.componentresult = null;
    this.proccessing = true;
    this._testPatternService.testCall();
  }

}
