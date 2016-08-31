import { Component, OnDestroy, Renderer, Inject, Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { BASE_URL } from '../config';
import { Property } from '../properties/index';

@Injectable()
export class SeoService {
  public addPropertyTags(property: Property): void {
    const description = `Check out this rental property at ${property.address1} on Roomhere.io!`;
    const title = `Roomhere.io property at ${property.address1}`;

    const tags: Array<{ key: string, value: string }> = [
      { key: 'description', value: description },
      { key: 'og:title', value: title},
      { key: 'og:type', value: 'website' },
      { key: 'og:description', value: description },
      { key: 'og:url', value: BASE_URL + this.router.url },
      { key: 'og:image', value: BASE_URL + property.images[0].url },
      { key: 'twitter:card', value: 'summary' },
      { key: 'twitter:site', value: '@roomhere' },
      { key: 'twitter:image', value: BASE_URL + property.images[0].url },
      { key: 'description', value: description },
      { key: 'twitter:title', value: title },
    ];

    for (let tag of tags) {
      const elem = this.renderer.createElement(this.document.head, 'meta');
      this.renderer.setElementAttribute(elem, tag.key, tag.value);
    }
  }


  constructor(
    private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT) private document: any
    ) {
  }
}