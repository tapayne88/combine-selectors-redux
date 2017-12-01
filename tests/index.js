import * as topLevelExportedSelectors from "./__mocks__/topLevelExportedSelectors";
import { selectors as topLevelNamedSelectorsObject } from "./__mocks__/topLevelNamedSelectorsObject";
import { combineSelectors } from "../src/index";

const localTestSelectors = () => ({
  selector1: state => [state],
  selector2: (state, arg1) => [state, arg1],
  selector3: (state, arg1, arg2) => [state, arg1, arg2]
});

const numOfOwnProps = obj => Object.keys(obj).length;

describe("combineReducers", () => {
  describe("with topLevelExportedSelectors", () => {
    const originalSelectors = topLevelExportedSelectors;

    const stateKey = "stateKey";
    const combinedSelectors = combineSelectors({
      [stateKey]: originalSelectors
    });

    it("should return an object with a top level key matching constructed", () => {
      expect(combinedSelectors).toHaveProperty(stateKey);
    });
    it("should return the same number of keys as original selector", () => {
      expect(numOfOwnProps(combinedSelectors[stateKey])).toEqual(numOfOwnProps(originalSelectors));
    });

    describe("calling combined selector with state", () => {
      const stateKey = "stateKey";
      const state = {
        [stateKey]: [ 1, 2, 3 ]
      };

      const combinedSelectors = combineSelectors({ [stateKey]: originalSelectors });

      Object.keys(originalSelectors).forEach(selectorKey => {
        it(`should return the same as original selector on state subset [${selectorKey}]`, () => {
          const expected = originalSelectors[selectorKey](state[stateKey]);
          const actual = combinedSelectors[stateKey][selectorKey](state);
          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe("with topLevelNamedSelectorsObject", () => {
    const originalSelectors = topLevelNamedSelectorsObject;

    const stateKey = "stateKey";
    const combinedSelectors = combineSelectors({
      [stateKey]: originalSelectors
    });

    it("should return an object with a top level key matching constructed", () => {
      expect(combinedSelectors).toHaveProperty(stateKey);
    });
    it("should return the same number of keys as original selector", () => {
      expect(numOfOwnProps(combinedSelectors[stateKey])).toEqual(numOfOwnProps(originalSelectors));
    });

    describe("calling combined selector with state", () => {
      const stateKey = "stateKey";
      const state = {
        [stateKey]: [ 1, 2, 3 ]
      };

      const combinedSelectors = combineSelectors({ [stateKey]: originalSelectors });

      Object.keys(originalSelectors).forEach(selectorKey => {
        it(`should return the same as original selector on state subset [${selectorKey}]`, () => {
          const expected = originalSelectors[selectorKey](state[stateKey]);
          const actual = combinedSelectors[stateKey][selectorKey](state);
          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
