import { mount, shallow } from "enzyme";
import SelectResultItem from "./SelectResultItem";

describe("Select Result Item", () => {
  it("Should render html elements", () => {
    const club = {
      _id: 1,
      clubLogo: "logo.png",
      clubName: "Spe",
      countryFlag: "country.png",
      leagueName: "league 1",
    };
    const wrapper = shallow(<SelectResultItem club={club} />);
    const div = wrapper.find(".selectResultChildDiv");
    const img = wrapper.find("img");
    const clubName = wrapper.find("h3");
    const leagueName = wrapper.find("h4");
    expect(div.length).toBe(2);
    expect(img.at(0).props().src).toEqual(club.clubLogo);
    expect(img.at(1).props().src).toEqual(club.countryFlag);
    expect(clubName.text()).toEqual(club.clubName);
    expect(leagueName.text()).toEqual(club.leagueName);
  });

  it("Should call itemSelected function on click", () => {
    const club = {
      _id: 1,
      clubLogo: "logo.png",
      clubName: "Spe",
      countryFlag: "country.png",
      leagueName: "league 1",
    };

    const itemSelected = jest.fn((id, logo, name) => {
      console.log("received");
    });

    const wrapper = shallow(
      <SelectResultItem itemSelected={itemSelected} club={club} />
    );

    const div = wrapper.find("#selectResultItemDiv");
    div.simulate("click");
    expect(itemSelected).toHaveBeenCalledWith(
      club._id,
      club.clubLogo,
      club.clubName
    );
  });
});
