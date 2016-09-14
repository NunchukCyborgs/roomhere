import { Component, Input } from '@angular/core';
const ProgressBar = require('progressbar.js');

@Component({
  // moduleId: __filename,
  selector: 'upload-progress',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class UploadProgress {
  @Input() fileName: string;
  @Input() progress: number;

  public id: string;
  private progressBar: any;
  private _progress: number;

  ngOnInit() {
    this.id = `ProgressBar${this.fileName}`;
  }

  ngAfterViewInit() {
    this.progressBar = new ProgressBar.SemiCircle(`#${this.id}`, {
      strokeWidth: 6,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      svgStyle: null,
      from: { color: '#FFEA82' },
      to: { color: '#ED6A5A' },
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        var value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(value);
        }

        bar.text.style.color = state.color;
      },
    });

    this.progressBar.set(this.progress / 100.0);
  }
}
