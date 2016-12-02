import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class StarRating {
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<any> = new EventEmitter();
  @Input() isEditable: boolean;
  @Input() maxRating: number;

  public stars: number[] = [];
  public hasBeenSet;

  ngOnInit() {
    this.hasBeenSet = !this.isEditable;
  }

  ngOnChanges(changes: any) {
    this.rating = this.rating || 0;
    this.maxRating = this.maxRating || 5;

    for (let i = 1; i <= this.maxRating; i++) {
      this.stars.push(i);
    }
  }

  public save(star: number) {
    if (this.isEditable) {
      this.hasBeenSet = true;
      this.ratingChange.emit(this.rating = star);
    }
  }

  public preview(star: number) {
    if (!this.hasBeenSet) {
      this.rating = star;
    }
  }
}
