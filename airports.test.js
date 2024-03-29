const { request, expect } = require("./config.js");

// import request from "supertest";
// import { expect } from "chai";

const apiBaseUrl = "https://airportgap.dev-tester.com/api";
const endpoint = "/airports";

describe("GET /airports", function () {
  it("returns all airports, limited to 30 per page", async function () {
    const response = await request(apiBaseUrl).get(endpoint);

    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30);
  });
});

describe("POST /airports/distance", function () {
  it("calculates the distance between two airports", async function () {
    const response = await request(apiBaseUrl) // Use the initialized request object
      .post("/airports/distance")
      .send({ from: "KIX", to: "SFO" });

    expect(response.status).to.eql(200);

    const attributes = response.body.data.attributes;
    expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
    expect(attributes.kilometers).to.eql(8692.066508240026);
    expect(attributes.miles).to.eql(5397.239853492001);
    expect(attributes.nautical_miles).to.eql(4690.070954910584);
  });
});
