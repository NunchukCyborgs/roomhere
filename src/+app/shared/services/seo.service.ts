// $('.definition-table tbody.supertype tr th a').map(function(i, a) { return a.text})
import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isBrowser, isNode } from 'angular2-universal';

import { Property, Image } from '../dtos/property';
import { Tag, SingleFamilyResidence, PostalAddress, GeoCoordinates, Tags, RoomhereWebsite, createSchema } from '../dtos/seo';

@Injectable()
export class SeoService {
  public DESCRIPTION = `Roomhere is the rental property solution for ${DEFAULT_TENANT_PRETTY}, ${DEFAULT_STATE}. Find the most complete rental listings of the area at Roomhere.`;
  public TITLE = `${DEFAULT_TENANT_PRETTY} Apartments and Houses For Rent | RoomHere`;
  public IMAGE: Image = { url: BASE_URL + '/images/white_logo_transparent_background.png', height: '187', width: '240' };
  private _tags: Tag[] = [];

  public get tags(): Tag[] {
    return Object.assign([], this._tags);
  }

  public addBaseTags(renderer: Renderer) {
    this.addTags({}, renderer);
    this.setTitle(this.TITLE);
  }

  public prependTitle(title: string): void {
    this.document.title = `${title} | ${this.TITLE}`;
  }

  public setTitle(title: string): void {
    this.document.title = title;
  }

  public createTag(tag: Tag, renderer: Renderer): void {
    const existingTag = this.getExistingTag(tag).tag;
    const elem = this.getElement(tag, existingTag, renderer);

    if (!existingTag) {
      this.setAttributes(tag, elem, renderer);
      this._tags.push(Object.assign({}, tag, { element: elem }));
    }
  }

  public removeTag(tag: Tag) {
    const existingTagIndex = this.getExistingTag(tag).index;
    if (existingTagIndex > -1) {
      this._tags.splice(existingTagIndex, 1);
    }
  }

  public addTags(baseTags: Tags, renderer: Renderer): void {
    const tags: Tag[] = this.getTags(baseTags);

    for (let tag of tags) {
      this.createTag(tag, renderer)
    }

    if (baseTags.title) {
      this.prependTitle(baseTags.title);
    }
  }

  public updateTag(oldTag: Tag, newTag: Tag, renderer: Renderer) {
    const existingTag = this.getExistingTag(oldTag).tag = newTag;
    this.setAttributes(existingTag, existingTag.element, renderer);
  }

  public updateCanonTag(url: string, renderer: Renderer) {
    const existingTag = this.tags.find(tag => Boolean(tag.attributes.find(i => i.name === 'rel' && i.value === 'canonical')));
    const updatedTag = Object.assign({}, existingTag);
    updatedTag.attributes.find(i => i.name === 'href').value = `${BASE_URL}${url}`;
    this.updateTag(existingTag, updatedTag, renderer);
  }

  private getTags(tags: Tags): Tag[] {
    let {title, description, image} = Object.assign({}, { title: this.TITLE, description: this.DESCRIPTION, image: this.IMAGE }, tags);

    return [
      createSchema(new RoomhereWebsite()),
      { name: 'link', attributes: [{ name: 'rel', value: 'canonical' }, { name: 'href', value: BASE_URL }] },
      { name: 'meta', attributes: [{ name: 'name', value: 'description' }, { name: 'content', value: description }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:title' }, { name: 'content', value: title }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:type' }, { name: 'content', value: 'website' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:description' }, { name: 'content', value: description }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:url' }, { name: 'content', value: BASE_URL + this.router.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image' }, { name: 'content', value: image.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image:width' }, { name: 'content', value: image.width }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image:height' }, { name: 'content', value: image.height }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:card' }, { name: 'content', value: 'summary' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:site' }, { name: 'content', value: '@roomhere' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:image' }, { name: 'content', value: image.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:title' }, { name: 'content', value: title }] },
    ];
  }

  private setAttributes(tag: Tag, elem: any, renderer: Renderer) {
    for (let attr of tag.attributes) {
      renderer.setElementAttribute(elem, attr.name, attr.value);
    }

    if (tag.text) {
      renderer.setText(elem, tag.text);
    }
  }

  private getExistingTag(newTag: Tag): { tag: Tag, index: number } {
    const index = this._tags.findIndex(tag => {
      return tag.name === newTag.name && tag.text === newTag.text && newTag.attributes.every((kvp, index) => {
        return tag.attributes[index].name === kvp.name && tag.attributes[index].value === kvp.value
      })
    });

    return { tag: this._tags[index], index: index };
  }

  private getElement(tag: Tag, existingTag: Tag, renderer: Renderer): any {
    return (existingTag && existingTag.element) || renderer.createElement(this.document.head, tag.name)
  }

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {
  }
}
