import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { fromEvent } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap
} from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("input", { static: true }) input: ElementRef;
  constructor(private http: HttpClient) {}
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          console.log(event);
          console.log(this.input.nativeElement.value);
          this.http
            .get(
              `https://xxxxxxx/v1/metadata/validate-metadata-name?GroupID=${3}&MetadataName=${encodeURIComponent(
                this.input.nativeElement.value
              )}`
            )
            .subscribe(res => {
              console.log(res);
            });
        })
      )
      .subscribe();
  }
}
