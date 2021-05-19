import { mount } from "enzyme";
import SelectResults from "./SelectResults";

describe("Select Results Test", () => {
  it("should warn on not found", () => {
    const wrapper = mount(<SelectResults results={[]} />);
    const warning = wrapper.find("h3");
    expect(warning.text()).toEqual("Not Found");
  });

  it("should warn on error", () => {
    const wrapper = mount(<SelectResults />);
    const warning = wrapper.find("h3");
    expect(warning.text()).toEqual("Error");
  });

  it("should render result items", () => {
    const sampleResults = [
      {
        _id: "6095a9cb97f67c0508bb276a",
        clubName: "Trabzonspor",
        leagueName: "Turkish Süper Lig",
        countryName: "Turkey",
        clubLogo:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/clubLogo/Trabzonspor.png",
        countryFlag:
          "https://asefifaplayers.s3.eu-central-1.amazonaws.com/countryFlags/Turkey.png",
      },
    ];
    const wrapper = mount(<SelectResults results={sampleResults} />);
    const warning = wrapper.find("h3");
    const results = wrapper.find("SelectResultItem");
    expect(warning).toBeUndefined;
    expect(results.length).toBe(sampleResults.length);
  });
});
