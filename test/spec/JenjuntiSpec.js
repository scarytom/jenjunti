describe("Jenjunti", function() {

  beforeEach(function() {
  });

  it("should display totals", function() {
    expect($("#totalTime").val()).toBe("0");
  });

  it("should display table", function() {
    expect($("table").length).toBe(1);
  });
});
