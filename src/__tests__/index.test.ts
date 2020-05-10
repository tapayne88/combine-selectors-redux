import * as topLevelExportedSelectors from "../__mocks__/topLevelExportedSelectors";
import { selectors as topLevelNamedSelectorsObject } from "../__mocks__/topLevelNamedSelectorsObject";
import { combineSelectors } from "..";

const localTestSelectors = {
  selector1: (state) => [state],
  selector2: (state, args) => [state, args],
  selector3: (state, arg1, arg2) => [state, arg1, arg2],
};

const numOfOwnProps = (obj) => Object.keys(obj).length;

describe("combineReducers", () => {
  const scenarios = {
    topLevelExportedSelectors,
    topLevelNamedSelectorsObject,
    localTestSelectors,
  };

  Object.keys(scenarios).forEach((key) => {
    describe(`with ${key}`, () => {
      const originalSelectors = scenarios[key];

      describe("calling combineSelectors", () => {
        const stateKey = "stateKey";
        const cs = combineSelectors({
          [stateKey]: originalSelectors,
        });

        it("should return an object with a top level key matching constructed", () => {
          expect(cs).toHaveProperty(stateKey);
        });
        it("should return the same number of keys as original selector", () => {
          expect(numOfOwnProps(cs[stateKey])).toEqual(
            numOfOwnProps(originalSelectors)
          );
        });
      });

      describe("calling combined selector with state after single combineSelectors call", () => {
        const stateKey = "stateKey";
        const state = {
          [stateKey]: [1, 2, 3],
        };

        const cs = combineSelectors({
          [stateKey]: originalSelectors,
        });

        Object.keys(originalSelectors).forEach((selectorKey) => {
          it(`should return the same as original selector on state subset [${selectorKey}]`, () => {
            const expected = originalSelectors[selectorKey](state[stateKey]);
            const actual = cs[stateKey][selectorKey](state);
            expect(actual).toEqual(expected);
          });
        });
      });

      describe("calling combined selector with state after multiple combineSelectors calls", () => {
        const stateKey1 = "stateKey1";
        const stateKey2 = "stateKey2";
        const state = {
          [stateKey1]: {
            [stateKey2]: [1, 2, 3],
          },
        };

        const cs = combineSelectors({
          [stateKey1]: combineSelectors({
            [stateKey2]: originalSelectors,
          }),
        });

        Object.keys(originalSelectors).forEach((selectorKey) => {
          it(`should return the same as original selector on state subset [${selectorKey}]`, () => {
            const expected = originalSelectors[selectorKey](
              state[stateKey1][stateKey2]
            );
            const actual = cs[stateKey1][stateKey2][selectorKey](state);
            expect(actual).toEqual(expected);
          });
        });
      });
    });
  });
});
