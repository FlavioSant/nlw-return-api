import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const sumitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      sumitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,uadhahduauihdhd-a-sdhasdhasohd",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      sumitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,uadhahduauihdhd-a-sdhasdhasohd",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      sumitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,uadhahduauihdhd-a-sdhasdhasohd",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      sumitFeedback.execute({
        type: "BUG",
        comment: "its a comment",
        screenshot: "data:image/jpg;base64,uadhahduauihdhd-a-sdhasdhasohd",
      })
    ).rejects.toThrow();
  });
});
