import { ConversorListModule } from './conversor-list.module';

describe('ConversorListModule', () => {
  let conversorListModule: ConversorListModule;

  beforeEach(() => {
    conversorListModule = new ConversorListModule();
  });

  it('should create an instance', () => {
    expect(conversorListModule).toBeTruthy();
  });
});
