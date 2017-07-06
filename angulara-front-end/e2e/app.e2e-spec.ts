import { Ng2LaravelPage } from './app.po';

describe('ng2-laravel App', () => {
  let page: Ng2LaravelPage;

  beforeEach(() => {
    page = new Ng2LaravelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
