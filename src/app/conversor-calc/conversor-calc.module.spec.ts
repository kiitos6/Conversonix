import { ConversorCalcModule } from './conversor-calc.module';

describe('ConversorCalcModule', () => {
  let conversorCalcModule: ConversorCalcModule;

  beforeEach(() => {
    conversorCalcModule = new ConversorCalcModule();
  });

  it('should create an instance', () => {
    expect(conversorCalcModule).toBeTruthy();
  });
});
