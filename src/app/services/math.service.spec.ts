import { TestBed } from '@angular/core/testing';

import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService]
    });
    service = TestBed.get(MathService);
  });

  describe('should getCalcResultDisplay', () => {
    it('return calculation empty string from empty math expression', () => {
      expect(service.getCalcResultDisplay('')).toBe('');
    });

    it('return calculation result from math expression', () => {
      expect(service.getCalcResultDisplay('1 + 2')).toBe('3');
      expect(service.getCalcResultDisplay('10 - 2')).toBe('8');
      expect(service.getCalcResultDisplay('-2 * -2')).toBe('4');
      expect(service.getCalcResultDisplay('-2 / 2')).toBe('-1');
    });

    it('return calculation result from math expression with decimal', () => {
      expect(service.getCalcResultDisplay('.1 + .2')).toBe('0.3');
      expect(service.getCalcResultDisplay('2 - 0.10')).toBe('1.9');
      expect(service.getCalcResultDisplay('-.1 * -.1')).toBe('0.01');
      expect(service.getCalcResultDisplay('-.1 / 2')).toBe('-0.05');
    });

    it('return bad expression from invalid math expression', () => {
      expect(service.getCalcResultDisplay('1 + ')).toBe(MathService.BAD_EXP_STR);
      expect(service.getCalcResultDisplay('1 - ')).toBe(MathService.BAD_EXP_STR);
      expect(service.getCalcResultDisplay('1 * ')).toBe(MathService.BAD_EXP_STR);
      expect(service.getCalcResultDisplay('1 / ')).toBe(MathService.BAD_EXP_STR);
    });
  });
});
