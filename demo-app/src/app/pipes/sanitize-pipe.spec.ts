import { SanitizePipe } from './sanitize-pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SanitizePipe', () => {
  it('create an instance', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
