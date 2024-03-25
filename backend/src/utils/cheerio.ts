import * as cheerio from 'cheerio';

class Dommer {
	private $: cheerio.Selector;
	constructor(private html: string) {
		this.html = html;
		this.$ = cheerio.load(this.html);
	}
	public getTitle() {
		return this.$('title').text();
	}
	public getImageByClassName(className: string) {
		return this.$(className).children().find('img').attr('src') ?? "";
	}
	public getElementLength(className: string) {
		return this.$(className).length;
	}
	public getFirstByTag(tag: string) {
		return this.$(tag).get(0).children[0].data;
	}
	public getArrayByTag(tag: string): cheerio.TagElement[] {
		return this.$(tag).children().toArray() as cheerio.TagElement[];
	}
	public getAttrByTag(tag: string) {
		return this.$(tag).attr();
	}
    public getSiteKey(){
        return this.$('div.g-recaptcha').attr('data-sitekey');
    }
    public getVideoSource(): cheerio.TagElement[]{
        return this.$('video').find('source').toArray() as cheerio.TagElement[];
    }
	public findByClasses(classes: string,attr: string) {
		return this.$(classes).attr(attr);
	}
}

export default Dommer;
