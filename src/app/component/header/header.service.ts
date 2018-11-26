import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private set title(title: string) {
    this._title = title;
    this._titleEmitter.next(title);
  }

  get titleEmitter(): Observable<string> {
    return this._titleEmitter;
  }

  private _title = '';
  private _titleEmitter: Subject<string> = new Subject();

  private _image = '';
  private _imageEmitter: Subject<string> = new Subject();

  set image(image: string) {
    this._image = image;
    this._imageEmitter.next(image);
  }

  get imageEmitter(): Observable<string> {
    return this._imageEmitter;
  }

  constructor() { }


  setTitle(title: string) {
    this.title = title;
  }

  setImage(image: string) {
    this.image = image;
  }

  set(title: string, image: string) {
    this.image = image;
    this.title = title;
  }
}